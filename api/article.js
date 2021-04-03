import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取公共文章列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NDgxMTYsInVzZXJuYW1lIjoibHB6OTk5IiwiZXhwIjoxNTk3NzQxNTA4fQ.2yO8Fss4hYnvsIN2UYHsutQ1hmYqSSAA-UrIRnP4DOY`
    // }
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 添加关注
export const addFollow = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

// 取消关注
export const deleteFollow = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}

// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 更新文章详情
export const updateArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}

// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 评论文章
export const addComment = (slug, body) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: {body}
  })
}

// 删除评论
export const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`,
  })
}

//发布文章
export const publishArticle = data => 
request({
    method: 'POST',
    url: '/api/articles',
    data
})

// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}
