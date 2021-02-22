import request from '@/utils/request'

// const basicUrl = 'http://127.0.0.1:5000/'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }
export function login(data) {
  return request({
    url: 'http://127.0.0.1:5000/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: 'http://127.0.0.1:5000/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
