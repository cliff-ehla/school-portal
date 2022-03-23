<script>
	import Modal from '$lib/app-shelf/modal.svelte';
	import '../styles/tailwind-output.css';
</script>

<Modal>
<main>
	<a href="/logout">logout</a>
	<slot />
</main>
</Modal>