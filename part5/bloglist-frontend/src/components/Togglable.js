import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(true)

	const hideWhenVisible = { display: visible? 'none' : '' }
	const showWhenVisible = { display: visible? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return { toggleVisibility }
	})

	return (
		<div>
			<div style = {hideWhenVisible}>
				<button onClick = {toggleVisibility}>{props.buttonLabelBefore}</button>
			</div>
			<div style = {showWhenVisible}>
				{props.children}
				<button onClick = {toggleVisibility}>{props.buttonLabelAfter}</button>
			</div>
		</div>
	)

})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
	buttonLabelBefore: PropTypes.string.isRequired,
	buttonLabelAfter: PropTypes.string.isRequired
}

export default Togglable