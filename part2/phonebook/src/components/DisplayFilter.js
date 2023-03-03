const DisplayFilter = (props) => {
    return (
      <>
        <div>filter shown with <input value = {props.value} onChange = {props.onChange}></input></div>
      </>
    )
  }

  export default DisplayFilter