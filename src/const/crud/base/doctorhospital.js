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
  menuAlign: 'center',
  align: 'center',
  menuWidth: "160",
  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'hospitalId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
    {
      label: '医疗机构名称',
      prop: 'name',
      span: 22,
      row: true,
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
      row: true,
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
      span: 10,
      row: true,
      dicUrl: '/admin/dict/type/HOSPITALLEVEL'
    },
    {
      label: '介绍',
      prop: 'introduced',
      type: 'textarea',
      span: 10,
      overHidden: true,
      hide: true,
      row: true,
      rules:
        [{
          max: 20000,
          message: '介绍信息不得超过20000',
          trigger: 'blur'
        }]
    },
	  {
      label: '地址',
      row: true,
      prop: 'address'
    },
	  {
      label: '所属地区',
      row: true,
      prop: 'areaId'
    },
	  {
      label: '服务电话',
      row: true,
      prop: 'hospitalTel'
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
    }
  ]
}
