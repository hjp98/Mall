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
//获取添加商品页中填写商品属性的商品类型
export function attrType(params: any) {
  return http({
    url: 'productAttribute/category/list',
    method: 'get',
    params: params
  })
}

//获取添加商品页中填写商品属性的商品规格与商品参数
export function attrList(val: any, params: any) {
  return http({
    url: 'productAttribute/list/' + val,
    method: 'get',
    params: params
  })
}
//获取添加商品页中商品关联
export function getRelevance() {
  return http({
    url: 'subject/listAll',
    method: 'get'
  })
}
export function getRelevanceList() {
  return http({
    url: 'prefrenceArea/listAll',
    method: 'get'
  })
}
//获取商品分类
export function getfoodsType(val:any,params: any) {
  return http({
    url: 'productCategory/list/' + val,
    method: 'get',
    params: params
  })
}
//筛选属性
export function getwithAttr() {
  return http({
    url: 'productAttribute/category/list/withAttr',
    method: 'get',
  })
}