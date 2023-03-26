const Notification = ({ message, realError }) => {
	if (message === null) {
		return null
	}

	let notifType = realError? 'error' : 'message'
	// console.log(notifType)

	return (
		<div className = "error" notiftype = {notifType}>
			{message}
		</div>
	)
}

export default Notification