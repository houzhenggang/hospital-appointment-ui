
const HOSPITAL_LEVEL = [
  {
    label: "一级甲等",
    value: "1-1",
  }, {
    label: "一级乙等",
    value: "1-2",
  }, {
    label: "一级丙等",
    value: "1-3",
  }, {
    label: "二级甲等",
    value: "2-1",
  }, {
    label: "二级乙等",
    value: "2-2",
  }, {
    label: "二级丙等",
    value: "2-3",
  }, {
    label: "三级甲等",
    value: "3-1",
  }, {
    label: "三级乙等",
    value: "3-2",
  }, {
    label: "三级丙等",
    value: "3-3",
  }
]

const YES_OR_NO = [
  { label: "是", value: "1" },
  { label: "否", value: "0" }
]

export default {
  data () {
    return {
      areaList: []
    }
  },
  created () {
    this.axios.get(`/base/doctorareadictionary/allTree`).then(({data}) => {
      this.areaList = data.data
    })
  },
  computed: {
    mainDialogFormOption () {
      return {
        menuBtn: false,
        labelWidth: "150",
        labelPosition: "right",
        column: [
          {
            label: '预约人',
            prop: 'userName',
          },
          {
            label: '身份证号',
            prop: 'userIdcard',
          },
          {
            label: '手机号',
            prop: 'userPhone',
          },
          {
            label: '机构名称',
            prop: 'hospitalName',
            type: "select",
            dicUrl: '/admin/dict/type/kasoft_hospital',
            editDisabled: true,
            addDisplay: false,
            hide: true,
          },
          {
            label: '检查项目',
            prop: 'insptItemName',
            type: 'select',
            dicUrl: '/base/doctorinspectionitem/dict',
            props: {
              label: 'inspItemName',
              value: 'inspItemId'
            }
          },
          {
            label: '检查费用',
            prop: 'feeTotal'
          },
          {
            label: '数量',
            prop: 'quantity',
            editDisabled: true,
            addDisplay: false,
            hide: true,
          },
          {
            label: '预约时间',
            prop: 'applyTime',
            type: "datetime",
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
          },
          {
            label: '详细时间',
            prop: 'detailTime',
            type: "datetime",
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            editDisabled: true,
            addDisplay: false,
            hide: true,
          },
          {
            label: '备注',
            prop: 'remark',
            editDisabled: true,
            addDisplay: false,
            hide: true,
          },
          {
            label: '订单状态',
            prop: 'orderState',
            type: "select",
            dicUrl: '/admin/dict/type/kasoft_apply_status',
            slot: true
          }
        ]
      }
    }
  }
}
