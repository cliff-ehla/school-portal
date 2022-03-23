import {usermodel} from "$lib/usermodal";
import cookie from "cookie";

export const post = async (event) => {
	event.locals.access_token = null
	const body = await event.request.json()
	const res = await usermodel(event, {
		username: body.username,
		password: body.password
	})

	if (res.body.success) {
		let user = res.body.data[0]
		let _cookie = cookie.serialize('access_token', user.user_session.access_token, {
			path: '/',
			httpOnly: true
		});
		let user_info = {
			nickname: user.nickname,
			username: user.username,
			profile_pic: user.avatar.filepath,
		}
		let user_info_cookie = cookie.serialize('user_info', JSON.stringify(user_info), {
			path: '/',
			httpOnly: true
		})

		return {
			status: res.status,
			headers: {
				'set-cookie': [_cookie, user_info_cookie]
			},
			body: {
				...res.body,
				...{data: user}
			}
		}
	}

	return res
}