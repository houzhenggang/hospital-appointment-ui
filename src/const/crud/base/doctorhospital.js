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
      label: '机构名称',
      prop: 'name'
    },
	  {
      label: '医院图片',
      prop: 'hospitalImage'
    },
	  {
      label: '机构等级',
      prop: 'hospitalLevel'
    },
	  {
      label: '介绍',
      prop: 'introduced'
    },
	  {
      label: '地址',
      prop: 'address'
    },
	  {
      label: '总机电话',
      prop: 'phone'
    },
	  {
      label: '机构联系人',
      prop: 'contactName'
    },
	  {
      label: '联系人电话',
      prop: 'contactPhone'
    },
	  {
      label: '所属地区',
      prop: 'areaId'
    },
	  {
      label: '服务电话',
      prop: 'hospitalTel'
    },
	  {
      label: '所属组织',
      prop: 'deptId'
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
