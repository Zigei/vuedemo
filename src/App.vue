// src/App.vue

<template>
	<div id="wrapper">
		<nav class="navbar navbar-default">
			<div class="container">
				<a class="navbar-brand" href="#">
					<i class="glyphicon glyphicon-time"></i>
					计划板
				</a>
				<ul class="nav navbar-nav">
					<li><router-link to="/home">首页</router-link></li>
					<li><router-link to="/time-entries">计划列表</router-link></li>
				</ul>
				<ul class="nav navbar-nav fr">
					<li><router-link to="/login">注册/登录</router-link></li>
				</ul>
			</div>
		</nav>
		<div class="container">
			<div class="col-sm-3" v-if="siderBarShow">
				<sidebar></sidebar>
			</div>
			<div class="col-sm-9">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import sidebar from './components/Sidebar.vue'
	export default {
		components:{sidebar:sidebar},
		computed:{
			siderBarShow(){
				const path = this.$route.path;
				let flag = path === '/login' || path ==='/sign';
				return !flag;
			}
		}
	}
</script>