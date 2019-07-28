export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'inspResourceId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '检查类别（体格检查，功能检查，化验检查）',
      prop: 'hospitalName'
    },
	  {
      label: '检查项目名称',
      prop: 'inspItemName'
    },
	  {
      label: '收费单价',
      prop: 'unitPrice'
    },
	  {
      label: '数量',
      prop: 'quantity'
    },
	  {
      label: '开始时间',
      prop: 'startTime'
    },
	  {
      label: '结束时间',
      prop: 'endTime'
    },
	  {
      label: '备注或说明',
      prop: 'remark'
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
      span: 24
    }
  ]
}
