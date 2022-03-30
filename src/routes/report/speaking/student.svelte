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
		<th>Sentence count</th>
		<th>Average score</th>
	</tr>
	{#each report.user_summary as s}
		<tr>
			<td>{s.nickname}</td>
			<td>{s.sentence_cnt}</td>
			<td>{Math.round(s.avg_mark)}</td>
		</tr>
	{/each}
</table>
