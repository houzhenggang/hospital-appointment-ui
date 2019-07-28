import request from '@/router/axios'

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
