<script>
	import {createEventDispatcher} from "svelte";
	import Dropdown2 from "$lib/ui/dropdown2.svelte";
	export let items
	let value
	const dispatch = createEventDispatcher()

	const onSelect = item => {
		value = item
		dispatch('input', item)
	}
</script>

<Dropdown2 open_on_hover={false} offset={0} placement="bottom">
	<div class="inline-block" slot="activator">
		<slot value={value}></slot>
	</div>
	<ul class="dropdown">
		{#each items as item}
			<li class:font-bold={item === value} class="item min-w-[60px]" on:click={() => {onSelect(item)}}>
				<slot name="item" item={item}></slot>
			</li>
		{/each}
	</ul>
</Dropdown2>
