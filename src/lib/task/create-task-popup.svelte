<script>
	import SelectionBox from '$lib/ui/selection-box.svelte'
	export let YYYY_MM_DD

	const focus = node => {
		node.focus()
	}
</script>

<div class="p-4">
	<p class="text-sm text-gray-500">Writing assigment</p>
	<div class="mb-2">
		<input use:focus type="text" placeholder="Title of writing" class="bg-transparent text-lg outline-none w-full">
		<textarea rows="1" use:focus type="text" placeholder="Writing instruction" class="mt-1 bg-transparent text-sm outline-none w-full"></textarea>
	</div>
	<p class="text-sm">{YYYY_MM_DD}</p>
	<SelectionBox simple_array options={['1a', '1b', '1c', '1d']}></SelectionBox>
	<div class="mt-4">
		<button class="button">Create</button>
	</div>
</div>