<script>
	import {http} from "$lib/http.js";
	import {onMount} from "svelte";
	import dayjs from 'dayjs'
	import exportFromJSON from 'export-from-json'

	let students
	onMount(async () => {
		let {data} =  await http.post(fetch, '/schoolApi/overall_writing_report', {
			start_date: '2021-01-01 00:00:00',
			end_date: '2022-01-01 00:00:00',
			organization_id: "315"
		})
		students = data
	})

	const exportToExcel = () => {
		exportFromJSON({
			data: students,
			fileName: 'Writing report',
			exportType: 'csv'
		})
	}
</script>

<div class="p-4 mb-4 border-b border-gray-300">
	<p class="text-xl text-gray-500">Writing report</p>
	<button on:click={exportToExcel}>export</button>
</div>
{#if students}
	<tr class="sticky top-0 bg-white">
		<th>Name</th>
		<th>Class</th>
		<th>Gender</th>
		<th>Date</th>
		<th>Title</th>
		<th>Content <span class="text-xs">(system)</span></th>
		<th>Content</th>
		<th>Organization <span class="text-xs">(system)</span></th>
		<th>Organization</th>
		<th>Vocabulary <span class="text-xs">(system)</span></th>
		<th>Vocabulary</th>
		<th>Sentence <span class="text-xs">(system)</span></th>
		<th>Sentence</th>
	</tr>
	{#each students as s}
		<tr>
			<td>{s.nickname}</td>
			<td>{s.class_name}</td>
			<td>{s.gender}</td>
			<td class="whitespace-nowrap">
				{#if s.submission_date}
					{dayjs(s.submission_date).format('YYYY-MM-DD')}
				{:else}
					-
				{/if}
			</td>
			<td>{s.title || '-'}</td>
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
	th {
		@apply leading-tight font-normal text-left;
	}
	td, th {
		@apply px-4 border-b border-gray-300 py-2 text-sm;
	}
</style>