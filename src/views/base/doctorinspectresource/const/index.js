export const mainSearchOption = [
  {
    label: '医院名称',
    prop: 'hospitalId',
    type: "select",
    dicUrl: '/base/doctorhospital/dict',
    props: {
      label: 'name',
      value: 'hospitalId'
    }
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
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'inspResourceId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '医院名称',
      prop: 'hospitalId',
      type: "select",
      dicUrl: '/base/doctorhospital/dict',
      props: {
        label: 'name',
        value: 'hospitalId'
      }
    },
    {
      label: '项目名称',
      prop: 'inspItemId',
      type: 'select',
      dicUrl: '/base/doctorinspectionitem/dict',
      props: {
        label: 'inspItemName',
        value: 'inspItemId'
      }
    },
    {
      label: '收费单价',
      prop: 'unitPrice',
      type: 'number',
      precision: 2,
      minRows: 0,
    },
    {
      label: '数量',
      prop: 'quantity',
      type: 'number',
      minRows: 0,
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
      label: '备注或说明',
      prop: 'remark',
      row: true,
      span: 14,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      width: 180,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    }
  ]
}
