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
            <!--<scm-button type="primary" @click="handleCreate">添加预约</scm-button>-->
          </template>
          <template slot-scope="scope" slot="orderState">
            <el-tag v-if="scope.row.orderState === '10'" type="success">已预约</el-tag>
            <el-tag v-if="scope.row.orderState === '50'" type="info">已检查</el-tag>
            <el-tag v-if="scope.row.orderState === '30'" type="warning">已过期</el-tag>
            <el-tag v-if="scope.row.orderState === '40'" type="warning">已取消</el-tag>
          </template>
          <template slot-scope="scope" slot="menu">
            <div class="table-btn-group">
              <scm-button v-if="scope.row.orderState === '10'" :disabled="false" type="text" @click="handleCancelOrder(scope.row)">预约取消</scm-button>
              <scm-button v-if="scope.row.orderState !== '10'" :disabled="true" type="text" @click="handleCancelOrder(scope.row)">预约取消</scm-button>
              <scm-button v-if="scope.row.orderState === '10'" :disabled="false" type="text" @click="handleConfirmOrder(scope.row)">确认到场</scm-button>
              <scm-button v-if="scope.row.orderState !== '10'" :disabled="true" type="text" @click="handleConfirmOrder(scope.row)">确认到场</scm-button>

              <!--
               <scm-button type="text" @click="handleUpdate(scope.row)">编辑</scm-button>
              <scm-button type="text" @click="handleDelete(scope.row)">删除</scm-button>
              -->
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
    </basic-container>
  </div>
</template>

<script>
import {
  getMainTableData,
  deleteApplyOrder,
  createApplyOrder,
  updateApplyOrder
} from '@/api/base/doctorapplyorder'
import commonMixin from '@/mixins/mixins'
import {
  mainSearchOption,
  mainTableOption
} from './const/index'
import mainDialog from './mainDialog'

export default {
  name: 'doctorapplyorder',
  components: {
    mainDialog
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
      form: {}

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
    handleDelete(rowData) {
      this.$confirm(`是否删除预约：${rowData.peopleName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteApplyOrder(rowData.applyOrderId).then(({ data }) => {
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
    handleCancelOrder(formData) {
      this.$confirm(`是否取消预约：${formData.peopleName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        formData.orderState = 40
        updateApplyOrder(formData).then(({ data }) => {
          if (data.code === 0) {
            this.$message.success('取消预约成功')
            this.getList()
          } else {
            this.$message.error('取消预约失败')
          }
        })
      }).catch(() => {
      })
    },
    handleConfirmOrder(formData) {
      this.$confirm(`是否确认到场：${formData.peopleName}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        formData.orderState = 50
        updateApplyOrder(formData).then(({ data }) => {
          if (data.code === 0) {
            this.$message.success('修改成功')
            this.getList()
          } else {
            this.$message.error('修改失败')
          }
        })
      }).catch(() => {
      })
    },
    handleUpdate(rowData) {
      this.mainDialogStatus = 'update'
      this.$refs['mainDialog'].open(rowData)
    },
    refreshChange() {
      this.getList(this.page)
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
      createApplyOrder(formData).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success('新增预约订单成功')
          this.getList()
          this.$refs['mainDialog'].close()
        } else {
          this.$message.error('新增预约订单失败')
        }
        this.mainDialogLoading = false
      })
    },
    handleUpdateSubmit(formData) {
      this.mainDialogLoading = true
      updateApplyOrder(formData).then(({ data }) => {
        if (data.code === 0) {
          this.$message.success('修改预约订单成功')
          this.getList()
          this.$refs['mainDialog'].close()
        } else {
          this.$message.error('修改预约订单失败')
        }
        this.mainDialogLoading = false
      })
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

