export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  labelWidth: "130",
  width:"120",
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
      label: '医院',
      prop: 'hospitalName',
      type: "select",
      search: true,
      row:true,
      span:14,
      dicUrl: '/admin/dict/type/kasoft_hospital',
    },
	  {
      label: '检查项目',
      prop: 'inspItemName',
      type: 'select',
      search: true,
      row:true,
      span:14,
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
      precision:2,
      minRows: 0,
      row:true,
      span:14,
    },
	  {
      label: '数量',
      prop: 'quantity',
      type: 'number',
      row:true,
      minRows: 0,
      span:14,
    },
    {
      label: '时间段',
      prop: 'period',
      type: 'select',
      search: true,
      row:true,
      span:14,
      dicUrl: '/admin/dict/type/kasoft_resource_period',

    },
	  {
      label: '备注或说明',
      prop: 'remark',
      row: true,
      span: 14,
    },
    {
      width: 180,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      hide: true
    }
  ]
}
