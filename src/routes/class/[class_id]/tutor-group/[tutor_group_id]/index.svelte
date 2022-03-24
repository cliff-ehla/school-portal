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
	console.log('cliff: ', lesson_list)
</script>

{#each lesson_list as lesson}
	<div class="p-4">
		<p>{lesson.type}</p>
		<p>{lesson.lesson[0].article_id}</p>
		<p>{dayjs(lesson.create_ts).format('DD MMM YYYY')} - {lesson.description} - Late: {lesson.not_completed_users.length}</p>
	</div>
{/each}
