export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '主键',
      prop: 'inspItemId'
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
      label: '创建时间',
      prop: 'createTime'
    },
	  {
      label: '修改时间',
      prop: 'updateTime'
    },
	  {
      label: '乐观锁字段',
      prop: 'version'
    },
  ]
}
