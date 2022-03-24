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
</script>

<div class="p-4 bg-gray-50 border-b border-gray-300">
	<h1 class="mb-4">Writing report</h1>
</div>

<slot/>