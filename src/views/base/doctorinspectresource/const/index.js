export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  labelWidth: "130",
  width: "120",
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
      prop: 'hospitalName',
      type: "select",
      dicUrl: '/admin/dict/type/kasoft_hospital',
    },
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
      valueFormat:'hh:mm:ss',
    },
    {
      label: '结束时间',
      prop: 'endTime',
      type: "time",
      format:'hh:mm',
      valueFormat:'hh:mm:ss',
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
