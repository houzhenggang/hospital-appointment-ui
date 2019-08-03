export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  column: [
	  {
      label: '医院名称',
      prop: 'hospitalId',
      type: "select",
      dicUrl: '/base/doctorhospital/dict',
      props: {
        label: 'name',
        value: 'hospitalId'
      },
      search:true,
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
    },
	  {
      label: '价格',
      prop: 'inspPrice'
    }
  ]
}
