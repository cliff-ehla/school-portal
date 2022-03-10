import {usermodel} from "$lib/usermodal";

export const post = async ({request}) => {
	const body = await request.json()
	return usermodel(request, '/schoolApi/overall_writing_report', {
		start_date: body.start_date,
		end_date: body.end_date,
		organization_id: body.organization_id,
	})
}