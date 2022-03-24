import {usermodel} from "$lib/usermodal";

export const get = async (event) => {
	const {status, body} = await usermodel(event)
	const data = body.data
	const object = {}
	for (const prop in data) {
		object[prop] = [...data[prop].good, ...data[prop].improve, ...data[prop].weakness]
	}
	return {
		status,
		body: {
			data: object,
			success: true
		}
	}
}