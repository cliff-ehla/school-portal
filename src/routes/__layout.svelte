<script>
	import Modal from '$lib/app-shelf/modal.svelte';
	import TopBar from '$lib/app-shelf/top-bar.svelte';
	import '../styles/tailwind-output.css';
	import {page} from "$app/stores";
	console.log($page.url.pathname)
</script>

<Modal>
<main>
	{#if $page.url.pathname !== '/login'}
	<TopBar/>
	{/if}
	<slot />
</main>
</Modal>