import React from 'react'
function createMarkup(html) {
  return {__html: html};
}
const Item = ({item, selected, onSelect, id, className}) => {
	return  (
		<React.Fragment>
			<div className={'Item__' + className} dangerouslySetInnerHTML={createMarkup(item.html || item)} />
			{typeof selected !== 'undefined' && <input type='checkbox'
 			 checked={selected} onChange={(e) => onSelect(e, id)} className='Checkbox' />}
		</React.Fragment>
	)
}
export { Item };

