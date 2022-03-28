<script>
	import {createEventDispatcher} from "svelte";
	import Dropdown2 from "$lib/ui/Dropdown2.svelte";
	export let items
	let value
	let focused = false
	let visible = false
	let dropdown_instance
	let trigger_el
	let dropdown_el
	const dispatch = createEventDispatcher()

	const onSelect = item => {
		value = item
		dispatch('input', item)
	}

	const onKeydown = (e) => {
		if (visible) {
			const code = e.keyCode
			const enter = code === 13
			const up = code === 38
			const down = code === 40
			let idx = document.activeElement.getAttribute('data-item-order')
			if (enter) {
				if (idx >= 0 && idx <= items.length - 1) {
					value = items[idx]
					trigger_el.focus()
				}
			} else if (down) {
				e.preventDefault()
				if (idx === null) idx = 0
				else if (idx < items.length - 1) idx++
				dropdown_el.querySelector(`[data-item-order="${idx}"]`).focus()
			} else if (up) {
				e.preventDefault()
				if (idx > 0) {
					idx--
					dropdown_el.querySelector(`[data-item-order="${idx}"]`).focus()
				}
			}
		}
	}
</script>

<Dropdown2 open_on_hover={false} 
           show_arrow={false} 
           animation="mild" 
           offset={0} 
           placement="bottom"
           on:show={() => {visible = true}}
           on:hide={() => {visible = false}}
           bind:this={dropdown_instance}>
	<button on:focus={() => {focused = true}}
	        on:blur={() => {focused = false}}
	        bind:this={trigger_el}
	        class="inline-block focus:outline-none" slot="activator">
		<slot value={value} {visible} {focused}></slot>
	</button>
	<ul class="dropdown" bind:this={dropdown_el}>
		{#each items as item, i}
			<li data-item-order={i} tabindex="0"
			    class:text-blue-500={item === value}
			    class="item min-w-[60px] focus:bg-slate-200 rounded focus:outline-none"
			    on:click={() => {onSelect(item)}}>
				<slot name="item" item={item}></slot>
			</li>
		{/each}
	</ul>
</Dropdown2>

<svelte:window on:keydown={onKeydown}/>
