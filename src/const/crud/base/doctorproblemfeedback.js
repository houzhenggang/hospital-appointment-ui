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
      fixed: true,
      label: '编号',
      prop: 'feedbackId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '反馈类别',
      prop: 'feedbackType',
      type: 'select',
      span: 24,
      rules: [{
        required: true,
        message: '请选择反馈类别',
        trigger: 'blur'
      }],
      dicData: getDict('feedback_type')
    },
    {
      label: '反馈内容',
      prop: 'feedbackContent',
      type: 'textarea',
      span: 24,
      width: "60",
      overHidden: true,
      hide: true,
      rules:
        [{
          max: 20000,
          message: '反馈内容不得超过20000',
          trigger: 'blur'
        }]
    },
    {
      label: '软件名称',
      prop: 'softName',
    },
	  {
      label: '反馈时间',
      prop: 'feedbackTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '反馈人号',
      prop: 'personId'
    },
    {
      label: '反馈人名',
      prop: 'personName'
    },
    {
      label: '处理结果',
      prop: 'handle',
      type: 'textarea',
      span: 24,
      width: "60",
      overHidden: true,
      hide: true,
      rules:
        [{
          max: 20000,
          message: '处理结果不得超过20000',
          trigger: 'blur'
        }]
    },
	  {
      label: '处理人号',
      prop: 'handleId'
    },
    {
      label: '处理人名',
      prop: 'handleName'
    },
	  {
      label: '处理时间',
      prop: 'handleTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      addDisplay: false
    },
	  {
      label: '处理状态',
      prop: 'feedbackState',
      addDisplay: false,
      type: 'select',
      search: true,
      searchDefault: '0',
      rules: [{
        message: '请选择处理状态',
        trigger: 'blur'
      }],
      dicData: getDict('handle_state')
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
