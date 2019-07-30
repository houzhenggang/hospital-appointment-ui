<template>
  <scm-dialog
    :title="dialogStatus[status]"
    :isBtnGroup="status !== 'detail'"
    :loading="loading"
    @close="handleClosed"
    @handleSubmit="handleSubmit"
    ref="dialog">
      <avue-form ref="form" v-model="formData" :option="mainDialogFormOption"></avue-form>
  </scm-dialog>
</template>

<script>
import fieldMixin from "./fieldMixin"

export default {
  name: "applyorderDialog",
  mixins: [fieldMixin],
  data () {
    return {
      dialogStatus: {
        create: "新增预约订单",
        update: "修改预约订单",
        detail: "医疗预约订单"
      },
      formData: {}
    }
  },
  props: {
    status:{
      type: String,
      defualt: "detail"
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    open (formData) {
      this.formData = formData
      this.$nextTick(() => {
        this.$refs["dialog"].open()
        this.$nextTick(() => {
          this.status !== "detail" ? this.$refs["form"].clearValidate() : ""
        })
      })
    },
    close () {
      this.$refs["dialog"].close()
    },
    handleClosed () {
      this.formData = {}
      this.$nextTick(() => {
        this.status !== "detail" ? this.$refs["form"].resetForm() : ""
      })
    },
    handleSubmit () {

      delete this.formData.tenantId
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
    }
  }
}
</script>
