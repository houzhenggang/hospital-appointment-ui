import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/base/inspectionprice/page',
    method: 'get',
    params: query
  })
}
export function fetchListS(query) {
  return request({
    url: '/base/inspectionprice/get/price/left/item/list/page',
    method: 'get',
    params: query
  })
}


export function addObj(obj) {
  return request({
    url: '/base/inspectionprice',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/base/inspectionprice/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/base/inspectionprice/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/base/inspectionprice',
    method: 'put',
    data: obj
  })
}

let baseUrl = '/base/inspectionprice'
// 获取医院字典数据
export const getPriceDict = () => {
  return request.get(`${baseUrl}/dict`)
}
