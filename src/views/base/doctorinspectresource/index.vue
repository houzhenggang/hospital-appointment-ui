<template>
  <div class="execution">
    <basic-container>
      <header-layout>
        <scm-search-bar :form-props="mainSearchOption" :list-query="listQuery" @handleFilter="handleFilter"/>
      </header-layout>

      <body-layout>
        <avue-crud
          :table-loading="tableLoading"
          :data="mainTableData"
          :option="mainTableOption"
          :page="pagination"
          @size-change="sizeChange"
          @current-change="currentChange"
          @refresh-change="refreshChange"
          @row-save="handleSave">
          <template slot="menuLeft">
            <scm-button type="primary" @click="handleCreate">添加</scm-button>
            <scm-button type="primary" @click="batchCreate">批量导入</scm-button>
            <scm-button type="primary" @click="handleGet" >下载模版</scm-button>
            <!--scm-button type="primary" @click="downloadMater" >下载模版2</scm-button-->
          </template>

          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <scm-button type="text" @click="handleUpdate(scope.row)">编辑</scm-button>
              <scm-button type="text" @click="handleDelete(scope.row)">删除</scm-button>
            </div>
          </template>
        </avue-crud>
      </body-layout>
      <mainDialog
        ref="mainDialog"
        :loading="mainDialogLoading"
        :status="mainDialogStatus"
        @submit="handleCreateSubmit"
        @update="handleUpdateSubmit"/>

      <excelDialog
        ref="excelDialog"
        :loading="mainDialogLoading"
        :status="mainDialogStatus"
        @export="handleExport"/>

    </basic-container>
  </div>
</template>


<script>
import {
  getMainTableData,
  deleteInspRes,
  updateInspRes,
  createInspRes
} from '@/api/base/doctorinspectresource'
import commonMixin from '@/mixins/mixins'
import {
  mainSearchOption,
  mainTableOption
} from './const/index'
import mainDialog from './mainDialog'
import excelDialog from './excelDialog'
import XLSX from 'xlsx'
var FileSaver = require('file-saver')

export default {
  name: 'doctorinspectresource',
  components: {
    mainDialog, excelDialog
  },
  mixins: [commonMixin],
  data() {
    return {
      mainSearchOption,
      mainTableOption,
      mainTableData: [],
      mainDialogStatus: 'detail',
      mainDialogLoading: false,
      type: 0,
      item: {},
      form: {},
      exportList: [{
        '医院名称': '南京市浦口区中心医院',
        '资源分类': '体检类别',
        '资源名称': '外科七项',
        '上下午': '上午',
        '开始时间': '08:00',
        '截止时间': '09:00',
        '周一(8-5)': '',
        '周二(8-6)': '',
        '周三(8-7)': '',
        '周四(8-8)': '',
        '周五(8-9)': '',
        '周六(8-10)': '',
        '周日(8-11)': '',
        '周一(8-12)': '',
        '周二(8-13)': '',
        '周三(8-14)': '',
        '周四(8-15)': '',
        '周五(8-16)': '',
        '周六(8-17)': '',
        '周日(8-18)': ''
      },
      {
        '医院名称': '南京市浦口区中心医院',
        '资源分类': '体检类别',
        '资源名称': '外科七项',
        '上下午': '上午',
        '开始时间': '09:00',
        '截止时间': '10:00',
        '周一(8-5)': '',
        '周二(8-6)': '',
        '周三(8-7)': '',
        '周四(8-8)': '',
        '周五(8-9)': '',
        '周六(8-10)': '',
        '周日(8-11)': '',
        '周一(8-12)': '',
        '周二(8-13)': '',
        '周三(8-14)': '',
        '周四(8-15)': '',
        '周五(8-16)': '',
        '周六(8-17)': '',
        '周日(8-18)': ''
      }
      ]

    }
  },
  methods: {
    getList() {
      this.tableLoading = true
      getMainTableData(this.listQuery).then(({ data }) => {
        this.mainTableData = data.data.records
        this.pagination.total = data.data.total
        this.tableLoading = false
      })
    },
    handleCreate() {
      this.mainDialogStatus = 'create'
      this.$refs['mainDialog'].open({})
    },
    batchCreate() {
      this.mainDialogStatus = 'create'
      this.$refs['excelDialog'].open({})
    },
    refreshChange() {
      this.getList(this.page)
    },
    handleDelete(rowData) {
      this.$confirm(`是否删除预约：${rowData.inspResourceId}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInspRes(rowData.inspResourceId).then(({ data }) => {
          if (data.code === 0) {
            this.$message.success('删除成功！')
            this.getList()
          } else {
            this.$message.error(`删除失败！${data.msg}`)
          }
        })
      }).catch(() => {
      })
    },
    handleUpdate(rowData) {
      this.mainDialogStatus = 'update'
      this.$refs['mainDialog'].open(rowData)
    },
    handleItem: function(row) {
      this.dialogFormVisible = true
      this.tableLoading = true
      console.log(row.id)
    },
    handleSave: function(row, done, loading) {
      addObj(row).then(data => {
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
        done()
        this.getList(this.page)
      }).catch(() => {
        loading()
      })
    },
    handleCreateSubmit(formData) {
      this.mainDialogLoading = true
      createInspRes(formData).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success('新增资源成功')
          this.getList()
          this.$refs['mainDialog'].close()
        } else {
          this.$message.error('新增资源失败')
        }
        this.mainDialogLoading = false
      })
    },
    handleUpdateSubmit(formData) {
      this.mainDialogLoading = true
      updateInspRes(formData).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success('修改资源成功')
          this.getList()
          this.$refs['mainDialog'].close()
        } else {
          this.$message.error('修改资源失败')
        }
        this.mainDialogLoading = false
      })
    },
    handleExport() {
      this.getList()
    },
    handleGet() {
      window.open('demo.xls')
    },
    downloadMater() {
      const defaultCellStyle = { font: { name: 'Verdana', sz: 11, color: 'FF00FF88' }, fill: { fgColor: { rgb: 'FFFFAA00' }}}
      const wopts = { bookType: 'xlsx', bookSST: false, type: 'binary', defaultCellStyle: defaultCellStyle, showGridLines: false }
      const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {}}
      const data = this.exportList
      wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(data)

      //创建二进制对象写入转换好的字节流
      const tmpDown = new Blob([this.s2ab(XLSX.write(wb, wopts))], { type: 'application/octet-stream' })
      FileSaver.saveAs(tmpDown, '资源导入模板 .xls')
    },
    //字符串转字符流
    s2ab(s) {
      if (typeof ArrayBuffer !== 'undefined') {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      } else {
        var buf = new Array(s.length)
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    color: #3a8ee6 !important;
    margin-right: 10px;
    cursor: pointer;
    font-size: 12px;
  }
</style>




