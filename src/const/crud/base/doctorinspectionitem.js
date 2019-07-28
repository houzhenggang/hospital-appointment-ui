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
      prop: 'inspItemId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '检查类别（体格检查，功能检查，化验检查）',
      prop: 'inspItemType'
    },
	  {
      label: '检查项目名称',
      prop: 'inspItemName'
    },
	  {
      label: '检查项目说明（比如检查前3小时不能进食）',
      prop: 'inspItemExp'
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
