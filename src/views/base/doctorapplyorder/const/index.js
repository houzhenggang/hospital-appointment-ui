export const mainSearchOption = [
  {
    label: '用户姓名',
    prop: 'peopleName',
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
    },
    dicData: []
  },
]

export const mainTableOption = {
  page: true,
  menu: true,
  header: true,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  addBtn: false,
  index: true,
  indexLabel: "序号",
  menuAlign: 'center',
  align: 'center',
  menuWidth: "280",
  props: {
    label: 'label',
    value: 'value'
  },
  column: [{
    fixed: true,
    label: '编号',
    prop: 'applyOrderId',
    hide: true,
    editDisabled: true,
    addDisplay: false
  },
    {
      label: '预约人',
      prop: 'peopleName',
    },
    {
      label: '身份证号',
      width: 170,
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
    }, {
      label: '预约时间',
      children: [{
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
      }]
    },
    {
      label: '检查费用',
      prop: 'feeTotal'
    },
    {
      label: '订单状态',
      prop: 'orderState',
      type: "select",
      dicUrl: '/admin/dict/type/kasoft_apply_status',
      slot: true
    },
    {
      width: 180,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false,
    }
  ]
}
