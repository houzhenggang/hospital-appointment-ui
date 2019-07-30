export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  columnBtn:false,
  refreshBtn:false,
  addBtn:true,
  delBtn:false,
  editBtn:false,
  page:false,
  align:'center',
  menuAlign:'center',

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
      label: '预约人',
      prop: 'userName',
      search: true,
    },
    {
      label: '身份证号',
      prop: 'userIdcard',
    },
    {
      label: '手机号',
      prop: 'userPhone',
      search: true,
    },
    {
      label: '机构名称',
      prop: 'hospitalName',
      type: "select",
      search: true,
      dicUrl: '/admin/dict/type/kasoft_hospital',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
    {
      label: '机构电话',
      prop: 'hospitalPhone',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
    {
      label: '机构地址',
      prop: 'hospitalAddr',
      span: 24,
      row:true,
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
      prop: 'insptItemName',
      search: true,
      type: 'select',
      dicUrl: '/base/doctorinspectionitem/dict',
      props: {
        label: 'inspItemName',
        value: 'inspItemId'
      }
    },
    {
      label: '检查费用',
      prop: 'feeTotal'
    },
    {
      label: '检查资源ID',
      prop: 'insptResourceId',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '机构ID',
      editDisabled: true,
      addDisplay: false,
      hide:true,
      prop: 'hospitalId',
    },
	  {
      label: '预约人ID',
      prop: 'userId',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '数量',
      prop: 'quantity',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '预约时间',
      prop: 'applyTime',
      type: "datetime",
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
	  {
      label: '详细时间',
      prop: 'detailTime',
      type: "datetime",
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '备注',
      prop: 'remark',
      editDisabled: true,
      addDisplay: false,
      hide:true,
    },
	  {
      label: '订单状态',
      prop: 'orderState',
      type: "select",
      dicUrl: '/admin/dict/type/kasoft_apply_status',
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
    }
  ]
}
