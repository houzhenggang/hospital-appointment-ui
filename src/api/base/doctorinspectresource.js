import request from '@/router/axios'


const baseUrl = '/base/doctorinspectresource'

export function getMainTableData(params) {
  return request.get(`${baseUrl}/page`, {
    params
  })
}
export function deleteInspRes(id) {
  return request.delete(`${baseUrl}/${id}`)
}

export function updateInspRes (formData) {
  return request.put(`${baseUrl}`, formData)
}

export function createInspRes (formData) {
  return request.post(`${baseUrl}`, formData)
}


export function getHospitalById (id) {
  return request.get(`/base/doctorhospital/${id}`)
}

export function getinspItemById (inspItemId) {
  return request.get(`/base/doctorinspectionitem/${inspItemId}`)
}


export function getItemPrice (params) {
  return request.get(`/base/inspectionprice/get/price/by/hospital/and/item`, {
    params
  })
}

export function getPeriod () {
  return request.get(`/admin/dict/type/kasoft_resource_period`)
}

export function fetchList(query) {
  return request({
    url: '/base/doctorinspectresource/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/base/doctorinspectresource',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/base/doctorinspectresource/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/base/doctorinspectresource/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/base/doctorinspectresource',
    method: 'put',
    data: obj
  })
}

// 批量导入
export function batchImport(data) {
  return request.post(`${baseUrl}/save/batch`, data)
}
