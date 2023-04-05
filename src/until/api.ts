import http from './http'

export function getList(params: any) {
  return http({
    url: 'product/list',
    method: 'get',
    params: params
  })
}

export function getOptions(params: any) {
  return http({
    url: 'productCategory/list/withChildren',
    method: 'get',
    params: params
  })
}

export function getBrand(params: any) {
  return http({
    url: 'brand/list',
    method: 'get',
    params: params
  })
}

export function detail(params: any) {
  return http({
    url: 'sku/' + params,
    method: 'get'
  })
}

export function type(params: any) {
  return http({
    url: 'productAttribute/list/3',
    method: 'get',
    params: params
  })
}