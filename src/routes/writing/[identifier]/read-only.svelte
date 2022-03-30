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
	import {is_loading} from "$lib/store/is_loading.js";
	export let para
	export let edit_log
	export let comments
	export let title
	export let writing_id
	import Writing from '$lib/writing/index.svelte'
	import {onMount} from "svelte";
	import {capitalize} from "$lib/helper/capitalize.js";

	let marking_category
	let user_handwriting_images
	let overall_msg
	let is_edit

	onMount(async () => {
		const {data, success} = await http.post(fetch, '/writingApi/get_student_writing_submission', {
			user_writing_id: writing_id
		})
		console.log(data)
		overall_msg = data.overall_msg
		marking_category = data.marking_category
		user_handwriting_images = data.user_handwriting_images
	})
</script>

<div class="bg-gray-50">
	<div class="p-4 max-w-screen-lg mx-auto">
		{#if !$is_loading && marking_category}
			<div class="flex">
				<div>
					<h1 class="font-light text-gray-700 mb-1 text-4xl">{title || 'No title'}</h1>
					<div>
						<span>Submitted by</span>
						<span>Wong Pui Shan</span>
						<span>on</span>
						<span>03 Mar 2022</span>
					</div>
				</div>

				<div class="ml-auto">
					<div class="flex border-gray-200 bg-white border rounded px-4 py-2">
						<div class="flex items-center text-4xl font-light">
							<div>{marking_category.reduce((a,c) => a += Number(c.user_mark), 0)}</div>
							<div class="mx-1 text-xl text-gray-500">/</div>
							<div class="text-3xl text-gray-500">{marking_category.reduce((a,c) => a += Number(c.max_mark), 0)}</div>
						</div>
						<div class="ml-4">
							{#each marking_category as c}
								<div class="text-xs flex">
									<div class="w-20 mr-1">{capitalize(c.title)}</div>
									<div>{c.user_mark}</div>
									<div class="mx-0.5">/</div>
									<div>{c.max_mark}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
			<div class="bg-white my-4 border border-gray-200 rounded">
				<div class="pl-4 py-2 pr-4 border-l-8 border-gray-500 rounded">
					<p class="mb-2">Teacher's comment:</p>
					<p class="text-sm leading-loose italic">{overall_msg}</p>
				</div>
			</div>
		{/if}
		<Writing is_readonly={true} {para} {edit_log} {comments} {title} {writing_id}/>
	</div>
</div>