import httpData from '@/utils/request'
// 部署列表
export function deploymentList(type, params) {
    return httpData(type,`/api/test`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}
