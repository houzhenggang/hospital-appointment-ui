<template>
  <scm-dialog
    :title="dialogStatus[status]"
    @close="handleClosed"
    @handleSubmit="handleSubmit"
    ref="dialog">
      <avue-form ref="form" v-model="formData" :option="userDialogFormOption"></avue-form>
  </scm-dialog>
</template>


<script>
import {
  userDialogFormOption
} from "./const/index"
export default {
  name: "userDialog",
  data () {
    return {
      userDialogFormOption,
      formData: {},
      dialogStatus: {
        "detail": "查看详情",
        "create": "创建用户",
        "update": "修改用户"
      }
    }
  },
  props: {
    status: {
      type: String,
      default: "detail"
    }
  },
  methods: {
    open (formData = {}) {
      this.formData = formData
      this.$refs['dialog'].open()
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    close () {
      this.$refs["dialog"].close()
    },
    handleSubmit () {
      console.log("handleSubmit")
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.status === "create") {
            this.$emit("submit", this.formData)
          } else {
            this.$emit("update", this.formData)
          }
        } else {
          this.$message.error("请先规范填写表单后提交！")
        }
      })
    },
    handleClosed () {
      this.formData = {}
      this.$nextTick(() => {
        this.status !== "detail" ? this.$refs["form"].resetForm() : ""
      })
    },
  }
}
</script>
