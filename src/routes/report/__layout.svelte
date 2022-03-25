
<div class="flex">
	<div class="w-36 bg-gray-100 p-2 border-gray-300 border-r">
		<b>Report</b>
		<a class="font-bold" href="/report/speaking/student">speaking</a>
		<a href="/report/speaking/student">student</a>
		<a href="/report/speaking/sentence">sentence</a>
		<a class="font-bold" href="/report/writing/student">writing</a>
		<a href="/report/writing/student">student</a>
		<a href="/report/writing/article">article</a>
	</div>

	<div class="flex-1">
		<slot/>
	</div>
</div>

<style>
	a {
		@apply block py-1;
	}
</style>