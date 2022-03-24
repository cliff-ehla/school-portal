<script>
	let dummy = [{"description":"Sayings of Wisdom (30 個生字)","lesson":[{"lesson_type":"read-along","lesson_id":1,"title":"Sayings of Wisdom (30 個生字)","description":"朗讀課文","article_id":4203,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637059464.jpg"],"play_version":"LITE","accent":"British"},{"lesson_type":"audio-feedback","lesson_id":2,"title":"口述文章","description":"進入後，請開啟錄音功能，朗讀文章，然後提交你的錄音給老師。","article_id":4203,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637059464.jpg"],"play_version":"LITE","accent":"British"}],"report_type":"read-along","teacher_url":"https://ehla-media-bucket.s3-ap-southeast-1.amazonaws.com/course/course_information_a/rcd_hk.html","title":"Read Along","type":"read-along","day_id":1,"f_enable_push":false,"start_time":"2021-11-16 11:00:55","is_manual_lock":true,"topic_webview":null,"assignment":[],"is_lock":1},{"description":"Sayings of Wisdom (Part 2) (34 個生字)","lesson":[{"lesson_type":"read-along","lesson_id":11,"title":"Sayings of Wisdom (Part 2) (34 個生字)","description":"朗讀課文","article_id":4205,"image_urls":[],"play_version":"LITE","accent":"British"},{"lesson_type":"audio-feedback","lesson_id":12,"title":"口述文章","description":"進入後，請開啟錄音功能，朗讀文章，然後提交你的錄音給老師。","article_id":4205,"image_urls":[],"play_version":"LITE","accent":"British"}],"report_type":"read-along","teacher_url":"https://ehla-media-bucket.s3-ap-southeast-1.amazonaws.com/course/course_information_a/rcd_hk.html","title":"Read Along","type":"read-along","day_id":2,"f_enable_push":false,"start_time":"2021-11-17 01:00:23","topic_webview":null,"assignment":[],"is_lock":1},{"description":"Sayings of Wisdom (Part  3) (45 個生字)","lesson":[{"lesson_type":"read-along","lesson_id":21,"title":"Sayings of Wisdom (Part  3) (45 個生字)","description":"朗讀課文","article_id":4206,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637060041.jpg"],"play_version":"LITE","accent":"British"},{"lesson_type":"audio-feedback","lesson_id":22,"title":"口述文章","description":"進入後，請開啟錄音功能，朗讀文章，然後提交你的錄音給老師。","article_id":4206,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637060041.jpg"],"play_version":"LITE","accent":"British"}],"report_type":"read-along","teacher_url":"https://ehla-media-bucket.s3-ap-southeast-1.amazonaws.com/course/course_information_a/rcd_hk.html","title":"Read Along","type":"read-along","day_id":3,"f_enable_push":false,"start_time":"2021-11-18 01:00:00","topic_webview":null,"assignment":[],"is_lock":1},{"description":"Sayings of Wisdom (Part 4) (34 個生字)","lesson":[{"lesson_type":"read-along","lesson_id":31,"title":"Sayings of Wisdom (Part 4) (34 個生字)","description":"朗讀課文","article_id":4207,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637060147.jpg"],"play_version":"LITE","accent":"British"},{"lesson_type":"audio-feedback","lesson_id":32,"title":"口述文章","description":"進入後，請開啟錄音功能，朗讀文章，然後提交你的錄音給老師。","article_id":4207,"image_urls":["https://ehla-media-bucket.s3.amazonaws.com/user/selfie_article/133490/1637060147.jpg"],"play_version":"LITE","accent":"British"}],"report_type":"read-along","teacher_url":"https://ehla-media-bucket.s3-ap-southeast-1.amazonaws.com/course/course_information_a/rcd_hk.html","title":"Read Along","type":"read-along","day_id":4,"f_enable_push":false,"start_time":"2021-11-19 01:00:16","topic_webview":null,"assignment":[],"is_lock":1}]
	console.log(dummy)
	let calendar
	const init = node => {
		calendar = new FullCalendar.Calendar(node, {
			eventSources: [
				{
					events: dummy.map(e => ({
						start: e.start_time,
						title: e.description
					})),
					id: 'GROUP'
				}
			],
			eventClick: ({event, el}) => {
				// let zoom = event.extendedProps
				// showPopper(el, ZoomPreviewPopup, {
				// 	zoom
				// }, {
				// 	placement: 'right'
				// })
			},
			dateClick: function(info) {
				// alert('Clicked on: ' + info.dateStr);
				// alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
				// alert('Current view: ' + info.view.type);
				// change the day's background color just for fun
				info.dayEl.style.backgroundColor = 'red';
			}
		})
		calendar.render()
		calendar.gotoDate('2021-11-01')
	}
</script>

<div use:init></div>
<div class="p-4">
	<div class="p-4 shadow max-w-[400px]">
		<p>Speaking exercise</p>
		<p class="font-bold">6A</p>
		<p>Feb 25</p>
		<p>Speaking of wisdom</p>
		<p>25 submitted</p>
		<p>3 late</p>
		<p>4 below average</p>
	</div>
</div>