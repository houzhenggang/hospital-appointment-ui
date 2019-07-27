<template>
  <basic-container class="execution">
    <avue-crud
      ref="crud"
      :page="page"
      :data="tableData"
      :permission="permissionList"
      :table-loading="tableLoading"
      :option="tableOption"
      v-model="formData"
      @on-load="getList"
      @search-change="handleFilter"
      @refresh-change="refreshChange"
      @row-update="handleUpdate"
      @row-save="handleSave"
      @row-del="rowDel"
    >
      <template slot-scope="scope" slot="userIdForm">
        <el-input
          v-model="scope.row.userId"
          placeholder="点击创建用户绑定"
          readonly
          @click.native="handleBindUser(scope.row)"
        />
      </template>
      <template slot="departmentId" slot-scope="scope">{{scope.row.departmentIdName}}</template>
    </avue-crud>
    <userDialog
      ref="userDialog"
      :status="userDialogStatus"
      @submit="handleUserSubmit"
      @update="handleUserUpdate"
    />
  </basic-container>
</template>

<script>
import {
  fetchList,
  getObj,
  addObj,
  putObj,
  delObj
} from "@/api/base/doctordoctorinfo";

import { addObj as createUser, getDetailByUsername } from "@/api/admin/user";

import { tableOption } from "./const/index";
import { mapGetters } from "vuex";
import userDialog from "./userDialog"

export default {
  name: "doctordoctorinfo",
  components: {
    userDialog
  },
  data() {
    return {
      tableData: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      tableLoading: false,
      tableOption: tableOption,
      formData: {},
      userDialogStatus: "detail",
      userInfo: undefined
    };
  },
  created() {},
  mounted: function() {},
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        addBtn: this.vaildData(
          this.permissions.base_doctordoctorinfo_add,
          false
        ),
        delBtn: this.vaildData(
          this.permissions.base_doctordoctorinfo_del,
          false
        ),
        editBtn: this.vaildData(
          this.permissions.base_doctordoctorinfo_edit,
          false
        )
      };
    }
  },
  methods: {
    getList(page, params) {
      this.tableLoading = true;
      fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize
          },
          params
        )
      ).then(response => {
        this.tableData = response.data.data.records;
        this.page.total = response.data.data.total;
        this.tableLoading = false;
      });
    },
    rowDel: function(row, index) {
      var _this = this;
      this.$confirm("是否确认删除ID为" + row.id, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          return delObj(row.id);
        })
        .then(data => {
          _this.tableData.splice(index, 1);
          _this.$message({
            showClose: true,
            message: "删除成功",
            type: "success"
          });
          this.getList(this.page);
        })
        .catch(function(err) {});
    },
    handleUpdate: function(row, index, done) {
      putObj(row).then(data => {
        this.tableData.splice(index, 1, Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success"
        });
        done();
        this.getList(this.page);
      });
    },
    handleSave: function(row, done) {
      addObj(row).then(data => {
        this.tableData.push(Object.assign({}, row));
        this.$message({
          showClose: true,
          message: "添加成功",
          type: "success"
        });
        done();
        this.getList(this.page);
      });
    },
    /**
     * 刷新回调
     */
    refreshChange() {
      this.getList(this.page);
    },
    handleFilter(param) {
      this.page.page = 1;
      this.getList(this.page, this.filterForm(param));
    },
    handleBindUser (userInfo) {
      if (userInfo.userId) {
        this.$message.error("已绑定用户，无需再次操作")
        return false
      }
      this.userInfo = userInfo
      this.userDialogStatus = "create"
      this.$refs['userDialog'].open()
    },
    handleUserSubmit (formData) {
      createUser(formData).then(() => {
        getDetailByUsername(formData.username).then(({data}) => {
          this.$set(this.userInfo, "userId", data.data.userId)
          this.$set(this.userInfo, "phone", data.data.phone)
          this.$refs['userDialog'].close()
        })
      })
    },
    handleUserUpdate (formData) {
      
    },
  }
};
</script>

<style lang="scss" scoped>
h1 {
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
