<script>
	import {createPopper} from '@popperjs/core'
	import {onMount} from "svelte";
	import gsap from 'gsap'
	let popup_el
	let ref_el
	let visible = false
	onMount(() => {
		setPos()
		hide()
	})
	const show = () => {
		gsap.fromTo(popup_el, {
			autoAlpha: 0,
			scale: 0
		}, {
			autoAlpha: 1,
			scale: 1,
			duration: 0.2,
			ease: "back.out"
		})
		visible = true
		setTimeout(() => {
			window.addEventListener('click', onWindowClick)
		}, 10)
	}
	const hide = () => {
		gsap.set(popup_el, {
			autoAlpha: 0
		})
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
						offset: [0, 8],
					},
				}
			],
		})
	}
</script>

<div bind:this={ref_el} on:click={toggle}>
	<slot name="activator"></slot>
</div>
<div bind:this={popup_el} id="tooltip">
	<div id="arrow" data-popper-arrow></div>
	<slot/>
</div>