<template>
  <scm-dialog
    ref="dialog"
    width=80%
    :title="dialogStatus[status]"
    :is-btn-group="status !== 'detail'"
    :loading="loading"
    @close="handleClosed"
    @handleSubmit="handleSubmit">
    <label class="uploadExcel" for="xFile">导入 excel</label>
    <form><input input type='file' accept='.xlsx, .xls' @change="onImportExcel" id="xFile" style="position:absolute;clip:rect(0 0 0 0);"></form>
    <avue-crud :option="option" :data="list" 
      @row-update="handleUpdate"
      @row-del="handleDelete">
    </avue-crud>
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

export default {
  name: 'applyorderDialog',
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
      list: [],
      option: {
        addBtn: false,
        refreshBtn: false,
        columnBtn: false,
        column: [{
          label: '价格',
          prop: 'unitPrice'
        }, {
          label: '时间段1',
          prop: 'period'
        }, {
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
      flag: false
    }
  },
  methods: {
    onImportExcel(event) {
      console.log(event.target.files)
      var files = event.target.files;

      var fileReader = new FileReader();
      fileReader.onload = (ev) => {
          document.querySelector('#xFile').value = ''
          try {
              var data = ev.target.result,
              workbook = XLSX.read(data, {
                  type: 'binary'
              }), // 以二进制流方式读取得到整份excel表格对象
              persons = []; // 存储获取到的数据
          } catch (e) {
              console.log('文件类型不正确');
              return;
          }

          // 表格的表格范围，可用于判断表头是否数量是否正确
          var fromTo = '';
          // 遍历每张表读取
          for (var sheet in workbook.Sheets) {
              if (workbook.Sheets.hasOwnProperty(sheet)) {
                  fromTo = workbook.Sheets[sheet]['!ref'];
                  persons = persons.concat(XLSX.utils.sheet_to_csv(workbook.Sheets[sheet]));
                  // break; // 如果只取第一张表，就取消注释这行
              }
          }

          let result = persons[0].replace(/\n（/g, '（')
          let value = Papa.parse(result)
          this.toJson(value.data)
      };

      // 以二进制方式打开文件
      fileReader.readAsBinaryString(files[0]);

    },
    toJson(data) {
      for (let i= 1; i < data.length - 1; i++) {
        for (let j = 0; j < 7; j++) {
          if (data[i+1][j] === '') {
            data[i+1][j] = data[i][j]
          }
        }
      }
      let beforeData = data.filter(item => {
        let filterNum = ''
        for (let i = 7; i < item.length; i++) {
          filterNum= filterNum.concat(item[i])
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
        let result = new Date()
        for (let i = 7; i < value.length; i++) {
          if (value[i] !== '') {
            afterData.push({
              hospitalName: value[1],
              inspItemName: value[3],
              inspItemAp: value[4],
              inspItemDate: this.timeFilter(result.getFullYear() + '-'  + beforeData[1][i].match(/（(.*)）/)[1]),
              inspItemWeek: beforeData[1][i].replace(beforeData[1][i].match(/（(.*)）/)[0], '').replace(/周/, '星期'),
              // startTime: value[5],
              // endTime: value[6],
              timeSlot: `${value[5]}~${value[6]}`,
              quantity: value[i],
            })
          }
        } 
      })
      this.list = afterData
    },
    open(formData) {
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
      let result = time.split("-")
      if (result[1].length === 1) {
        result[1] = '0'.concat(time.split("-")[1])
      }
      if (result[2].length === 1) {
        result[2] = '0'.concat(time.split("-")[2])
      }
      time = `${result[0]}-${result[1]}-${result[2]}`
      return time
    },
    async handleSubmit() {
      console.log(this.list)
      let data = deepClone(this.list)
      let result1 = await getHospitalDict()
      data.map(element => {
        result1.data.data.forEach(item => {
          if (element.hospitalName === item.name) {
            element.hospitalId = item.hospitalId
            element.hospitalPhone = item.phone
          }
        })
        return element
      });

      let result2 = await getInspectionitemDict()
      data.map(element => {
        result2.data.data.forEach(item => {
          if (element.inspItemName === item.inspItemName) {
            element.inspItemId = item.inspItemId
          }
        })
        return element
      });

      let result3 = await getPeriod()
      let promise3 = []
      data.map(element => {
        let pro3 = new Promise(resolve => {
          result3.data.data.forEach(item => {
            if (element.timeSlot === item.label) {
              element.period = item.value
            }
            resolve()
          })
          return element
        });
        promise3.push(pro3)
      })
      await Promise.all(promise3)

      let result4

      let promise4 = []
        data.every((element, index) => {
          let pro4 = new Promise((resolve) => {
          if (element.hospitalId && element.inspItemId && element.period) {
            resolve()
          } else if (!element.hospitalId) {
            this.flag = true
            this.$message.error(`第${index + 1}条数据中的医院名称在系统中不存在，请先去添加对应资源`)
            return false;
          } else if (!element.inspItemId) {
            console.log(index)
            this.flag = true
            this.$message.error(`第${index + 1}条数据中的项目名称在系统中不存在，请先去添加对应资源`)
            return false;
          } else if (!element.period) {
            console.log(index)
            this.$message.error(`第${index + 1}条数据中的时间段错误，请修改`)
            this.flag = true
            return false;
          }
        });
        promise4.push(pro4)
        if (this.flag) {
          return
        }
      })
      await Promise.all(promise4)

      let promise7 = []
      data.map(async (element, index) => {
      let promise = new Promise(resolve => {        
        getItemPrice({ 'hospitalId': element.hospitalId, 'inspItemId': element.inspItemId }).then(res => {
          if (res.data.data) {
            element.unitPrice = res.data.data.inspPrice
          }
          resolve()
        })
      })
      promise7.push(promise)
      })
      let res7 = await Promise.all(promise7)
      console.log('res7:' + res7)
      
      let promise8 = await new Promise(resolve => {
        data.every((element, index) => {
          if (!element.unitPrice) {
            this.flag = true
            this.$message.error(`第${index + 1}中对应的价格不存在，请到价格管理界面添加价格`)
            return false;
          } 
        });
        if (this.flag) {
          return
        }
        resolve()
      })
      // console.log('8')
      // let res8 = await promise8
      // console.log('res8:' + res8)
      await (this.list = data)
      // setTimeout(async () => {
        // data.every((element, index) => {
        //   if (!element.unitPrice) {
        //     this.flag = true
        //     this.$message.error(`第${index + 1}中对应的价格不存在，请到价格管理界面添加价格`)
        //     return false;
        //   } 
        // });
        // if (this.flag) {
        //   return
        // }
        // this.handleClosed()
        // this.close()
        // await (this.list = data)
        // let lastResult = await batchImport(data)
        // console.log(lastResult.data.data)
        // if (lastResult.data.code === 0) {
        //     this.$message({
        //       showClose: true,
        //       message: '导入成功',
        //       type: 'success'
        //     })
        // } else {
        //   this.$message.error('导入失败')
        // }
      // }, 500)
    },
    handleUpdate(data, index, done, loading) {
      if (!data.hospitalName || !data.inspItemAp || !data.inspItemDate || !data.inspItemName || !data.inspItemWeek || !data.quantity || !data.timeSlot) {
        this.$message.error('不可为空')
        loading()
        return
      }
      this.list.splice(index, 1, data)
      done()
    },
    handleDelete(data, index) {
      this.list.splice(index, 1)
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
</style>

