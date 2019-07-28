export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  labelWidth: "130",
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'applyOrderId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '姓名',
      prop: 'userName'
    },
    {
      label: '身份证号',
      prop: 'userIdcard'
    },
    {
      label: '手机号',
      prop: 'userPhone'
    },
	  {
      label: '机构ID',
      editDisabled: true,
      addDisplay: false,
      hide:true,
      prop: 'hospitalId'
    },
	  {
      label: '机构名称',
      prop: 'hospitalName'
    },
	  {
      label: '机构电话',
      prop: 'hospitalPhone'
    },
	  {
      label: '机构地址',
      prop: 'hospitalAddr'
    },
	  {
      label: '预约人ID',
      prop: 'userId',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '检查项目ID',
      prop: 'insptItemId',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '检查项目',
      prop: 'insptItemName'
    },
	  {
      label: '检查资源ID',
      prop: 'insptResourceId',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '检查费用',
      prop: 'feeTotal'
    },
	  {
      label: '数量',
      prop: 'quantity'
    },
	  {
      label: '预约时间',
      prop: 'applyTime'
    },
	  {
      label: '详细时间',
      prop: 'detailTime'
    },
	  {
      label: '备注',
      prop: 'remark'
    },
	  {
      label: '订单状态',
      prop: 'orderState'
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
