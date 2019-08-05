<template>
  <scm-dialog
    :title="dialogStatus[status]"
    :isBtnGroup="status !== 'detail'"
    :loading="loading"
    @close="handleClosed"
    @handleSubmit="handleSubmit"
    ref="dialog">
    <avue-form ref="form" v-model="formData" :option="mainDialogFormOption"/>
  </scm-dialog>
</template>

<script>
    import fieldMixin from "./fieldMixin"
    import {
        getHospitalById,
        getinspItemById
    } from '@/api/base/doctorinspectresource'

    export default {
        name: "applyorderDialog",
        mixins: [fieldMixin],
        data() {
            return {
                dialogStatus: {
                    create: "新增资源",
                    update: "修改资源",
                    detail: "资源详细"
                },
                formData: {}
            }
        },
        props: {
            status: {
                type: String,
                defualt: "detail"
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            open(formData) {
                this.formData = formData
                this.$nextTick(() => {
                    this.$refs["dialog"].open()
                    this.$nextTick(() => {
                        this.status !== "detail" ? this.$refs["form"].clearValidate() : ""
                    })
                })
            },
            close() {
                this.$refs["dialog"].close()
            },
            handleClosed() {
                this.formData = {}
                this.$nextTick(() => {
                    this.status !== "detail" ? this.$refs["form"].resetForm() : ""
                })
            },
            handleSubmit() {
                this.$refs["form"].validate(valid => {
                    if (valid) {

                        if (this.formData.unitPrice === 0) {
                            this.$message.error("所选医院,项目,没有录入价格")
                            return
                        }
                        delete this.formData.tenantId
                        let hospitalId = this.formData.hospitalId;

                        getHospitalById(hospitalId).then(({data}) => {
                            //console.log("getHospitalById:"+data.data.name)
                            this.formData.hospitalName = data.data.name
                            this.formData.hospitalPhone = data.data.phone
                            getinspItemById(this.formData.inspItemId).then(({data}) => {
                                //console.log("getinspItemById:"+JSON.stringify(data.data))
                                this.formData.inspItemName = data.data.inspItemName
                                console.log("handleSubmit:" + JSON.stringify(this.formData))
                                if (this.status === "create") {
                                    this.$emit("submit", this.formData)
                                } else {
                                    this.$emit("update", this.formData)
                                }
                            })
                        })

                    } else {
                        this.$message.error("请先规范填写表单后提交！")
                    }

                })


            }
        }
    }
</script>
