<script context="module">
	export const load = async ({stuff}) => {
		return {
			props: {
				report: stuff.report
			}
		}
	}
</script>

<script>
	import dayjs from "dayjs";

	export let report
	console.log(report.score_list)
</script>


<table class="text-sm">
	<tr class="sticky top-14 shadow bg-white w-full">
		<td>Date</td>
		<td>Title</td>
		<td>Student</td>
		<td>Class</td>
		<td class="whitespace-nowrap">Sys mark</td>
		<td class="whitespace-nowrap">Teacher mark</td>
	</tr>
	{#each report.score_list as s}
		<tr>
			<td class="whitespace-nowrap">{dayjs(s.submission_date).format('DD MMM YYYY')}</td>
			<td>{s.title}</td>
			<td>{s.nickname}</td>
			<td>{s.class_name}</td>
			<td>{s.system_mark}</td>
			<td>{s.teacher_mark}</td>
		</tr>
	{/each}
</table>

<style>
	table {
		@apply w-full;
	}
	td, th {
		@apply px-4 py-1 border-b border-gray-200 text-left;
	}
</style>
