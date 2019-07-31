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
                delete this.formData.tenantId
                let hospitalId = this.formData.hospitalId;
                console.log("handSubmit-inspItemDate:"+this.formData.inspItemDate)
                 let b_date = this.formData.inspItemDate.split(' ')[0]
                 let s_time=this.formData.startTime.split(' ')[1]
                 let e_time = this.formData.endTime.split(' ')[1]

                this.formData.startTime=b_date+" "+s_time
                this.formData.endTime=b_date+" "+e_time

                console.log("handSubmit-startTime:"+this.formData.startTime)
                console.log("handSubmit-endTime:"+this.formData.endTime)

                getHospitalById(hospitalId).then(({data}) => {
                    //console.log("getHospitalById:"+data.data.name)
                    this.formData.hospitalName=data.data.name
                    this.formData.hospitalPhone=data.data.phone
                    getinspItemById(this.formData.inspItemId).then(({data}) => {
                        //console.log("getinspItemById:"+JSON.stringify(data.data))
                        this.formData.inspItemName=data.data.inspItemName
                        console.log("handleSubmit:"+JSON.stringify(this.formData))
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
                    })
                })


            }
        }
    }
</script>
