<script>
	import {http} from "$lib/http.js";
	import {onMount} from "svelte";
	let students
	onMount(async () => {
		let {data} =  await http.post(fetch, '/schoolApi/overall_reading_report', {
			start_date: '2021-01-01 00:00:00',
			end_date: '2022-01-01 00:00:00',
			organization_id: "315"
		})
		students = data.score_list
	})
</script>

{#if students}
	<tr class="sticky top-0 bg-white">
		<th>name</th>
		<th>class</th>
		<th>gender</th>
		<th>title</th>
		<th>sys content</th>
		<th>content</th>
		<th>sys organization</th>
		<th>organization</th>
		<th>sys vocabulary</th>
		<th>vocabulary</th>
		<th>sys sentence</th>
		<th>sentence</th>
	</tr>
	{#each students as s}
		<tr>
			<td>{s.nickname}</td>
			<td>{s.class_name}</td>
			<td>{s.gender}</td>
			<td>{s.title}</td>
			<td>{s.system_content_mark}</td>
			<td>{s.content_mark}</td>
			<td>{s.system_organizations_mark}</td>
			<td>{s.organizations_mark}</td>
			<td>{s.system_vocabulary_mark}</td>
			<td>{s.vocabulary_mark}</td>
			<td>{s.system_sentence_mark}</td>
			<td>{s.sentence_mark}</td>
		</tr>
	{/each}
{/if}

<style>
	td, th {
		padding: 2px;
	}
</style>