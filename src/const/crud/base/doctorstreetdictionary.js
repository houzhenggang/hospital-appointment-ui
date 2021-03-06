import { getDict } from "@/util/util"

var DIC = {
  StreetType: [{
    label: '街道',
    value: '1'
  }, {
    label: '居委会',
    value: '2'
  }]
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: "text",
  column: [
    {
      label: '类型',
      prop: 'streetType',
      type: 'select',
      search: true,
      dicData:  DIC.StreetType,
      rules: [{
        required: true,
        message: '请选择类型',
        trigger: 'blur'
      }]
    },
	  {
      label: '编号',
      prop: 'streetId',
      search: true,
      rules: [{
        required: true,
        message: '请输入编号',
        trigger: 'blur'
      }]
    },
	  {
      label: '名称',
      prop: 'name',
      search: true,
      rules: [{
        required: true,
        message: '请输入名称',
        trigger: 'blur'
      }]
    },
	  {
      label: '上级编号',
      prop: 'parentId',
      search: true,
      rules: [{
        required: true,
        message: '请输入上级编号',
        trigger: 'blur'
      }]
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
