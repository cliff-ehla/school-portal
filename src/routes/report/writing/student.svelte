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
	export let report
</script>

<table>
	<tr class="sticky top-14 bg-white shadow">
		<th>Student</th>
		<th>Class</th>
		<th>Count</th>
		<th>Sys.Score</th>
		<th>Teacher Score</th>
	</tr>
	{#each report.user_summary as s}
		<tr>
			<td>{s.nickname}</td>
			<td>{s.class_name}</td>
			<td>{s.rec_cnt}</td>
			<td>{Math.round(s.system_mark)}</td>
			<td>{Math.round(s.teacher_mark)}</td>
		</tr>
	{/each}
</table>
