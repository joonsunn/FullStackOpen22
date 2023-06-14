import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	content: null,
	style: { display: 'none' }
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState: initialState,
	reducers: {
		setNotification(state, action) {
			const content = action.payload
			const style = {
				border: 'solid',
				padding: 10,
				borderWidth: 1,
				marginBottom: 10
			  }
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

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer