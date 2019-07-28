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
      prop: 'inspResourceId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '检查类别',
      prop: 'hospitalName',
      type: "select",
      dicData: [{
        label: '体格检查',
        value: 0
      }, {
        label: '功能检查',
        value: 1
      }, {
        label: '化验检查',
        value: 2
      }],
    },
	  {
      label: '检查项目',
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
      precision:2,
    },
	  {
      label: '数量',
      prop: 'quantity',
      type: 'number',
    },
	  {
      label: '开始时间',
      prop: 'startTime',
      type: "datetime",
      format: "yyyy-MM-dd hh:mm",
      valueFormat: "timestamp",

    },

	  {
      label: '结束时间',
      prop: 'endTime',
      type: "datetime",
      format: "yyyy-MM-dd hh:mm",
      valueFormat: "timestamp",
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
    }
  ]
}
