<template>
  <scm-dialog
    ref="dialog"
    :title="dialogStatus[status]"
    :is-btn-group="status !== 'detail'"
    :loading="loading"
    @close="handleClosed"
    @handleSubmit="handleSubmit">
    <label class="uploadExcel" for="xFile">导入 excel</label>
    <form><input input type='file' accept='.xlsx, .xls' @change="onImportExcel" id="xFile" style="position:absolute;clip:rect(0 0 0 0);"></form>
    <avue-crud :option="option" :data="list"></avue-crud>
  </scm-dialog>
</template>

<script>
import fieldMixin from './fieldMixin'
import {
  getHospitalById,
  getinspItemById
} from '@/api/base/doctorinspectresource'
import * as XLSX from 'xlsx'
import Papa from 'papaparse'

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
          label: '医院名称',
          prop: 'hospitalName'
        }, {
          label: '资源名称',
          prop: 'inspItemName'
        }, {
          label: '日期',
          prop: 'date'
        }, {
          label: '上下午',
          prop: 'inspItemAp'
        }, {
          label: '开始时间',
          prop: 'startTime'
        }, {
          label: '截止时间',
          prop: 'endTime'
        }, {
          label: '时间段',
          prop: 'period'
        }, {
          label: '数量',
          prop: 'quantity'
        }]
      },
      dialogStatus: {
        create: '批量导入资源',
        update: '修改资源',
        detail: '资源详细'
      }
    }
  },
  methods: {
    onImportExcel(event) {
      console.log(event.target.files)
      var files = event.target.files;

      var fileReader = new FileReader();
      fileReader.onload = (ev) => {
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

      var afterData = []
      beforeData.map((value, index) => {
        if (index < 2) {
          return
        }
        for (let i = 7; i < value.length; i++) {
          if (value[i] !== '') {
            afterData.push({
              hospitalName: value[1],
              inspItemName: value[3],
              inspItemAp: value[4],
              date: beforeData[1][i],
              startTime: value[5],
              endTime: value[6],
              period: i - 7,
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
        this.$nextTick(() => {
          this.status !== 'detail' ? this.$refs['form'].clearValidate() : ''
        })
      })
    },
    close() {
      this.$refs['dialog'].close()
    },
    handleClosed() {
      this.formData = {}
      this.$nextTick(() => {
        this.status !== 'detail' ? this.$refs['form'].resetForm() : ''
      })
    },
    handleSubmit() {
      console.log('保存')
      console.log(this.list)
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

