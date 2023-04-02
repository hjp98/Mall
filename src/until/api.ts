import http from "./http";

export function getList(params:any) {
  return http({
      url: 'product/list',
      method: "get",
      params: params
  })
}