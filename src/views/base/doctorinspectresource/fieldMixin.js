
import {
  getItemPrice,
  getPeriod,
} from '@/api/base/doctorinspectresource'

export default {
  data() {
    return {
      areaList: []
    }
  },
  created() {

  },
  computed: {
    mainDialogFormOption() {
      return {
        menuBtn: false,
        labelWidth: "150",
        labelPosition: "right",
        column: [
          {
            label: '医院名称',
            prop: 'hospitalId',
            type: "select",
            dicUrl: '/base/doctorhospital/dict',
            props: {
              label: 'name',
              value: 'hospitalId'
            },
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }],
          },
          {
            label: '项目名称',
            prop: 'inspItemId',
            type: 'select',
            search: true,
            dicUrl: '/base/doctorinspectionitem/dict',
            props: {
              label: 'inspItemName',
              value: 'inspItemId'
            },
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }]
          },
          {
            label: '收费单价',
            prop: 'unitPrice',
            type: 'number',
            precision: 2,
            minRows: 0,
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }],
            disabled:true,
          },
          {
            label: '数量',
            prop: 'quantity',
            type: 'number',
            minRows: 0,
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }]
          },
          {
            label: '日期',
            prop: 'inspItemDate',
            type: "date",
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            rules: [
              { required: true, message: '不能为空', trigger: 'change' },
            ]
          },
          {
            label: '时间段',
            prop: 'period',
            type: 'select',
            dicUrl: '/admin/dict/type/kasoft_resource_period',
            rules: [
              { required: true, message: '不能为空', trigger: 'change' },
            ]
          }
        ]
      }
    }
  },
  watch: {
    "formData.hospitalId": {
      deep: true,
      immediate: true,
      handler(newVal) {

        if (newVal) {
            let inspItemId = this.formData.inspItemId
            if(inspItemId)
            {
              getItemPrice({"hospitalId":newVal,"inspItemId":inspItemId}).then(({data}) => {
                if(data.data)
                {
                  this.$set(this.formData, "unitPrice", data.data.inspPrice)
                }else
                {
                    //提示 价格管理界面添加价格
                  this.$set(this.formData, "unitPrice", 0)
                }
              })
            }else{
              ////提示 请选择项目
              this.$set(this.formData, "unitPrice", 0)
            }
        }
      }
    },
    "formData.inspItemId": {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          let hospitalId = this.formData.hospitalId
          if(hospitalId)
          {
            getItemPrice({"hospitalId":hospitalId,"inspItemId":newVal}).then(({data}) => {
              if(data.data)
              {
                this.$set(this.formData, "unitPrice", data.data.inspPrice)
              }else
              {
                //提示 价格管理界面添加价格
                this.$set(this.formData, "unitPrice", 0)
              }
            })
          }else{
            ////提示 请选择医院
            this.$set(this.formData, "unitPrice", 0)
          }
        }
      }
    },
    "formData.inspItemDate": {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          let date = new Date(newVal)
          this.checkWeek(date.getDay())
        }
      }
    },
    "formData.period": {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
         console.log("period:"+newVal)
          getPeriod().then(({data}) => {
            if(data.data)
            {
              let i
              for (i = 0; i < data.data.length; i++)
              {
                let value = data.data[i].value
                if(value===newVal)
                {
                  let label = data.data[i].label
                  let hour = label.split(":")[0]
                  console.log("period-hour:"+hour)
                  this.checkampm(hour)
                }
              }
            }
          })
        }
      }
    },
  },
  methods: {
    checkampm(hour){
      let timeValue = "" +((hour >= 12) ? "下午 " : "上午 " )
      this.$set(this.formData, "inspItemAp", timeValue)
    },
    checkWeek(day)
    {
      let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.$set(this.formData, "inspItemWeek", weekday[day])

    }
  }
}
