<script>
	import DropdownSelect from "$lib/ui/DropdownSelect.svelte";
	import Calendar from '$lib/ui/date-picker/index.svelte'
	import Icon from "$lib/ui/Icon.svelte";
	import Button from "$lib/ui/Button.svelte";
	import dayjs from "dayjs";
	import {org_data} from "$lib/store/org_data.js";
	import {http} from "$lib/http.js";
	import {onMount} from "svelte";
	export let YYYY_MM_DD

	onMount(() => {
		if (!$org_data.class_list) org_data.fetchData(fetch)
	})

	let title
	let description
	let class_id
	let start_date = dayjs().toDate()
	let end_date = dayjs(YYYY_MM_DD).toDate()

	const focus = node => {
		node.focus()
	}

	const onCreate = () => {
		http.post(fetch, '/organizationApi/purchase_work_task', {
			organization_id: $org_data.organization_id,
			start_time: dayjs(end_date).format('YYYY-MM-DD 00:00:00'), // TODO: where is end time
			title,
			tutor_group_id: 2399,
			vocab_list: ['apple']
		})
	}
</script>

<div class="">
	<div class="px-4 py-2 bg-slate-100 flex items-center">
		<p class="text-lg text-blue-500">建立朗讀練習</p>
		<div class="ml-auto">
			<Icon name="close" className="w-3 text-slate-500"/>
		</div>
	</div>
	<div class="p-4">
		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500"></div>
			<input bind:value={title}
			       use:focus
			       type="text"
			       placeholder="標題"
			       class="bg-transparent text-xl outline-none w-full pb-1 border-b-2 border-gray-300 focus:border-blue-500">
		</div>

		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">日期</div>
			<div class="flex items-center">
				<Calendar selected={start_date} on:datechange={e => {start_date = e.detail}}/>
				<p class="text-xs mx-1 text-gray-500"> 至 </p>
				<Calendar selected={end_date} on:datechange={e => {end_date = e.detail}}/>
			</div>
		</div>

		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">班別</div>
			<DropdownSelect on:input={e => {class_id = e.detail.c_id}}
			           items={$org_data.class_list || []}
			           let:item={c}
			           let:value={v}
			           let:visible
			           let:focused>
				<div class="cursor-pointer {focused || visible ? 'bg-slate-200' : 'bg-slate-100'} text-slate-500 h-8 px-2 flex items-center text-sm">
					<span>{v ? v.name : '請選擇'}</span>
					<Icon name="right" className="w-2.5 ml-2 transition-transform transform {visible ? '-rotate-90' : 'rotate-90'}"/>
				</div>
				<div slot="item">{c.name}</div>
			</DropdownSelect>
		</div>

		<div class="h-[1px] bg-slate-200 my-2"></div>

		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">口音</div>
			<button class="btn">英式</button>
			<button class="btn ml-1">美式</button>
		</div>

		<div class="flex items-center">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">內容</div>
			<textarea bind:value={description} rows="3" type="text" placeholder="內容"
			          class="bg-slate-100 text-slate-500 p-2 flex items-center text-sm w-full rounded"></textarea>
		</div>
	</div>
	<div class="py-2 px-4 border-t border-gray-200 flex justify-end">
		<Button on:click={onCreate} class="button text-sm">建立</Button>
	</div>
</div>

<style>
	.btn {
		@apply bg-slate-100 text-slate-500 h-8 px-2 flex items-center text-sm;
	}
</style>