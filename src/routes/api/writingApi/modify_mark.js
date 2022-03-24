import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		user_writing_id: body.user_writing_id,
		disclose: body.disclose, // 0 = draft, 1 = submit
		content_mark: body.content_mark || 0,
		language_mark: body.language_mark || 0,
		organizations_mark: body.organizations_mark || 0,
		vocabulary_mark: body.vocabulary_mark || 0,
		sentence_mark: body.sentence_mark || 0,
		overall_msg: body.overall_msg,
		overall_audio_objs: []
	})
}