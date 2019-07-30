
export default {
  data () {
    return {
      areaList: []
    }
  },
  created () {
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
            prop: 'peopleName',
          },
          {
            label: '身份证号',
            prop: 'peopleIdcard',
          },
          {
            label: '手机号',
            prop: 'peoplePhone',
          },
          {
            label: '检查项目',
            prop: 'inspItemId',
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
            label: '开始',
            prop: 'startTime',
            type: "datetime",
            format: 'yyyy-MM-dd HH:mm',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
          }, {
            label: '结束',
            prop: 'endTime',
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
