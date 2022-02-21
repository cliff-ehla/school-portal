<script>
	import Popup from '$lib/app-shelf/popup.svelte';
	import Modal from '$lib/app-shelf/modal.svelte';
	import '../styles/tailwind-output.css';
</script>

<Modal>
<Popup>
<main>
	<slot />
</main>
</Popup>
</Modal>