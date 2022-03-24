<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({fetch}) => {
		const {data, success, debug} = await http.get(fetch, '/organizationApi/user_organization_data_v2')
		if (!success) return onFail(debug)
		console.log(data)
		return {
			props: {
				class_list: data[0].classes
			}
		}
	}
</script>

<script>
	export let class_list
	console.log('cliff: ', class_list)
</script>

{#each class_list as c}
	<div class="p-4">
		<p>{c.name}</p>
		{#each c.tutor_groups as tg}
			<a href="/class/{c.c_id}/tutor-group/{tg.tutor_group_id}">{tg.title} ({tg.tutor_group_id})</a>
		{/each}
	</div>
{/each}