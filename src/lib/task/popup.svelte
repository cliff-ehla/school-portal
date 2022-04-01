<script>
	import {http} from "$lib/http.js";
	import {getContext} from 'svelte'
	const {forceUpdate} = getContext('popup')
	import {tick} from "svelte";

	export let task
	export let article_id
	let sentences
	console.log(task)

	const fetchData = async () => {
		const {success, data} = await http.post(fetch, '/selfieArticleApi/get_article_by_id', {
			article_id
		})
		if (success) {
			sentences = data.sentences
			await tick()
			forceUpdate()
		}
	}
</script>

<div use:fetchData class="p-4 shadow max-w-[400px]">
	<div class="flex">
		<p>{task.type}</p>
		<p class="font-bold">6A</p>
	</div>
	<p class="text-xl">{task.description}</p>
	<p>Feb 25</p>

	<p>Pending submission</p>
<!--	<p>3 late</p>-->
<!--	<p>4 below average</p>-->
	{#if sentences}
		{#each sentences as s}
			<p>{s.sentence}</p>
		{/each}
	{/if}
</div>