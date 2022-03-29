<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({params, fetch}) => {
		const identifier = params.identifier
		const {
			data,
			success,
			debug,
			status
		} = await http.get(fetch, `/writingApi/get_user_writing?id=${identifier}`)
		if (!success) return onFail(debug, status)
		const {para, edit_log, comments, title, writing_id} = data
		return {
			props: {
				para, edit_log, comments, title, writing_id
			}
		}
	}
</script>

<script>
	import {dialog} from "$lib/store/dialog.js";

	export let para
	export let edit_log
	export let comments
	export let title
	export let writing_id
	import Writing from '$lib/writing/index.svelte'
	import {onMount} from "svelte";
	import {notifications} from "$lib/store/notification.js";

	let marking_category
	let user_handwriting_images
	let overall_msg
	let active_image_url
	let overall_options

	let is_edit
	let disclose
	let is_read

	onMount(async () => {
		const {data, success} = await http.post(fetch, '/writingApi/get_student_writing_submission', {
			user_writing_id: writing_id
		})
		overall_msg = data.overall_msg
		let _marking_category = data.marking_category
		user_handwriting_images = data.user_handwriting_images

		let res = await http.get(fetch, '/writingApi/writings_comment_map?subject=english')
		let data2 = res.data
		overall_options = data.overall
		disclose = data.disclose
		is_read = data.is_read
		_marking_category.forEach(cat => {
			cat.comment_template = data2[cat.title]
		})
		marking_category = _marking_category
	})

	const onSubmitClick = async (is_draft) => {
		dialog.confirm({
			title: disclose === '1' ? 'Reminder' : '',
			message: is_draft ? 'Save draft' : disclose === '1' ? 'Your grading was sent to the student, do you want to revise your grading?' : 'Send marking to the student',
			onConfirm: async () => {
				const obj = {}
				const comments = []
				marking_category.forEach(cat => {
					obj[cat.title] = cat.user_mark
					cat.comments.forEach(c => comments.push(c))
				})
				await http.post(fetch, '/writingApi/modify_mark', {
					user_writing_id: writing_id,
					disclose: is_draft ? 0 : 1,
					content_mark: obj.content,
					language_mark: obj.language,
					organizations_mark: obj.organizations,
					vocabulary_mark: obj.vocabulary,
					sentence_mark: obj.sentence,
					overall_msg
				})
				await http.post(fetch, '/writingApi/submit_comment', {
					user_writing_id: writing_id,
					comments
				})
				notifications.success(is_draft ? 'Draft saved' : disclose === '1' ? 'Marking updated' : 'Your marking have sent to student')
				history.back()
			}
		})
	}
</script>

<div class="bg-gray-50">
	<div class="p-4 max-w-screen-lg mx-auto">
		<h1 class="font-light text-gray-700 mb-4" style="font-size: 1.8em">{title || 'No title'}</h1>
		<Writing is_readonly={true} {para} {edit_log} {comments} {title} {writing_id}/>
	</div>
</div>

<p>{overall_msg}</p>