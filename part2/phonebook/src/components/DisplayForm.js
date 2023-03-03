const DisplayForm = (props) => {
    return (
      <form onSubmit = {props.onSubmitForm}>
        <div>
          name: <input value = {props.valueName} onChange = {props.onChangeName}/>
        </div>
        <div>
          number: <input value = {props.valueNumber} onChange = {props.onChangeNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

export default DisplayForm