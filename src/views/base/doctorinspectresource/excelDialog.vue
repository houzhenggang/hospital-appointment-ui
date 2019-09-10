<template>
  <scm-dialog
    ref="dialog"
    :title="dialogStatus[status]"
    :is-btn-group="status !== 'detail'"
    :loading="isLoading"
    width="80%"
    @close="handleClosed"
    @handleSubmit="handleSubmit">
    <label class="uploadExcel" for="xFile">导入 excel</label>
    <form><input id="xFile" input type="file" accept=".xlsx, .xls" style="position:absolute;clip:rect(0 0 0 0);"
                 @change="onImportExcel"></form>
    <avue-crud
      :option="option"
      :data="list"
      class="aTable">
      <template slot-scope="scope" slot="menu">
        <div class="table-btn-group">
          <scm-button type="text" @click="handleUpdate(scope.row, scope.index)">编辑</scm-button>
          <scm-button type="text" @click="handleDelete(scope.row, scope.index)">删除</scm-button>
        </div>
      </template>
    </avue-crud>
    <mainDialog
      ref="mainDialog"
      :status="mainDialogStatus"
      @update="handleUpdateSubmit"/>
  </scm-dialog>
</template>

<script>
    import fieldMixin from './fieldMixin'
    import {
        getHospitalById,
        getinspItemById,
        getItemPrice,
        getPeriod,
        batchImport
    } from '@/api/base/doctorinspectresource'

    import {
        getPriceDict
    } from '@/api/base/inspectionprice'

    import {
        getHospitalDict
    } from '@/api/base/doctorhospital'
    import {
        getInspectionitemDict
    } from '@/api/base/doctorinspectionitem'
    import * as XLSX from 'xlsx'
    import Papa from 'papaparse'
    import {deepClone} from '@/util/util'
    import {getDateWeek, dateFormatNew} from '@/util/date'

    import mainDialog from './mainDialog1'

    export default {
        name: 'applyorderDialog',
        components: {
            mainDialog
        },
        mixins: [fieldMixin],
        props: {
            status: {
                type: String,
                defualt: 'detail'
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                index: undefined,
                mainDialogStatus: 'detail',
                list: [],
                option: {
                    addBtn: false,
                    editBtn: false,
                    delBtn: false,
                    refreshBtn: false,
                    columnBtn: false,
                    column: [{
                        label: '医院名称',
                        prop: 'hospitalName'
                    }, {
                        label: '项目名称',
                        prop: 'inspItemName'
                    }, {
                        label: '日期',
                        prop: 'inspItemDate'
                    }, {
                        label: '上下午',
                        prop: 'inspItemAp'
                    }, {
                        label: '时间段',
                        prop: 'timeSlot'
                    }, {
                        label: '数量',
                        prop: 'quantity'
                    }]
                },
                dialogStatus: {
                    create: '批量导入资源',
                    update: '修改资源',
                    detail: '资源详细'
                },
                flag: false,
                isLoading: this.loading
            }
        },
        methods: {
            onImportExcel(event) {
                this.isLoading = true
                let resultDatas
                let hospitalMap
                let inspectMap
                let priceMap
                let periodMap
                let messageToast = this.$message
                //1 读取excel
                this.readExcelFile().then(val => {
                    //console.log("onImportExcel-data:"+val)
                    //2 加入excel下的资源
                    return this.loadExcelData(val);
                }).then(val => {
                    resultDatas = val
                    //3 获取医院map
                    return this.mapHospital(val)
                }).then(val => {
                    hospitalMap = val
                    //4 获取检查项目map
                    return this.mapInspectsDict(val)
                }).then(val => {
                    inspectMap = val
                    //5 获取价格map
                    return this.mapPricesDict(val)
                }).then(val => {
                    priceMap = val
                    //6 获取时间段map
                    return this.mapPeriodDict(val)
                }).then(val => {
                    periodMap = val
                    console.log(resultDatas);
                    for (let i = 0; i < resultDatas.length; i++) {
                        //console.log( resultDatas[i]);
                        let hospitalId = hospitalMap.get(resultDatas[i].hospitalName)
                        if (hospitalId == undefined || hospitalId === '') {
                            messageToast.error("excel的医院不存在[" + resultDatas[i].hospitalName + "]")
                            return
                        }
                        resultDatas[i].hospitalId = hospitalId

                        let inspectId = inspectMap.get(resultDatas[i].inspItemName)
                        if (inspectId == undefined || inspectId === '') {
                            messageToast.error("excel的检查项目不存在[" + resultDatas[i].inspItemName + "]")
                            return
                        }
                        resultDatas[i].inspItemId = inspectId

                        let price = priceMap.get(hospitalId + '-' + inspectId)
                        if (price == undefined || price === '') {
                            messageToast.error("excel的项目价格不存在[" + resultDatas[i].hospitalName + "][" + resultDatas[i].inspItemName + "]")
                            return
                        }
                        resultDatas[i].unitPrice = price

                        let period = periodMap.get(resultDatas[i].timeSlot)
                        if (period == undefined || period === '') {
                            messageToast.error("excel的检查项目不存在[" + resultDatas[i].timeSlot + "]")
                            return
                        }
                        resultDatas[i].period = period
                    }

                    this.list = resultDatas
                    //console.log( resultDatas);
                    this.isLoading = false
                }).catch(function (res) {
                    messageToast.error('reject:' + res);
                })
            },
            mapPricesDict(data) {
                return new Promise((resolve, reject) => {
                    getPriceDict().then(res => {
                        if (res.data.data) {
                            let prices = res.data.data
                            let map = new Map();
                            for (let i = 0; i < prices.length; i++) {
                                map.set(prices[i].hospitalId + '-' + prices[i].inspItemId, prices[i].inspPrice);
                            }
                            resolve(map)
                        } else {
                            reject("无价格数据")
                        }
                    }).catch(function (res) {
                        reject("查询价格异常")
                    })
                })
            },
            mapPeriodDict(data) {
                return new Promise((resolve, reject) => {
                    getPeriod().then(res => {
                        if (res.data.data) {
                            let periods = res.data.data
                            let map = new Map();
                            for (let i = 0; i < periods.length; i++) {
                                //map.set(periods[i].value,periods[i].label);
                                map.set(periods[i].label, periods[i].value);
                            }
                            resolve(map)
                        } else {
                            reject("无时间段数据")
                        }
                    }).catch(function (res) {
                        reject("查询时间段异常")
                    })
                })
            },
            mapInspectsDict(data) {
                return new Promise((resolve, reject) => {
                    getInspectionitemDict().then(res => {
                        if (res.data.data) {
                            let inspects = res.data.data
                            let map = new Map();
                            for (let i = 0; i < inspects.length; i++) {
                                //map.set(inspects[i].inspItemId,inspects[i].inspItemName);
                                map.set(inspects[i].inspItemName, inspects[i].inspItemId);
                            }
                            resolve(map)
                        } else {
                            reject("无检查项目数据")
                        }
                    }).catch(function (res) {
                        reject("查询检查项目数据异常")
                    })
                })
            },
            mapHospital(data) {
                return new Promise((resolve, reject) => {
                    getHospitalDict().then(res => {
                        //console.log(res.data)
                        if (res.data.data) {
                            let hospitals = res.data.data
                            let map = new Map();
                            for (let i = 0; i < hospitals.length; i++) {
                                //map.set(hospitals[i].hospitalId,hospitals[i].name);
                                map.set(hospitals[i].name, hospitals[i].hospitalId);
                            }
                            resolve(map)
                        } else {
                            reject("无医院数据")
                        }
                    }).catch(function (res) {
                        reject("查询医院数据异常")
                    })
                })
            },
            //读取excel下的资源
            loadExcelData(data) {
                return new Promise((resolve) => {
                    //console.log("loadExcelData-data:"+data)
                    for (let i = 1; i < data.length - 1; i++) {
                        for (let j = 0; j < 6; j++) {
                            if (data[i + 1][j] === '') {
                                data[i + 1][j] = data[i][j]
                            }
                        }
                    }
                    const beforeData = data.filter(item => {
                        let filterNum = ''
                        for (let i = 6; i < item.length; i++) {
                            filterNum = filterNum.concat(item[i])
                        }
                        if (filterNum !== '') {
                            return item
                        }
                    })
                    if (beforeData.length === 0) {
                        this.$message.error('表格格式不正确，添加失败')
                        return
                    }
                    console.log(beforeData)

                    var afterData = []
                    beforeData.map((value, index) => {
                        if (index < 2) {
                            return
                        }
                        const result = new Date()
                        for (let i = 6; i < value.length; i++) {
                            if (value[i] !== '') {
                                let date = beforeData[1][i].toUpperCase().split("AAAA")[0].replace(/\//g, '-')
                                date = dateFormatNew(date, 'yyyy-MM-dd')
                                afterData.push({
                                    hospitalName: value[1],
                                    inspItemName: value[2],
                                    inspItemAp: value[3],
                                    inspItemDate: date,
                                    inspItemWeek: getDateWeek(date),
                                    endTime: date + ' ' + value[5] + ':00',
                                    timeSlot: `${value[4]}~${value[5]}`,
                                    quantity: value[i]
                                })
                            }
                        }
                    })
                    this.list = afterData

                    const nextData = deepClone(this.list)
                    resolve(nextData)
                })
            },
            //读取excel文件
            readExcelFile() {
                return new Promise((resolve) => {
                    //console.log(event.target.files)
                    var files = event.target.files

                    var fileReader = new FileReader()
                    fileReader.onload = (ev) => {
                        document.querySelector('#xFile').value = ''
                        try {
                            var data = ev.target.result,
                                workbook = XLSX.read(data, {
                                    type: 'binary'
                                }), // 以二进制流方式读取得到整份excel表格对象
                                persons = [] // 存储获取到的数据
                        } catch (e) {
                            console.log('文件类型不正确')
                            return
                        }

                        // 表格的表格范围，可用于判断表头是否数量是否正确
                        var fromTo = ''
                        // 遍历每张表读取
                        for (var sheet in workbook.Sheets) {
                            if (workbook.Sheets.hasOwnProperty(sheet)) {
                                fromTo = workbook.Sheets[sheet]['!ref']
                                persons = persons.concat(XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]))
                                // break; // 如果只取第一张表，就取消注释这行
                            }
                        }

                        const result = persons[0].replace(/\n（/g, '（')
                        const value = Papa.parse(result)
                        //console.log("readExcelFile:" + value.data);
                        resolve(value.data)
                        //this.toJson(value.data)
                    }

                    // 以二进制方式打开文件
                    fileReader.readAsBinaryString(files[0])
                })
            },
            async toJson(data) {
                for (let i = 1; i < data.length - 1; i++) {
                    for (let j = 0; j < 6; j++) {
                        if (data[i + 1][j] === '') {
                            data[i + 1][j] = data[i][j]
                        }
                    }
                }
                const beforeData = data.filter(item => {
                    let filterNum = ''
                    for (let i = 6; i < item.length; i++) {
                        filterNum = filterNum.concat(item[i])
                    }
                    if (filterNum !== '') {
                        return item
                    }
                })
                if (beforeData.length === 0) {
                    this.$message.error('表格格式不正确，添加失败')
                    return
                }
                console.log(beforeData)

                var afterData = []
                beforeData.map((value, index) => {
                    if (index < 2) {
                        return
                    }
                    const result = new Date()
                    for (let i = 6; i < value.length; i++) {
                        if (value[i] !== '') {
                            let date = beforeData[1][i].toUpperCase().split("AAAA")[0].replace(/\//g, '-')
                            date = dateFormatNew(date, 'yyyy-MM-dd')
                            // console.log('hospitalName:' + value[1])
                            // console.log('inspItemName:' + value[2])
                            // console.log('inspItemAp:' + value[3])
                            // console.log('inspItemDate:' + date)
                            // console.log('inspItemWeek:' + getDateWeek(date))
                            // console.log('endTime:' + date+ ' ' + value[5] + ':00')
                            // console.log('timeSlot:' + `${value[4]}~${value[5]}`)
                            afterData.push({
                                hospitalName: value[1],
                                inspItemName: value[2],
                                inspItemAp: value[3],
                                inspItemDate: date,
                                inspItemWeek: getDateWeek(date),
                                // startTime: value[5],
                                endTime: date + ' ' + value[5] + ':00',
                                timeSlot: `${value[4]}~${value[5]}`,
                                quantity: value[i]
                            })
                        }
                    }
                })
                this.list = afterData

                const nextData = deepClone(this.list)
                const result1 = await getHospitalDict()
                nextData.map(element => {
                    result1.data.data.forEach(item => {
                        if (element.hospitalName === item.name) {
                            element.hospitalId = item.hospitalId
                            element.hospitalPhone = item.phone
                        }
                    })
                    return element
                })

                const result2 = await getInspectionitemDict()
                nextData.map(element => {
                    result2.data.data.forEach(item => {
                        if (element.inspItemName === item.inspItemName) {
                            element.inspItemId = item.inspItemId
                        }
                    })
                    return element
                })

                const result3 = await getPeriod()
                nextData.map(element => {
                    result3.data.data.forEach(item => {
                        if (element.timeSlot === item.label) {
                            element.period = item.value
                        }
                    })
                    return element
                })

                this.list = nextData

                const idGroup = []
                nextData.forEach(item => {
                    if (idGroup.length === 0) {
                        idGroup.push({
                            hId: item.hospitalId,
                            iId: item.inspItemId
                        })
                    } else {
                        idGroup.forEach(ele => {
                            if (item.hospitalId === ele.hId && item.inspItemId === ele.iId) {
                                return
                            } else {
                                idGroup.push({
                                    hId: item.hospitalId,
                                    iId: item.inspItemId
                                })
                            }
                        })
                    }
                })

                const promise7 = []
                idGroup.map(async (element, index) => {
                    console.log('map-getItemPrice- element.hId:' + element.hId + ";inspItemId=" + element.iId)
                    const promise = new Promise(resolve => {
                        getItemPrice({'hospitalId': element.hId, 'inspItemId': element.iId}).then(res => {
                            if (res.data.data) {
                                element.uPrice = res.data.data.inspPrice
                            }
                            resolve()
                        }).catch(res => {
                            this.$message.error("检查项目不存在！")
                            console.log(res)
                        })
                    })

                    promise7.push(promise)
                })
                const res7 = await Promise.all(promise7)
                console.log('res7:' + res7)

                nextData.map(element => {
                    idGroup.forEach(item => {
                        if (element.hospitalId === item.hId && element.inspItemId === item.iId) {
                            element.unitPrice = item.uPrice
                        }
                    })
                    return element
                })
                this.list = nextData
                console.log('last')
                this.isLoading = false
            },
            open(formData) {
                this.formData = formData
                this.$nextTick(() => {
                    this.$refs['dialog'].open()
                })
            },
            close() {
                this.isLoading = false
                this.$refs['dialog'].close()
            },
            handleClosed() {
                this.isLoading = false
                this.list = []
                this.formData = {}
            },
            timeFilter(time) {
                const result = time.split('-')
                if (result[1].length === 1) {
                    result[1] = '0'.concat(time.split('-')[1])
                }
                if (result[2].length === 1) {
                    result[2] = '0'.concat(time.split('-')[2])
                }
                time = `${result[0]}-${result[1]}-${result[2]}`
                return time
            },
            async handleSubmit() {
                console.log(this.list)
                const data = deepClone(this.list)
                this.handleClosed()
                this.close()
                const lastResult = await batchImport(data)
                console.log(lastResult.data.data)
                if (lastResult.data.code === 0) {
                    this.$message({
                        showClose: true,
                        message: '导入成功',
                        type: 'success'
                    })
                    this.isLoading = false
                    this.$emit('export')
                } else {
                    this.$message.error('导入失败')
                }
            },
            handleDelete(data, index) {
                this.list.splice(index, 1)
                this.isLoading = false
            },
            handleUpdate(rowData, index) {
                this.mainDialogStatus = 'update'
                this.$refs['mainDialog'].open(rowData)
                this.index = index
            },
            handleUpdateSubmit(formData) {
                formData.timeSlot = formData.$period
                this.list.splice(this.index, 1, formData)
                this.$refs['mainDialog'].close()
            }
        }
    }
</script>

<style>
  .uploadExcel {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
  }

  .aTable {
    max-height: 400px;
    overflow-y: scroll;
    margin-top: 20px;
  }
</style>

