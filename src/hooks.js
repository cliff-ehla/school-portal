import cookie from 'cookie';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.access_token = cookies.access_token;
	if (cookies.user_info)
		event.locals.user_info = JSON.parse(cookies.user_info)
	return resolve(event)
};

export const getSession = req => {
	let access_token = req.locals.access_token
	let user_info = req.locals.user_info
	return access_token ? {
		access_token,
		user_info
	}: {}
}
