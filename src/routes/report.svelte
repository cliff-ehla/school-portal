<script>
	import {http} from "$lib/http.js";
	import {onMount} from "svelte";
	import dayjs from 'dayjs'
	// import exportFromJSON from 'export-from-json'

	let tab = 'writing'
	let writing_report
	let reading_report

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

	const exportToExcel = async (type) => {
		// if (type === 'writing') {
		// 	exportFromJSON({
		// 		data: writing_report,
		// 		fileName: 'Writing report',
		// 		exportType: 'csv'
		// 	})
		// } else if (type === 'reading') {
		// 	if (!reading_report) {
		// 		await getReport('reading')
		// 	}
		// 	exportFromJSON({
		// 		data: reading_report,
		// 		fileName: 'Reading report',
		// 		exportType: 'csv'
		// 	})
		// }
	}

	const capitalize = (text) => {
		if (!text) return
		return text.charAt(0).toUpperCase() + text.slice(1)
	}
</script>

<div class="p-4 mb-4 border-b border-gray-300 flex">
	{#each ['writing', 'reading'] as type}
		<div class="mr-8 flex items-center">
			<button class:font-bold={tab === type} on:click={() => {tab = type}} class="text-xl {tab === type ? 'text-gray-800' : 'text-gray-400 hover:text-gray-500'} ">{capitalize(type)} report</button>
			<button class="ml-1" on:click={() => {exportToExcel(type)}}>
				<img title="Download" class="w-6 transition transform hover:-translate-y-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACnUlEQVRoge2YXUhUQRiGn7HVRVddc8k0QawQw6hQohKSlsp+oDulQBGCbuxGQ1itDIx+IIWINKK86S4o6ibFEG9ywQzCEJLVSCylorYf1CJaXXe6SPvZ1ePZs3tczfNcfsP3zfvOzHc4M2BgYGAQSYTWxJSrReUg6oHEYHNtuRu1TDkupKx27Tp38+9glJZKv9AmPgQSpYiq9w+GYGBBxU8jrf6RUAwsCgwDkcYwEGlM/gFLVf4JkBcEWJQSvw+/Ua4cJYixWjElxoemcB4CDKgRrwqfZGJ0lImpqYChFe53IZefIeAIhUX8DDJsleZkyffA8jBgNkXTe+ouXy93U2Ev+R3PSE7jU70T96VHZNrSdROphCoDHu8kZ1quAVC1u4x4cxwAdQfLMZuiaei4xevPb/VTqYDqI9Ta56Rj4Ak2SxLHCw6zaU0Wxbl7Gfw4QlPnbT01KjLLZ3RuTj9oxJ61lQp7CYUbdiAQVN5rwOOd1EvfvATVxAMfXtHcdZ+k2ATy127hzrN2nIM9emlTRVA7AJAwff4BhJj/QmfpDuwNT0pCsNPOSVA7ULA+j7Jth3g63EfXUC9H8vazJ3t72MRoQbUBsymaK0UOhBCcbbtBbUsTUkoai2uIi4nVU6Miqg2c3HeM7NWZtPc/xjnYQ8+Ii9Y+JxnJadQUHtVToyKqDOSkrqPSXopP+jj/8M+jQF3bdby+KSrspWxOz9JNpBKqmtj1fojk6oKA+Ev3CCsdO8MuKhiWx7/QYmY2A9/CVt2n/4Vgth6oBS4Cod0FfVKa3Z4fgMd/yPb8i+ay/pma30ZTD+RoXl5rxiqtqbxo7vxH83/ZA0sKw0CkWdYGxsOmQj1j/gHNBoQQDhABBXVkTEocCzifgYGBgQp+AlpMnf09Cu/RAAAAAElFTkSuQmCC"/>
			</button>
		</div>
	{/each}
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