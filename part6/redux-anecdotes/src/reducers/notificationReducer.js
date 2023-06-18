import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	content: null,
	style: { display: 'none' }
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		setNotificationStyle(state, action) {
			const content = action.payload
			const style = {
				border: 'solid',
				padding: 10,
				borderWidth: 1,
				marginBottom: 10
			  }
			// console.log(`action: ${JSON.stringify(action2)}`)
			return {
				content,
				style
			}
		},
		resetNotification(state, action) {
			return initialState
		}
	}
})

export const { setNotificationStyle, resetNotification } = notificationSlice.actions
export const setNotification = (content, time) => {
	return async dispatch => {
		// console.log(`content: ${content}, time: ${time}`)
		dispatch(setNotificationStyle(content))
		setTimeout(() => {dispatch(resetNotification())}, time)
	}
}
export default notificationSlice.reducer