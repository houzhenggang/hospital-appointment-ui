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
            }]
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
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }]
          },
          {
            label: '开始时间',
            prop: 'startTime',
            type: "time",
            format: 'HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }]
          },
          {
            label: '结束时间',
            prop: 'endTime',
            type: "time",
            format: 'HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            rules: [{
              required: true,
              message: "不能为空",
              trigger: 'blur'
            }]
          }
        ]
      }
    }
  },
  watch: {
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
    "formData.startTime": {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
          //console.log("watch-startTime:" + newVal);
          this.Add1Hour(newVal)
        }
      }
    },
    "formData.endTime": {
      deep: true,
      immediate: true,
      handler(newVal) {
        if (newVal) {
         // console.log("watch-endTime:" + newVal);
          this.check1Hour(this.formData.startTime,newVal)
        }
      }
    }
  },
  methods: {
    Add1Hour(dateStr) {
      let date = new Date(dateStr)
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      let day = (date.getDate()).toString();
      let hour = date.getHours().toString();
      let minutes = (date.getMinutes()).toString();
      let seconds = (date.getSeconds()).toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      if (day.length == 1) {
        day = "0" + day;
      }
      if (hour<10) {
        hour = "0" + hour;
      }
      let dateTime = year + "-" + month + "-" + day + " " + hour + ":59" + ":" + seconds;
      this.$nextTick(() => {
        this.$set(this.formData, "endTime", dateTime)

      })
      this.checkperiod(date.getHours());
      this.checkampm(date.getHours())
    },
    check1Hour(startStr,endStr) {
      //console.log("check1Hour-startStr:" + startStr+";endStr="+endStr);
      let startDate = new Date(startStr)
      let endDate = new Date(endStr)
      let startHour=startDate.getHours();
      let endHour=endDate.getHours();
    },
    checkampm(hour){
      let timeValue = "" +((hour >= 12) ? "下午 " : "上午 " )
      this.$set(this.formData, "inspItemAp", timeValue)
    },
    checkperiod(hour) {
      let period = "8:00~9:00"
       if(hour<=8)
       {
         //period = "8:00~9:00"
         period="1"
       }else if(hour<=9)
       {
         //period = "9:00~10:00"
         period="2"
       }else if(hour<=10)
       {
         //period = "10:00~11:00"
         period="3"
       }else if(hour<=11)
       {
         //period = "11:00~12:00"
         period="4"
       }else if(hour<=13)
       {
         //period = "13:00~14:00"
         period="5"
       }else if(hour<=14)
       {
         //period = "14:00~15:00"
         period="6"
       }else if(hour<=15)
       {
         //period = "15:00~16:00"
         period="7"
       }else if(hour<=16)
       {
         //period = "16:00~17:00"
         period="8"
       }
     // console.log("checkperiod-hour="+hour+";period:" + period);
      this.$set(this.formData, "period", period)
    },
    checkWeek(day)
    {
      let weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
      this.$set(this.formData, "inspItemWeek", weekday[day])

    }
  }
}
