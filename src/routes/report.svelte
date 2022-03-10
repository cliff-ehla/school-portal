<script>
	import {http} from "$lib/http.js";
	import {onMount} from "svelte";
	import dayjs from 'dayjs'
	import exportFromJSON from 'export-from-json'

	let tab = 'writing'
	let writing_report
	let reading_report

	$: {
		if (reading_report) console.log(reading_report)
	}

	$: {
		if (tab === 'reading' && !reading_report) {
			getReport('reading')
		}
	}

	onMount(() => {
		getReport(tab)
	})

	const getReport = async (type) => {
		const {data} = await http.post(fetch, `/schoolApi/overall_${type}_report`, {
			start_date: '2020-01-01 00:00:00',
			end_date: '2099-01-01 00:00:00',
			organization_id: "315"
		})
		if (type === 'writing') writing_report = data
		else if (type === 'reading') reading_report = data.score_list
		return data
	}

	const exportToExcel = () => {
		exportFromJSON({
			data: writing_report,
			fileName: 'Writing report',
			exportType: 'csv'
		})
	}
</script>

<div class="p-4 mb-4 border-b border-gray-300 flex">
	{#each ['writing', 'reading'] as type}
		<button class:font-bold={tab === type} on:click={() => {tab = type}} class="text-xl text-gray-500 mr-4">{type} report</button>
	{/each}
	<button class="ml-auto" on:click={exportToExcel}>Export</button>
</div>
{#if tab === 'writing'}
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
	{#if writing_report}
		{#each writing_report as s}
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
{:else if tab === 'reading'}
	<tr class="sticky top-0 bg-white">
		<th>Name</th>
		<th>Class</th>
		<th>Gender</th>
		<th>Sentence count</th>
		<th>Sentence score</th>
		<th>Word count</th>
		<th>Word score</th>
	</tr>
	{#if reading_report}
		{#each reading_report as s}
			<tr>
				<td>{s.nickname}</td>
				<td>{s.class_name}</td>
				<td>{s.gender}</td>
				<td>{s.sentence_cnt}</td>
				<td>{Math.round(s.sentence_score)}</td>
				<td>{s.word_cnt}</td>
				<td>{Math.round(s.word_score)}</td>
			</tr>
		{/each}
	{/if}
{/if}
<style>
	th {
		@apply leading-tight font-normal text-left;
	}
	td, th {
		@apply px-4 border-b border-gray-300 py-2 text-sm;
	}
</style>