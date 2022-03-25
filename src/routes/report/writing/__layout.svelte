<script context="module">
	import {http, onFail} from "$lib/http";

	export const load = async ({fetch}) => {
		const {data, success, debug} = await http.post(fetch, '/schoolApi/overall_writing_report', {
			start_date: '2020-01-01 00:00:00',
			end_date: '2099-01-01 00:00:00'
		})
		if (!success) return onFail(debug)
		return {
			stuff: {
				report: data
			},
			props: {
				report: data
			}
		}
	}
</script>

<script>
	export let report
	import {page} from "$app/stores";
	$: path = $page.url.pathname
	$: tabs = [
		{
			label: 'Participated <br> students',
			num: report.participated_user_cnt,
			is_active: path === '/report/writing/student',
			href: '/report/writing/student'
		},
		{
			label: 'Total <br> submission',
			num: report.score_list.length,
			is_active: path === '/report/writing/article',
			href: '/report/writing/article'
		}
	]
</script>

<div class="p-4 bg-gray-50 border-b border-gray-300">
	<h1 class="mb-2 text-3xl font-light text-slate-600">Writing report</h1>
	<div class="flex">
		{#each tabs as t}
			<a href={t.href} class="{t.is_active ? 'bg-white border-slate-300' : 'bg-slate-100 hover:bg-slate-50 hover:border-slate-300'} border rounded px-2 py-2 text-slate-800 flex items-center mr-2">
				<p class="text-xs leading-tight">{@html t.label}</p>
				<div class="ml-4 text-3xl text-blue-500 mr-2">{t.num}</div>
			</a>
		{/each}
	</div>
</div>

<slot/>
