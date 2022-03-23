<script>
	import Modal from '$lib/app-shelf/modal.svelte';
	import '../styles/tailwind-output.css';
</script>

<Modal>
<main>
	<div class="z-10 top-0 fixed bg-gray-100">
		<a href="/logout">logout</a>
		<a href="/">home</a>
	</div>
	<slot />
</main>
</Modal>