# RealWorld

```sh
# 安装依赖
npm install

# 启动开发服务
npm run dev
```

# 引入静态资源
国内cdn资源
https://www.jsdelivr.com
搜索 ionicons
找到2.0.1版本，找到对应链接


# 设置自定义路由

nuxt.config.js中

# 路由高亮
nuxt.config.js
router: {
    linkActiveClass: 'active',
}

# 登录验证
1 middleware文件夹中写入验证逻辑
2 在需要验证的页面引入中间件
export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: 'authenticated',
  name: 'EditorIndex'
}
3.已经登录过在访问登录页跳转到首页
4.前后端验证都可以处理


# watchQuery
watchQuery: ['page'],
当url参数page改变时触发页面执行

## 请求优化
接口之间没有执行先决条件时，不用多个await,用promise.all去并行执行

## axios拦截器封装
plugins目录下request.js
nuxt.config.js中注册
  plugins: [
    '~/plugins/request.js',
  ]

## 日期插件
dayjs
vue 过滤器

//封装 {{ 表达式 | 过滤器 }}
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
// 使用
`<span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>`


## 处理点击事件防止重复点击执行
1. 遍历接口数据，给对象添加一个状态变量
`articles.forEach(article => article.favoriteDisabled = false)`
2. 点击按钮添加disabled条件
  `<button
    class="btn btn-outline-primary btn-sm pull-xs-right"
    :class="{
      active: article.favorited
    }"
    @click="onFavorite(article)"
    `:disabled="article.favoriteDisabled"`
   >`
3. 在点击按钮事件时处理状态
` async onFavorite (article) {
     // 发起请求时将禁用状态设为true
    `article.favoriteDisabled = true`
      if (article.favorited) {
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      // 结束请求时将禁用状态设为false
      `article.favoriteDisabled = false`
    }`

## 将markdown转化为html
markdown-it库

// 使用 
async asyncData ({ params }) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    `const md = new MarkdownIt()`
    `article.body = md.render(article.body)`
    return {
      article
    }
  },

## 在指定页面设置头部信息，有助于seo
head () {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description }
      ]
    }
  }


## nuxtjs发布部署

2. 发布
  上传这些文件
  .nuxt,.static,nuxt.config.js,package.json,package-lock.json

  ssh连接到远程服务器
  服务器新建一个目录，复制服务器目录

  scp .\服务器的目录

  服务端安装依赖

  启动web服务
  1. npm run start 
  2. pm2 start npm -- start
    

## pm2常用命令
pm2 list 查看应用列表
pm2 start 启动应用
pm2 stop 停止应用
pm2 reload 重载应用 （保留一个进程激活的情况下，一个一个的重启）
pm2 restart 重启应用 （所有进程杀死，重新启动）
pm2 delete 删除应用


## realword账号
lxz
test996@qq.com
test_123456
