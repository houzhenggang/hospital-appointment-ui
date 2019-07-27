/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuWidth: 300,
  menuAlign: 'center',
  align: 'center',
  dialogWidth: '85%',
  labelWidth: 130,
  dialogHeight: '78%',
  menuType: "text",
  props: {
    label: 'label',
    value: 'value'
  },
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'hospitalId',
      span: 24,
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '医疗机构名称',
      width: "120",
      prop: 'name',
      overHidden: true,
      span: 10,
      rules: [{
        required: true,
        message: '请输入医疗机构名称',
        trigger: 'blur',
      }]
    },
    {
      label: '医院图片',
      width: "90",
      action: "/admin/file/uploadNew",
      prop: 'hospitalImage',
      type: 'upload',
      props: {
        value: 'hospitalImage',
        label: 'hospitalImage'
      },
      propsHttp: {
        url: 'path',
        name: 'fileName'
      },
      imgWidth: 100,
      listType: 'picture-img'
    },
    {
      label: '医院等级',
      prop: 'hospitalLevel',
      type: 'select',
      width: "120",
      span: 10,
      dicUrl: '/admin/dict/type/HOSPITALLEVEL'
    },
    {
      label: '介绍',
      prop: 'introduced',
      type: 'textarea',
      span: 10,
      width: "60",
      overHidden: true,
      hide: true,
      rules:
        [{
          max: 20000,
          message: '介绍信息不得超过20000',
          trigger: 'blur'
        }]
    },
    {
      label: '地址',
      width: "60",
      hide: true,
      prop: 'address'
    },
    {
      label: '总机电话',
      width: "90",
      prop: 'phone'
    },
    {
      label: '医院服务电话',
      width: "120",
      hide: true,
      prop: 'hospitalTel'
    },
    {
      label: '机构联系人',
      width: "110",
      prop: 'contactName'
    },
    {
      label: '联系人电话',
      width: "110",
      prop: 'contactPhone'
    },
    {
      label: '所属地区',
      width: "90",
      prop: 'areaId'
    },
    {
      label: '所属组织',
      prop: 'deptId',
      formsolt: true,
      solt: true,
      span: 24,
      hide: true,
      rules: [{
        required: true,
        message: '所属组织',
        trigger: 'change'
      }]
    },
    {
      label: '是否合作',
      prop: 'cooperation',
      type: 'select',
      width: "90",
      hide: true,
      span: 6,
      dicUrl: '/base/dictionariesutils/type/YesNo'
    },
    {
      label: '是否可建档',
      width: "110",
      prop: 'archives',
      type: 'select',
      hide: true,
      span: 6,
      dicUrl: '/base/dictionariesutils/type/YesNo'
    },
    {
      label: '是否推送短信',
      prop: 'msg',
      type: 'select',
      width: "120",
      hide: true,
      span: 6,
      dicUrl: '/base/dictionariesutils/type/YesNo'
    },
    {
      label: '是否有专案',
      width: "110",
      prop: 'project',
      type: 'select',
      hide: true,
      span: 6,
      dicUrl: '/base/dictionariesutils/type/HaveNo'
    },
    {
      label: '关联医院',
      prop: 'associated',
      type: 'select',
      dicUrl: '/base/doctorhospital/dict',
      props: {
        label: 'name',
        value: 'id'
      },
      hide: true
    },
    {
      label: '上级医院',
      prop: 'parentId',
      type: 'select',
      dicUrl: '/base/doctorhospital/dict',
      props: {
        label: 'name',
        value: 'id'
      },
      hide: true
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
