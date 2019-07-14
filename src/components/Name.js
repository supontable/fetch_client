import React from 'react'
import injectSheet from "react-jss";

const styles = theme => ({
  nameInput: {
    color: theme.color,
    border: '1px solid black',
   	borderRadius: 3,
   	width: '200px',
    height: '40px',
    fontSize: '36px',
    textIndent: '10px',
  }
});

const Name = ({onInput, classes}) => {
	let value
	return <input
	  className={classes.nameInput}
	  type='text'
	  value={value}
	  onKeyUp={(event) => {
	  		event.keyCode === 13 && onInput(event)
	  	}
	  }/>
}

const StyledName = injectSheet(styles)(Name)
export {StyledName}
