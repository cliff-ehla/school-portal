<script>
	import Icon from '$lib/ui/icon.svelte'
	import Dropdown from '$lib/ui/dropdown.svelte'
	import {page, session} from "$app/stores";

	const nav_items = [
		{
			href: `/assignment`,
			title: 'Assignment'
		},
		{
			href: `/class`,
			title: 'Class'
		},
		{
			href: `/report`,
			title: 'Report'
		}
	]
</script>

<div class="h-14 items-center flex border-gray-300 border-b px-4 relative sticky bg-white z-30 top-0 inset-x-0">
	<a href="/" class="inline-flex items-center ml-1">
		<img src="/logo.png" alt="logo" class="w-8 mx-auto">
		<p class="ml-2 text-lg font-light leading-none mt-0.5 text-gray-500">EHLA</p>
	</a>
	<div class="flex items-center justify-center ml-6">
		{#each nav_items as item}
			<a class="relative h-14 flex items-center p-2 mx-1 font-light hover:bg-blue-50 group" class:text-blue-500={$page.url.pathname.includes(item.href)} href={item.href}>
				<span>{item.title}</span>
			</a>
		{/each}
	</div>
	{#if $session.user_info}
	<div class="ml-auto flex items-center">
		<Dropdown open_on_hover={false} placement="bottom-end" activator_style="rounded-full ml-3">
			<div slot="activator">
				<div class="rounded-full w-8 h-8 bg-cover bg-center" style="background-image: url({$session.user_info.profile_pic})"></div>
			</div>
			<div class="dropdown w-56">
				<p class="text-sm text-gray-500 p-2">{$session.user_info.nickname}</p>
				<a href="/logout" class="item">Logout</a>
			</div>
		</Dropdown>
	</div>
	{/if}
</div>