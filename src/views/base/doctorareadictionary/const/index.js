import { getDict } from "@/util/util"

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: "text",
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    {
      label: '类型',
      prop: 'areaType',
      type: 'select',
      dicData: getDict('area_type'),
      search: true,
      rules: [{
        required: true,
        message: '请选择类型',
        trigger: 'blur'
      }]
    },
	  {
      label: '编号',
      prop: 'areaId',
      search: true,
      rules: [{
        required: true,
        message: '请选择编号',
        trigger: 'blur'
      }]
    },
	  {
      label: '名称',
      prop: 'name',
      search: true,
      rules: [{
        required: true,
        message: '请选择名称',
        trigger: 'blur'
      }]
    },
	  {
      label: '父级编号',
      prop: 'parentAreaId',
      search: true,
      rules: [{
        required: true,
        message: '请选择父级编号',
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
