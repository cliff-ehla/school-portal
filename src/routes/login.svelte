<script>
	import {http} from "$lib/http";
	import {goto} from '$app/navigation'
	import {getStores} from "$app/stores";
	import {sentry} from "$lib/sentry";
	import {user_info} from "$lib/store/user_info.js";

	let env = import.meta.env.VITE_ENV
	let api_base = import.meta.env.VITE_API_BASE
	const {session} = getStores()
	const is_production_url = api_base === 'https://usermodel.ehlacademy.org'

	let username = env !== 'production' ? is_production_url ? 'csl.wongkl.admin' : 'queeniedevscht1' : ''
	let password = env !== 'production' ? is_production_url ? '31851596' : 'a12345678' : ''
	let error = false
	let loading = false

	const onLogin = async () => {
		if (loading) return
		loading = true
		let {data, success} = await http.post(fetch, '/userApi/login', {
			username,
			password
		})
		if (success) {
			session.set({
				user_info: {
					username: data.username,
					nickname: data.nickname,
					profile_pic: data.avatar.filepath
				}
			})
			user_info.set({
				username: data.username,
				nickname: data.nickname,
				profile_pic: data.avatar.filepath
			})
			sentry.setUser({
				username: data.username,
				nickname: data.nickname
			})
			goto('/')
		} else {
			loading = false
			error = true
		}
	}
</script>


<div class="transform translate-y-12 sm:translate-y-0 sm:-translate-x-48 bg-left-bottom md:bg-left max-w-screen-xl mx-auto bg-no-repeat bg-contain fixed inset-0" style="background-image: url('/login-bg.jpg')"></div>
<div class="fixed left-0 md:left-1/3 lg:left-1/2 right-0 inset-y-0 flex sm:items-center justify-center md:p-4 lg:p-8">
	<div class="px-8 sm:px-20 py-8 sm:py-16 sm:bg-white bg-opacity-90 sm:border sm:border-gray-300 rounded-lg sm:shadow-lg">
		<div class="flex justify-center mb-4">
			<div class="w-16 h-16">
				<img src="/logo.png" alt="logo" class="w-16">
			</div>
		</div>
		<h1 class="font-bold mb-8 text-xl text-center text-gray-500">Tutor login</h1>
		<div class="mb-4">
			<input on:input={() => {error = false}} type="text" placeholder="Username" class="form-input w-full bg-gray-50" bind:value={username}>
		</div>
		<div>
			<input on:input={() => {error = false}} type="password" placeholder="Password" class="form-input w-full bg-gray-50" bind:value={password}>
		</div>
		{#if error}
			<p class="text-red-500 py-2 text-sm">Password and username does not match</p>
		{/if}
		<div class="mt-6">
			<button on:click={onLogin} class="{loading ? 'bg-gray-300 text-white' : 'bg-blue-500 hover:bg-blue-700 text-white'} w-full font-bold rounded py-3 px-8">Log in</button>
		</div>
	</div>
</div>

<svelte:head>
	<title>EHLA Zoom class</title>
</svelte:head>

<style>
	input {
		@apply border border-gray-300 py-3 px-4 rounded;
		min-width: 262px;
	}
</style>