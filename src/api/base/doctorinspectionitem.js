import request from '@/router/axios'

export function fetchList(query) {
return request({
    url: '/base/doctorinspectionitem/page',
    method: 'get',
    params: query
})
}

export function addObj(obj) {
return request({
    url: '/base/doctorinspectionitem',
    method: 'post',
    data: obj
})
}

export function getObj(id) {
return request({
    url: '/base/doctorinspectionitem/' + id,
    method: 'get'
})
}

export function delObj(id) {
return request({
    url: '/base/doctorinspectionitem/' + id,
    method: 'delete'
})
}

export function putObj(obj) {
return request({
    url: '/base/doctorinspectionitem',
    method: 'put',
    data: obj
})
}
