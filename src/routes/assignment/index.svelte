<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({params, fetch}) => {
		const {data, success, debug} = await http.post(fetch, '/courseApi/get_tutor_group_lesson_list', {
			tutor_group_id: 2399
		})
		console.log(data)
		if (!success) return onFail(debug)
		return {
			props: {
				lesson_list: data
			}
		}
	}
</script>


<script>
	import {getContext} from "svelte";
	const {showPopup} = getContext('popup')
	import Popup from '$lib/task/popup.svelte'
	import CreateTaskPopup from '$lib/task/create-task-popup.svelte'

	export let lesson_list
	let calendar
	const TBC_EVENT_SOURCE = 'tbc'
	let double_click_timestamp
	const init = node => {
		calendar = new FullCalendar.Calendar(node, {
			eventClassNames: ({event}) => {
				return `day_id_${event.extendedProps.day_id}`
			},
			eventSources: [
				{
					events: lesson_list.map(e => ({
						start: e.start_time,
						title: e.description,
						extendedProps: e
					})),
					id: 'GROUP'
				}
			],
			eventClick: ({event, el}) => {
				showPopup(el, Popup, {
					article_id: event.extendedProps.lesson[0].article_id
				}, {
					placement: 'right'
				})
			},
			dateClick: function(info) {
				let _now = new Date().getTime()
				if (_now - double_click_timestamp < 300)  {
					onDoubleClick(info)
				}
				double_click_timestamp = _now
			}
		})
		calendar.render()
	}

	const onDoubleClick = (info) => {
		calendar.addEventSource({
			id: TBC_EVENT_SOURCE,
			events: [{
				start: info.dateStr,
				title: 'New event',
				extendedProps: {
					day_id: 'gg777'
				}
			}]
		})
		const temp_el = document.querySelector('.day_id_gg777')
		showPopup(temp_el, CreateTaskPopup, {
			YYYY_MM_DD: info.dateStr
		}, {
			onCancel: () => {
				let source = calendar.getEventSourceById(TBC_EVENT_SOURCE)
				if (source) source.remove()
			}
		})
	}
</script>

<div use:init></div>