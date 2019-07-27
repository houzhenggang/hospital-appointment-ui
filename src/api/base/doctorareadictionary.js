import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/base/doctorareadictionary/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/base/doctorareadictionary',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/base/doctorareadictionary/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/base/doctorareadictionary/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/base/doctorareadictionary',
    method: 'put',
    data: obj
  })
}
