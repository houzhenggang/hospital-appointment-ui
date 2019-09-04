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
    <form><input id="xFile" input type="file" accept=".xlsx, .xls" style="position:absolute;clip:rect(0 0 0 0);" @change="onImportExcel"></form>
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
  getHospitalDict
} from '@/api/base/doctorhospital'
import {
  getInspectionitemDict
} from '@/api/base/doctorinspectionitem'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'
import { deepClone } from '@/util/util'
import { getDateWeek,dateFormatNew } from '@/util/date'

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
          console.log(event.target.files)
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
              this.toJson(value.data)
          }

          // 以二进制方式打开文件
          fileReader.readAsBinaryString(files[0])

      },
      async toJson(data) {
          for (let i = 1; i < data.length - 1; i++) {
              for (let j = 0; j < 7; j++) {
                  if (data[i + 1][j] === '') {
                      data[i + 1][j] = data[i][j]
                  }
              }
          }
          const beforeData = data.filter(item => {
              let filterNum = ''
              for (let i = 7; i < item.length; i++) {
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
              for (let i = 7; i < value.length; i++) {
                  if (value[i] !== '') {
                      let date = beforeData[1][i].toUpperCase().split("AAAA")[0].replace(/\//g,'-')
                      date=dateFormatNew(date,'yyyy-MM-dd')
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
                        endTime: date+ ' ' + value[5] + ':00',
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
              const promise = new Promise(resolve => {
                  getItemPrice({'hospitalId': element.hId, 'inspItemId': element.iId}).then(res => {
                      if (res.data.data) {
                          element.uPrice = res.data.data.inspPrice
                      }
                      resolve()
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
      },
      open(formData) {
          this.isLoading = false
          this.formData = formData
          this.$nextTick(() => {
              this.$refs['dialog'].open()
          })
      },
      close() {
          this.$refs['dialog'].close()
      },
      handleClosed() {
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
          this.isLoading = true
          this.flag = false
          console.log(this.list)
          const data = deepClone(this.list)
          let result4
          data.every((element, index) => {
              if (!element.hospitalId) {
                  this.flag = true
                  this.$message.error(`第${index + 1}条数据中的医院名称在系统中不存在，请先去添加对应资源`)
                  this.isLoading = false
                  return false
              } else if (!element.inspItemId) {
                  console.log(index)
                  this.flag = true
                  this.$message.error(`第${index + 1}条数据中的项目名称在系统中不存在，请先去添加对应资源`)
                  this.isLoading = false
                  return false
              } else if (!element.period) {
                  console.log(index)
                  this.$message.error(`第${index + 1}条数据中的时间段错误，请修改`)
                  this.isLoading = false
                  this.flag = true
                  return false
              } else if (!element.unitPrice) {
                  console.log(index)
                  this.$message.error(`第${index + 1}中对应的价格不存在，请到价格管理界面添加价格`)
                  this.isLoading = false
                  this.flag = true
                  return false
              } else {
                  return true
              }
          })

          if (this.flag) {
              return
          }
          this.handleClosed()
          this.close()
          await (this.list = data)
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
      // handleUpdate(data, index, done, loading) {
      //   if (!data.hospitalName || !data.inspItemAp || !data.inspItemDate || !data.inspItemName || !data.inspItemWeek || !data.quantity || !data.timeSlot) {
      //     this.$message.error('不可为空')
      //     loading()
      //     return
      //   }
      //   this.list.splice(index, 1, data)
      //   done()
      // },
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
 .uploadExcel{
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

