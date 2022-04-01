import tippy from "tippy.js";

export const eventContent = (arg) => {
	let wrapper = document.createElement('div')
	wrapper.classList.add('bg-slate-100', 'w-full', 'py-0.5')
	let content = document.createElement('div')
	content.classList.add('overflow-hidden')
	let content_upper = document.createElement('div')
	content_upper.classList.add('flex', 'items-center')
	let content_bottom = document.createElement('div')
	content_bottom.classList.add('flex', 'items-center')
	const title_el = document.createElement('div')
	title_el.innerHTML = arg.event.extendedProps.description
	title_el.classList.add('text-xs', 'overflow-hidden', 'overflow-ellipsis', 'whitespace-nowrap')
	tippy(title_el, {
		content: 'Saying of wisdom (Part 1)'
	})
	content_bottom.appendChild(title_el)
	let class_el = document.createElement('div')
	class_el.innerHTML = '6A' // TODO
	class_el.classList.add('bg-blue-500', 'text-white', 'px-0.5', 'rounded', 'leading-tight', 'text-xs')
	let size_el = document.createElement('div')
	size_el.classList.add('px-1', 'rounded' , 'leading-tight', 'text-xs')
	size_el.innerHTML = '$8' // TODO

	let task_type_el = document.createElement('div')
	task_type_el.classList.add('bg-gray-100', 'px-1', 'rounded', 'ml-0.5' , 'leading-tight', 'overflow-hidden', 'text-xs', 'border', 'border-gray-300')
	task_type_el.innerHTML = 'Writing' // TODO
	tippy(task_type_el, {
		content: '@ 10'
	})

	content_upper.appendChild(class_el)
	content_upper.appendChild(task_type_el)
	content_upper.appendChild(size_el)
	content.appendChild(content_upper)
	content.appendChild(content_bottom)
	let left_div = document.createElement('div')
	left_div.classList.add('relative')
	let img_el = document.createElement('div')
	img_el.classList.add('h-8', 'w-8', 'rounded-full', 'bg-gray-100')
	img_el.innerHTML = '1A' // TODO
	left_div.appendChild(img_el)

	wrapper.appendChild(content)
	return {
		domNodes: [wrapper]
	}
}