const validatePrice  = (rule, value, callback) => {
  console.log("validateGapTime:"+value)
  let hour = value.split(' ')[1].split(':')[0]
  console.log("hour:"+hour)
  if((hour>=8 && hour<12)||(hour>=13&&hour<17))
  {
    console.log("hour-true:"+hour)
    callback();
  }else{
    console.log("hour-false:"+hour)
    callback(new Error('请输入正确时间段8～12 13～17'));
  }
};

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  dialogWidth: '50%',
  labelWidth: 130,
  dialogHeight: '50%',
  column: [
	  {
      label: '医院名称',
      prop: 'hospitalId',
      type: "select",
      dicUrl: '/base/doctorhospital/dict',
      span: 12,
      row:true,
      props: {
        label: 'name',
        value: 'hospitalId'
      },
      search:true,
      rules: [
        { required: true, message: '不能为空', trigger: 'change' },
      ]
    },
    {
      label: '检查类别',
      prop: 'inspItemType',
      type: "select",
      search: true,
      addDisplay:false,
      editDisplay:false,
      hide:true,
      dicUrl: '/admin/dict/type/kasoft_inspection_type',
    },
	  {
      label: '项目名称',
      prop: 'inspItemId',
      type: 'select',
      dicUrl: '/base/doctorinspectionitem/dict',
      props: {
        label: 'inspItemName',
        value: 'inspItemId'
      },
      search:true,
      span: 12,
      row:true,
      rules: [
        { required: true, message: '不能为空', trigger: 'change' },
      ]
    },
	  {
      label: '价格',
      prop: 'inspPrice',
      type: "number",
      minRows: 0,
      span: 12,
      precision:2,
      row:true,
      rules: [
        { required: true, message: '不能为空', trigger: 'change' },
      ]
    }
  ]
}
