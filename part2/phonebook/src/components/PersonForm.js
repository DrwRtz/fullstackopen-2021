import React from 'react'

const PersonForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
          <div>
            name: <input onChange={props.handleName} value={props.newName} />
          </div>
          <div>
            number: <input onChange={props.handleNumber} value={props.newNumber} />
          </div>
          <div><button type="submit">add</button></div>
      </form>
    )
}

export default PersonForm