import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/generator/doctorapplyorder/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/generator/doctorapplyorder',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/generator/doctorapplyorder/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/generator/doctorapplyorder/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/generator/doctorapplyorder',
    method: 'put',
    data: obj
  })
}
