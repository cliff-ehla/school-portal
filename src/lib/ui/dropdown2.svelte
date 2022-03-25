<script>
	import {createPopper} from '@popperjs/core'
	import {onMount} from "svelte";
	let popup_el
	let ref_el
	let visible = false
	onMount(() => {setPos()})
	const show = () => {
		visible = true
		setTimeout(() => {
			window.addEventListener('click', onWindowClick)
		}, 10)
	}
	const hide = () => {
		visible = false
		window.removeEventListener('click', onWindowClick)
	}
	const toggle = () => {
		if (visible)
			hide()
		else
			show()
	}
	const onWindowClick = (e) => {
		hide()
	}
	const setPos = () => {
		createPopper(ref_el, popup_el, {
			placement: 'bottom',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 4],
					},
				},
			],
		})
	}
</script>

<div bind:this={ref_el} on:click={toggle}>
	<slot name="activator"></slot>
</div>
<div class="{visible ? '' : 'opacity-0'}" bind:this={popup_el} id="tooltip">
	<div id="arrow" data-popper-arrow></div>
	<slot/>
</div>