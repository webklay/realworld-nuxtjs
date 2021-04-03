import { request } from '@/plugins/request'


// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 用户注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

//用户信息
export const userInfo = () => 
request({
    method: 'GET',
    url: '/api/user'
})

//修改用户信息
export const updateUserInfo = (data) => 
request({
    method: 'PUT',
    url: '/api/user',
    data
})

// 获取用户简介和文章信息
export const getProfiles = (username) => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`,
  })
}

