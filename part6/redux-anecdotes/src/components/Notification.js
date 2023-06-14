import { useSelector } from "react-redux"

const Notification = () => {
  const notificationState = useSelector(state => state.notification)
  const notification = notificationState.content
  const style = notificationState.style
// 	const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1
//   }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification