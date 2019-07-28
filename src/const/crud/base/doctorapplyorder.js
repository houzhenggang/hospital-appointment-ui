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
      prop: 'applyOrderId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '机构ID',
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
      prop: 'userId'
    },
	  {
      label: '预约人姓名',
      prop: 'userName'
    },
	  {
      label: '预约人身份证号',
      prop: 'userIdcard'
    },
	  {
      label: '预约人手机号',
      prop: 'userPhone'
    },
	  {
      label: '检查项目ID',
      prop: 'insptItemId'
    },
	  {
      label: '预约检查项目名称',
      prop: 'insptItemName'
    },
	  {
      label: '检查资源ID',
      prop: 'insptResourceId'
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
      label: '备注或说明',
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
