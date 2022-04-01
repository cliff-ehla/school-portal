import {usermodel} from $lib/usermodal;

export const post = async (event) => {
	const body = await event.request.json()
	const type_key = body.type_key
	let payload = {
		enable_marking : true,
		organization_id : body.organization_id,
		tutor_group_id : body.tutor_group_id,
		start_time : body.start_time,
	}
	if (type_key === 'vocabulary-dictation') {
		payload = {
			...payload,
			type_key : 'vocabulary-dictation',
			title : body.title,
			vocab_list : body.vocab_list
		}
	} else if (type_key === 'writing-ai') {
		payload = {
			params : {
				type_key : 'writing-ai',
				enable_marking : true,
				f_disable_comments : false,
				f_disable_score : false,
				f_skip_teacher_review : false,
				writing_instruction : body.writing_instruction,
				writing_title : body.writing_title,
				writing_attachment : [
					{
						data : null,
						name : '1648006933.jpg',
						path : null,
						type : 'image',
						url : 'https://ehla-media-bucket.s3.amazonaws.com/user/writing_topic_image/99463/0/0/6636/0/0/1648006933.jp...'
					}
				]
			}
		}
	}
	return usermodel(event, payload)
}