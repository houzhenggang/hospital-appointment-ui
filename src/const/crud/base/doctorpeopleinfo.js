import { getDict } from "@/util/util"

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
      prop: 'peopleId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '医保卡号',
      prop: 'cardNumber'
    },
	  {
      label: '慢性病',
      prop: 'hasChronicDisease',
      type: 'select',
      search: true,
      dicData: getDict('have_no')
    },
	  {
      label: '慢性病内容',
      prop: 'chronicDisease'
    },
	  {
      label: '身份证',
      prop: 'idCard'
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
      label: '昵称',
      prop: 'nickname'
    },
	  {
      label: '联系电话',
      prop: 'phone'
    },
	  {
      label: '固定电话',
      prop: 'tel'
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
      label: '联系人姓名',
      prop: 'linkName'
    },
	  {
      label: '联系人电话',
      prop: 'linkPhone'
    },
	  {
      label: '摘要',
      prop: 'note'
    },
	  {
      label: '地区',
      prop: 'areaId'
    },
	  {
      label: '关联用户编号',
      prop: 'userId'
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
