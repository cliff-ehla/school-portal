<script context="module">
	import {http, onFail} from "$lib/http";
	import {org_data} from "$lib/store/org_data.js";

	export const load = async ({fetch}) => {
		const {data, success, debug} = await http.get(fetch, '/organizationApi/user_organization_data_v2')
		if (!success) return onFail(debug)
		org_data.setData(data[0])
		return {
			props: {
				class_list: data[0]
			}
		}
	}
</script>

<script>
	export let class_list
	import Icon from "$lib/ui/Icon.svelte";
	console.log($org_data)
</script>

<div class="container mx-auto py-4 grid grid-cols-3 gap-4">
	{#if $org_data.class_list}
	{#each $org_data.class_list as c}
		{#if c.tutor_groups.length > 1}
			<div class="p-4 bg-slate-50 shadow rounded-lg text-center text-slate-600">
				<p class="text-4xl font-light mb-2">{c.name}</p>
				{#each c.tutor_groups as tg}
					<a class="block px-4 py-2 bg-white my-1 rounded flex items-center hover:bg-slate-200 text-left text-sm"
					   href="/class/{c.c_id}/tutor-group/{tg.tutor_group_id}">
						{tg.title}
						<span class="ml-auto">
							<Icon name="right" className="w-3 ml-1"/>
						</span>
					</a>
				{/each}
			</div>
		{:else if c.tutor_groups.length === 1}
			<a href="/class/{c.c_id}/tutor-group/{c.tutor_groups[0].tutor_group_id}" class
							="p-4 bg-slate-50 hover:text-blue-500 hover:bg-slate-100 shadow rounded-lg text-center text-slate-600">
				<p class="text-4xl font-light">{c.name}</p>
			</a>
		{/if}
	{/each}
	{/if}
</div>