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
      prop: 'inspResourceId'
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
	  {
      label: '逻辑删除标记(0--正常 1--删除)',
      prop: 'delFlag'
    },
  ]
}
