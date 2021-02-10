import httpData from '@/utils/request'
// 部署列表
export function saveUserInfo(type, params) {
    return httpData(type,`/api/saveUserInfo`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}