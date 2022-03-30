import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		enable_marking : true,
		organization_id : body.organization_id,
		start_time : body.start_time,
		title : body.title,
		tutor_group_id : body.tutor_group_id,
		type_key : "vocabulary-dictation",
		vocab_list : body.vocab_list
	})
}