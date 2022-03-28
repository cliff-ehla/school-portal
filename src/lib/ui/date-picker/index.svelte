<script>
	import { createEventDispatcher } from "svelte";
	import Calender from "./calendar.svelte";
	import Dropdown2 from "../Dropdown2.svelte";
	import dayjs from "dayjs";

	const dispatch = createEventDispatcher();

	// props
	export let isAllowed = () => true;
	export let selected = new Date();
	let focused = false

</script>

<Dropdown2 open_on_hover={false}
           show_arrow={false}
           animation="mild"
           offset={0}
           let:visible
           placement="bottom">
	<button on:focus={() => {focused = true}}
	        on:blur={() => {focused = false}}
	        tabindex="0"
	        class="cursor-pointer {focused || visible ? 'bg-slate-200' : 'bg-slate-100'} text-slate-500 h-8 px-2 focus:outline-none text-sm rounded"
	        slot="activator">
		{dayjs(selected).format('DD MMM YYYY')}
	</button>
	<Calender on:datechange {isAllowed} {selected}/>
</Dropdown2>