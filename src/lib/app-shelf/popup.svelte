<script>
	import {createPopper} from '@popperjs/core'
	import {setContext} from 'svelte'
	import {tick} from "svelte";

	let tooltip_el
	let transition_el
	let visible = false
	let component = null
	let props = {}
	let instance = null
	let onCancel = () => {}
	const emptyFunc = () => {}
	const hidePopup = () => {
		visible = false
		instance = null
		window.removeEventListener('click', onClickOutside)
		onCancel()
	}
	const showPopup = async (target_el, _component, _props, config = {}) => {
		if (visible) return
		visible = true
		component = _component
		props = _props
		await tick()
		onCancel = config.onCancel || emptyFunc
		instance = createPopper(target_el, tooltip_el, {
			onFirstUpdate: state => {
				setTimeout(() => {
					window.addEventListener('click', onClickOutside)
					transition_el.classList.remove('scale-0')
					transition_el.classList.add('scale-100')
				}, 0)
			},
			placement: config.placement || 'bottom',
			modifiers: [
				{
					name: 'arrow',
					options: {
						padding: 5,
					},
				},
				{
					name: 'offset',
					options: {
						offset: [0, 10],
					},
				},
			],
		})
	}
	const onClickOutside = (e) => {
		if (!e.target.closest('#tooltip')) {
			hidePopup()
		}
	}
	const forceUpdate = () => {
		if (instance) instance.forceUpdate()
	}
	setContext('popup', {
		showPopup,
		hidePopup,
		forceUpdate
	})
</script>

{#if visible}
	<div id="tooltip" bind:this={tooltip_el}>
		<div id="arrow" data-popper-arrow></div>
			<div bind:this={transition_el} class="transform transition-transform scale-0">
				<svelte:component {...props} this={component}/>
			</div>
	</div>
{/if}

<slot></slot>