<script>
	import {createPopper} from '@popperjs/core'
	import {onMount} from "svelte";
	import gsap from 'gsap'
	import {browser} from "$app/env";
	import {createEventDispatcher} from "svelte";
	const dispatch = createEventDispatcher()
	let popup_el
	let ref_el
	let visible = false
	let delay = 350
	let timeout_id
	let popper_instance
	export let offset = 4
	export let placement = 'bottom'
	export let open_on_hover = true
	export let show_arrow = true
	export let animation = 'mild' // mild, strong
	onMount(() => {
		init()
		hide()
	})
	const animation_params = {
		mild: {
			scale: 0.5,
			ease: 'sine.out'
		},
		strong: {
			scale: 0,
			ease: 'back.out'
		}
	}
	export const show = () => {
		if (popper_instance) popper_instance.forceUpdate()
		gsap.fromTo(popup_el, {
			autoAlpha: 0,
			scale: animation_params[animation].scale
		}, {
			autoAlpha: 1,
			scale: 1,
			duration: 0.2,
			ease: animation_params[animation].ease
		})
		visible = true
		dispatch('show')
		setTimeout(() => {
			window.addEventListener('click', onWindowClick)
		}, 10)
	}
	export const hide = () => {
		gsap.set(popup_el, {
			autoAlpha: 0
		})
		visible = false
		dispatch('hide')
		window.removeEventListener('click', onWindowClick)
	}
	const toggle = () => {
		if (visible)
			hide()
		else
			show()
	}
	const onMouseLeave = () => {
		if (!open_on_hover) return
		timeout_id = setTimeout(hide, delay)
	}
	const onMouseEnter = () => {
		if (!open_on_hover) return
		if (timeout_id) clearTimeout(timeout_id)
		show()
	}
	const onWindowClick = (e) => {
		hide()
	}
	const init = () => {
		popper_instance = createPopper(ref_el, popup_el, {
			placement,
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, offset],
					},
				}
			],
		})
	}
</script>

<div on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	<div class="inline-block" bind:this={ref_el} on:click={toggle}>
		<slot {visible} name="activator"></slot>
	</div>
	<div class:hidden={!browser} bind:this={popup_el} id="tooltip">
		<div class:hidden={!show_arrow} id="arrow" data-popper-arrow></div>
		<slot/>
	</div>
</div>