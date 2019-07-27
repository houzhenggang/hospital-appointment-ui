import request from '@/router/axios'

const baseUrl = "/base/doctorhospital"

export function getMainTableData (params) {
  return request.get(`${baseUrl}/page`, {
    params,
  })
}

export function createHospital (formData) {
  return request.post(`${baseUrl}`, formData)
}

export function updateHospital (formData) {
  return request.put(`${baseUrl}`, formData)
}

export function deleteHospital (id) {
  return request.delete(`${baseUrl}/${id}`)
}