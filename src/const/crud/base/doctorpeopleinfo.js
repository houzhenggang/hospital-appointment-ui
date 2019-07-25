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
      label: '主键',
      prop: 'id'
    },
	  {
      label: '医保卡号',
      prop: 'cardNumber'
    },
	  {
      label: '身份证',
      prop: 'idCard'
    },
	  {
      label: '身份证正面照片',
      prop: 'idCardFront'
    },
	  {
      label: '身份证背面照片',
      prop: 'idCardBack'
    },
	  {
      label: '头像',
      prop: 'headImg'
    },
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
      label: '性别  1：男  2：女',
      prop: 'sex'
    },
	  {
      label: '出生日期',
      prop: 'birthDate'
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
      label: '第三方关联编号',
      prop: 'syncId'
    },
	  {
      label: '关联用户编号',
      prop: 'userId'
    },
	  {
      label: '创建时间',
      prop: 'createTime'
    },
	  {
      label: '修改时间',
      prop: 'updateTime'
    },
	  {
      label: '是否删除  -1：已删除  0：正常',
      prop: 'delFlag'
    },
	  {
      label: '',
      prop: 'tenantId'
    },
  ]
}
