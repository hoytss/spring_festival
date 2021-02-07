import httpData from '@/utils/request'
// 部署列表
export function deploymentList(type, params) {
    return httpData(type,`/api/test`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}

export function uploadFile(type, params) {
    return httpData(type,`/api/swap`, {
        queryParams: params,
        contentType: 'multipart/form-data'
    })
}
// 根据类型获取零件图片
export function getImgPartList(type, params) {
    return httpData(type,`/api/getImgPartList`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}
// 保存选择的模板信息
export function saveTemplateInfo(type, params) {
    return httpData(type,`/api/saveImageTemplate`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}
// 读取选择的模板信息
export function loadTemplateInfo(type, params) {
    return httpData(type,`/api/bodyTemplate`, {
        queryParams: params,
        contentType: 'application/json;charset=utf-8'
    })
}
// 执行人脸识别
export function swapFace(type, params) {
    return httpData(type,`/api/swapFace`, {
        queryParams: params,
        contentType: 'multipart/form-data'
    })
}