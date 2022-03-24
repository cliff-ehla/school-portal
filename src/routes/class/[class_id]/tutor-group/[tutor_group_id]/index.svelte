<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({params, fetch}) => {
		const {data, success, debug} = await http.post(fetch, '/courseApi/get_tutor_group_lesson_list', {
			tutor_group_id: params.tutor_group_id
		})
		if (!success) return onFail(debug)
		return {
			props: {
				lesson_list: data
			}
		}
	}
</script>

<script>
	export let lesson_list
	import dayjs from "dayjs";
	const status_to_label = {
		0: 'Not yet submit',
		1: 'Submitted',
		2: 'Making sent to student',
		3: 'Making sent to student',
		4: 'Rejected',
	}
</script>

{#each lesson_list as lesson}
	<div class="p-4">
		<p>{lesson.type}</p>
<!--		<p>{lesson.lesson[0].article_id}</p>-->
		<p>{dayjs(lesson.create_ts).format('DD MMM YYYY')} - {lesson.description}</p>
		{#if lesson.not_completed_users}
			<p>Late: {lesson.not_completed_users.length}</p>
		{/if}
		{#if lesson.assignment}
			{#each lesson.assignment as s}
				<a href="/writing/{s.identifier}" class="cursor-pointer block p-4 border-b border-gray-200 grid grid-cols-4 items-center gap-2 group hover:bg-gray-100 w-full bg-white">
					<div class="col-span-2 flex items-center">
						<div class="ml-4 flex-2">
							{s.nickname}
						</div>
					</div>
					<div class="col-span-1 flex justify-center">
						<div class="pr-4 pl-3 h-8 inline-flex items-center rounded-sm {s.status == 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700'} border-gray-300 text-sm border">
							{status_to_label[s.status]}
						</div>
					</div>
					<div class="col-span-1 flex justify-end">
						{#if s.status == 1}
							<button class="group-hover:bg-blue-700 px-4 h-10 inline-flex items-center justify-center rounded bg-blue-500 text-white font-bold">
								Mark
							</button>
						{:else if s.status == 2 || s.status == 3}
							<button class="group-hover:bg-blue-500 group-hover:text-white px-4 h-10 inline-flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 text-blue-500 text-white">
								Edit
							</button>
						{/if}
					</div>
				</a>
			{/each}
		{/if}
	</div>
{/each}
