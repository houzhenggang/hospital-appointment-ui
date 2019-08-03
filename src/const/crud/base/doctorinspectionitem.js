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
      prop: 'inspItemId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '检查类别',
      prop: 'inspItemType',
      type: "select",
      search: true,
      dicUrl: '/admin/dict/type/kasoft_inspection_type',
      rules: [{
        required: true,
        message: "不能为空",
        trigger: 'blur'
      }],
    },
	  {
      label: '检查项目',
      prop: 'inspItemName',
      rules: [{
        required: true,
        message: "不能为空",
        trigger: 'blur'
      }],
    },
	  {
      label: '检查项说明',
      prop: 'inspItemExp',
      type: 'textarea',
      span: 24,
    },
    {
      label: "热门项目",
      prop: "hotFlag",
      type: "radio",
      dicData:[{
        label: '非热门',
        value: "0"
      }, {
        label: '热门',
        value: "1"
      }],
      valueDefault: "0",
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
