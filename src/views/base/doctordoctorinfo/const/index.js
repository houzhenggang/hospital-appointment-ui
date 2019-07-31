import { getDict } from "@/util/util"
import { getDetails } from '@/api/admin/user'

var validateUsername = (rule, value, callback) => {
  getDetails(value).then(response => {
    if (window.boxType === 'edit') callback()
    let result = response.data.data
    console.log(result)
    if (result !== undefined) {
      callback(new Error('用户名已经存在'))
    } else {
      callback()
    }
  })
}

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  align: 'center',
  menuType: "text",
  labelWidth: 150,
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'doctorId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '工号',
      prop: 'code',
      span: 24,
      rules: [{
        required: true,
        message: '请输入工号'
      }]
    }, {
      label: '关联用户ID',
      prop: 'userId',
      span: 24,
      formslot: true,
      hide: true,
    }, {
      label: '头像',
      width: "90",
      action: "/admin/file/uploadNew",
      prop: 'headImg',
      type: 'upload',
      props: {
        value: 'headImg',
        label: 'headImg'
      },
      propsHttp: {
        url: 'path',
        name: 'fileName'
      },
      imgWidth: 100,
      listType: 'picture-img'
    },
    {
      label: '医生签名',
      width: "90",
      action: "/admin/file/uploadNew",
      prop: 'doctorSign',
      type: 'upload',
      props: {
        value: 'doctorSign',
        label: 'doctorSign'
      },
      propsHttp: {
        url: 'path',
        name: 'fileName'
      },
      imgWidth: 100,
      listType: 'picture-img'
    },
    {
      label: '姓名',
      prop: 'name',
      rules: [{
        required: true,
        message: '请输入姓名'
      }]
    },
    {
      label: '性别',
      prop: 'sex',
      type: 'select',
      dicData: getDict("gender"),
    },
    {
      label: '手机号码',
      prop: 'phone'
    },
    {
      label: '出生日期',
      prop: 'birthday',
      type: "date",
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      format: 'yyyy-MM-dd',
    },
    {
      label: '身份证',
      prop: 'idCard',
      rules: [
        {required: true, message: '身份证不能为空', trigger: 'blur'},
        {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请输入正确的身份证', trigger: 'blur'},
      ],
    },
    {
      label: '人员类别',
      prop: 'doctorType',
      type: 'select',
      dicData: getDict('doctor_type'),
      search: true,
      rules: [{
        required: true,
        message: '请选择人员类别',
        trigger: 'blur'
      }],
    },
    {
      label: '医生职称',
      prop: 'doctorJobTitle',
      type: 'select',
      dicData: getDict('doctor_job')
    },
    {
      label: '护士职称',
      prop: 'nurseJobTitle',
      type: 'select',
      dicData: getDict('nursing_job')
    },
    {
      label: '接受咨询',
      prop: 'receiveCounseling',
      type: 'select',
      hide: true,
      dicData: getDict('yes_no')
    },
    {
      label: '居住地址',
      prop: 'address',
      overHidden: true,
      hide: true
    },
    {
      label: '个人擅长',
      prop: 'goodAt',
      type: 'textarea',
      overHidden: true,
      hide: true,
      span: 24,
      width: "60",
      rules:
        [{
          max: 20000,
          message: '备注信息不得超过20000',
          trigger: 'blur'
        }]
    },
    {
      label: '所属医院',
      prop: 'hospitalId',
      type: 'select',
      dicUrl: '/base/doctorhospital/dict',
      search: true,
      cascaderItem: ['departmentId'],
      props: {
        label: 'name',
        value: 'hospitalId'
      },
      rules: [{
        required: true,
        message: '请选择所属医院',
        trigger: 'blur'
      }]
    },
    {
      label: '所属科室',
      prop: 'departmentId',
      type: 'select',
      dicUrl: 'base/doctordepartmentdictionary/dict/{{key}}',
      hide: true,
      solt: true,
      props: {
        label: 'name',
        value: 'departmentId'
      }
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

export const userDialogFormOption = {
  menuBtn: false,
  labelWidth: "120",
  labelPosition: "right",
  column: [
    {
      fixed: true,
      label: '用户名',
      prop: 'username',
      editDisabled: true,
      solt: true,
      search: true,
      span: 24,
      rules: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        { validator: validateUsername, trigger: 'blur' }
      ]
    }, {
      label: '密码',
      prop: 'password',
      type: 'password',
      value: '',
      hide: true,
      span: 24,
      rules: [
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
      ]
    }, {
      label: '所属部门',
      prop: 'deptId',
      span: 24,
      hide: true,
      type: "tree",
      props: {
        label: "name",
        value: "id"
      },
      dicUrl: "/admin/dept/tree",
      rules: [
        { required: true, message: '请选择部门', trigger: 'change' }
      ]
    }, {
      label: '手机号',
      prop: 'phone',
      type: 'tel',
      value: '',
      span: 24,
      rules: [
        { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
      ]
    }, {
      label: '角色',
      prop: 'role',
      overHidden: true,
      span: 24,
      type: "select",
      multiple: true,
      dicUrl: "/admin/role/list",
      props: {
        label: "roleName",
        value: "roleId"
      },
      rules: [
        { required: true, message: '请选择角色', trigger: 'blur' }
      ]
    }, {
      label: '状态',
      prop: 'lockFlag',
      type: 'select',
      span: 24,
      rules: [
        { required: true, message: '请选择状态', trigger: 'blur' }
      ],
      dicData: [
        { label: '有效', value: '0' },
        { label: '锁定', value: '9' }
      ]
    }
  ]
}
