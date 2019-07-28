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
  menuType: "text",
  labelWidth: "130",

  column: [
    {
      fixed: true,
      label: '编号',
      prop: 'departmentId',
      hide: true,
      editDisabled: true,
      addDisplay: false
    },
	  {
      label: '科室名称',
      prop: 'name',
      rules: [{
        required: true,
        message: '请输入科室名称'
      }]
    },
    {
      label: '介绍',
      prop: 'introduced',
      type: 'textarea',
      overHidden: true,
      hide: true,
      span: 24,
      width: "60",
      rules:
        [{
          max: 20000,
          message: '介绍信息不得超过20000',
          trigger: 'blur'
        }]
    },
	  {
      label: '科室联系人',
      prop: 'contactName'
    },
	  {
      label: '联系人电话',
      prop: 'contactPhone'
    },
    {
      label: '所属医院',
      prop: 'hospitalId',
      type: 'select',
      dicUrl: '/base/doctorhospital/dict',
      search: true,
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
      width: 180,
      label: '创建时间',
      prop: 'createTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      editDisabled: true,
      addDisplay: false
    }
  ],
  mounted() {
    this.data.hospitalId = this.data.hospitalName
  },
}
