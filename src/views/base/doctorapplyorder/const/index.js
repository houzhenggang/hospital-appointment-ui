export const mainSearchOption = [
  {
    label: '用户姓名',
    prop: 'peopleName',
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
  {
    label: '开始日期',
    prop: 'startDate',
    type: "date",
    format:'yyyy-MM-dd',
    valueFormat:'yyyy-MM-dd',
  },
  {
    label: '截止日期',
    prop: 'endDate',
    type: "date",
    format:'yyyy-MM-dd',
    valueFormat:'yyyy-MM-dd',
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
    },
    {
      label: '日期',
      prop: 'inspItemDate',
      type: "date",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
    },
    {
      label: '时间段',
      prop: 'period',
      type: 'select',
      dicUrl: '/admin/dict/type/kasoft_resource_period',
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
