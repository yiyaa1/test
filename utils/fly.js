var Fly = require('flyio/dist/npm/wx')
var fly = new Fly()

// fly.config.baseURL = 'http://192.168.0.109:7001/node/users/user_login_by_name'
fly.config.baseURL = 'http://192.168.0.109:7001/node/users/user_login_by_name'

// 拦截器
fly.interceptors.request.use(request => {
	// 给请求添加自定义header
	const token = uni.getStorageSync('token');//从本地变量中获取token
	console.log('ddcc',token)//打印
	if (token) {
		request.headers['Authorization'] = 'Bearer' + ' ' + token
	}
	// console.log('请求拦截--->',request)
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request
})


// 添加响应拦截
fly.interceptors.response.use(
	response => {
		// 只将请求结果中的data字段返回
		return response.data
	},
	err => {
		//发生网络错误后会走到这里
		//return Promise.resolve("ssss")
	})
export default fly;