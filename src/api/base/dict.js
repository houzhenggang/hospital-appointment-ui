import request from '@/router/axios'

export function getDictAll () {
  return request.get(`/base/dictionariesutils/type-all`)
}