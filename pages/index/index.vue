<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view>

		</view>
	</view>
</template>

<script>
	import fly from '../../utils/fly.js';
	import io from '@/utils/weapp.socket.io.js';
	export default {
		data() {
			return {

			}
		},
		created() {
			this.login() //看生命周期  进入页面顺序 
		},
		methods: { //自己定义的 不调用不会执行  
			login() {

				let data = {
					user_name: 'hanranran',
					user_password: 'hanranran'
				}

				fly.post('http://192.168.0.109:7001/node/users/user_login_by_name', data).then(res => {
					console.log('svdsvbfg', res) //打印返回返回数据	
					if (res.success === true) { //判断调用接口成功
						uni.setStorageSync('token', res.response.data.token) //token存到本地变量
						uni.setStorageSync('visitor_id', res.response.data.visitor)
					}
				})
			},
			socket_io() {
				let login_socket = io('http://192.168.0.109:7002/node_namespace_login');
				login_socket.on('connect', () => {
					console.log('login_socket---->', login_socket.id);
					
					let data = {
						visitor_id: uni.getStorageSync('visitor_id'),
						socket_id: login_socket.id
					};
				fly.post('/node/visitors/init_room_for_visitor_in_login',data)
					}
				)
				
				
				let social_socket = io('http://192.168.0.109:7002/node_namespace_social');
				social_socket.on('connect', () => {
					console.log('social_socket---->', social_socket.id);
					
					let data = {
						visitor_id: uni.getStorageSync('visitor_id'),
						socket_id: social_socket.id
					};
				fly.post('/node/visitors/init_room_for_visitor_in_social',data)
					}
				)
				
			},
		}

	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
