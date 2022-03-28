<script>
	import DropdownSelect from "$lib/ui/DropdownSelect.svelte";
	import Icon from "$lib/ui/Icon.svelte";
	export let YYYY_MM_DD

	let title
	let description
	let class_id
	const focus = node => {
		node.focus()
	}

	let classes = [
		{
			id: 1,
			label: '1a',
		},
		{
			id: 2,
			label: '1b',
		}
	]
</script>

<div class="">
	<div class="px-4 py-2 bg-slate-200 flex items-center">
		<p class="text-sm text-blue-500">Writing assigment</p>
		<div class="ml-auto">
			<Icon name="close" className="w-3 text-slate-500"/>
		</div>
	</div>
	<div class="p-4">
		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500"></div>
			<input bind:value={title} use:focus type="text" placeholder="標題" class="bg-transparent text-xl outline-none w-full pb-1 border-b-2 border-gray-300 focus:border-blue-500">
		</div>

		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">日期</div>
			<div class="flex">
				<p class="text-sm bg-slate-100 text-slate-500 px-2 py-1">{YYYY_MM_DD}</p>
				<p> - </p>
				<p class="text-sm bg-slate-100 text-slate-500 px-2 py-1">{YYYY_MM_DD}</p>
			</div>
		</div>

		<div class="flex items-center mb-2">
			<div class="w-12 flex-shrink-0 text-xs text-slate-500">班別</div>
			<DropdownSelect on:input={e => {class_id = e.detail.id}}
			           items={classes}
			           let:item={c}
			           let:value={v}
			           let:visible
			           let:focused>
				<div class="cursor-pointer {focused || visible ? 'bg-slate-200' : 'bg-slate-100'} text-slate-500 h-8 px-2 flex items-center text-sm">
					<span>{v ? v.label : '請選擇'}</span>
					<Icon name="right" className="w-2.5 ml-2 transition-transform transform {visible ? '-rotate-90' : 'rotate-90'}"/>
				</div>
				<div slot="item">{c.label}</div>
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
			<textarea bind:value={description} rows="3" use:focus type="text" placeholder="內容"
			          class="bg-slate-100 text-slate-500 p-2 flex items-center text-sm w-full rounded"></textarea>
		</div>
	</div>
	<div class="py-2 px-4 border-t border-gray-200 flex justify-end">
		<button class="button text-sm">建立</button>
	</div>
</div>

<style>
	.btn {
		@apply bg-slate-100 text-slate-500 h-8 px-2 flex items-center text-sm;
	}
</style>