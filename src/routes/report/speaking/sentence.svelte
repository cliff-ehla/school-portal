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
	<tr class="sticky top-0 bg-white w-full">
		<td>Title</td>
		<td>Sentence</td>
		<td>User count</td>
		<td>Average mark</td>
	</tr>
	{#each report.score_list as s}
		<tr>
			<td>{s.title}</td>
			<td>{s.sentence}</td>
			<td>{s.user_cnt}</td>
			<td>{s.avg_mark}</td>
		</tr>
	{/each}
</table>