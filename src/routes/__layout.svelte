<script>
	import Modal from '$lib/app-shelf/modal.svelte';
	import Popup from '$lib/app-shelf/popup.svelte';
	import TopBar from '$lib/app-shelf/top-bar.svelte';
	import LoadingBar from '$lib/app-shelf/indeterminate-loading-bar.svelte'
	import ConfirmDialog from "$lib/app-shelf/ConfirmDialog.svelte";
	import {navigating} from "$app/stores";
	import '../styles/tailwind-output.css';
	import {page} from "$app/stores";
</script>

<ConfirmDialog>
	<Modal>
		<Popup>
			<main>
				{#if $navigating}
					<div class="fixed inset-x-0 top-0 z-50">
						<LoadingBar/>
					</div>
				{/if}
				{#if $page.url.pathname !== '/login' && $page.url.pathname !== '/logout'}
				<TopBar/>
				{/if}
				<slot />
			</main>
		</Popup>
	</Modal>
</ConfirmDialog>