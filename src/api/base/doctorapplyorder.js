import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/base/doctorapplyorder/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/base/doctorapplyorder',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/base/doctorapplyorder/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/base/doctorapplyorder/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/base/doctorapplyorder',
    method: 'put',
    data: obj
  })
}
