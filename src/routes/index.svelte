<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({url, params, fetch}) => {
		const {data, success, debug} = await http.get(fetch, '/userApi/user_info')
		if (!success) return onFail(debug)
		return {
			props: {
				user_info: data[0]
			}
		}
	}
</script>

<script>
	export let user_info
	console.log('cliff: ', user_info)
</script>

<p>{user_info.username}</p>