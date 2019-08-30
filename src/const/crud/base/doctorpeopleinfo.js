import { getDict } from "@/util/util"

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  addBtn: false,
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'peopleId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '身份证',
      prop: 'idCard',
      span: 20
    },
    // {
    //   label: '头像',
    //   action: "/admin/file/uploadNew",
    //   prop: 'headImg',
    //   type: 'upload',
    //   props: {
    //     value: 'hospitalImage',
    //     label: 'hospitalImage'
    //   }
    // },
	  {
      label: '姓名',
      prop: 'name'
    },
	  {
      label: '联系电话',
      prop: 'phone'
    },
	  {
      label: '性别',
      prop: 'sex',
      type: 'select',
      search: true,
      dicData: getDict('gender')
    },
    {
      label: '出生日期',
      prop: 'birthDate',
      type: 'date',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      format: 'yyyy-MM-dd',
    },
    {
      label: '所属地区',
      prop: 'areaId'
    },
    {
      label: '关联用户编号',
      prop: 'userId',
      editDisabled: true,
      addDisplay: false,
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
