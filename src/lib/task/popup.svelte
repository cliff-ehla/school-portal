<script>
	import {http} from "$lib/http.js";
	import {getContext} from 'svelte'
	const {forceUpdate} = getContext('popup')
	import {tick} from "svelte";

	export let article_id
	let sentences

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
	<p>Speaking exercise</p>
	<p class="font-bold">6A</p>
	<p>Feb 25</p>
	<p>Speaking of wisdom</p>
	<p>25 submitted</p>
	<p>3 late</p>
	<p>4 below average</p>
	<!--{#if sentences}-->
	<!--	{#each sentences as s}-->
	<!--		<p>{s.sentence}</p>-->
	<!--	{/each}-->
	<!--{/if}-->
</div>