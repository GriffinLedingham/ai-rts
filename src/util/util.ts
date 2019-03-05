import request from 'request-promise'

export function post(url, data) {
    return request({
        url: url,
        method: 'POST',
        json: true,
        body: data,
        timeout: 500
    })
}