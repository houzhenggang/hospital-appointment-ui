export const mainSearchOption = [
  {
    label: '项目名称',
    prop: 'inspItemName',
    type: 'select',
    search: true,
    dicUrl: '/base/doctorinspectionitem/dict',
    props: {
      label: 'inspItemName',
      value: 'inspItemId'
    }
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
      prop: 'inspItemName',
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
      label: '开始时间',
      prop: 'startTime',
      type: "time",
      format:'hh:mm',
      valueFormat:'yyyy-MM-dd hh:mm:ss',
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: "time",
      format:'hh:mm',
      valueFormat:'yyyy-MM-dd hh:mm:ss',
      change: () => {
        console.log('值改变')
      },
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
      hide: true,
      editDisabled: true,
      addDisplay: false
    }
  ]
}
