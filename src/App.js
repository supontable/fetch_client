import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Item } from './components/Item'
import { StyledName } from './components/Name'
import { ThemeProvider } from "react-jss";
import { postGarageList, getGarage } from './Api'
import './App.css';
import './bikepost.css';
const theme = {
  background: "#f7df1e",
  color: "#24292e"
};
function App() {
  const initialState = {
    value: '',
    bikeContent: [],
    items: [],
    loading: false
  }
  const [ {items, loading, bikeContent}, setState] = useState(initialState)
  const showBikes = items && items.length > 0
  const showBikeContent = bikeContent && bikeContent.length > 0

  function onSelect(event, key) {
    setState(state => {
      const tempState = {...state}
      tempState.items[key].active = !tempState.items[key].active
      return tempState
    })
  }
  function onInput(event) {
    setState(state => ({
      ...state,
      loading: true
    }))
    getGarage(event.target.value)
      .then(response => {
        return response.text()
      })
      .then((response) => {
        let items = JSON.parse(response)
        items.forEach(item => item.active = false)
        setState(state => ({
          ...state,
          items: items,
          loading: false
        }))
      })
  }
  function selectAll() {
    setState(state => {
      const tempState = {...state}
      tempState.items.forEach(item => item.active = true)
      return tempState
    })
  }
  async function postSelected() {
    let activeList = []
    setState(state => ({
      ...state,
      loading: true
    }))
    items.map(item => {
      if (item.active) {
        activeList.push(item.href)
      }
      return item
    })
    let resultArray = await postGarageList(activeList)
    setState(state => ({
      ...state,
      bikeContent: resultArray,
      loading: false
    }))
  }
  function resetForm() {
    if (window.confirm("Reset form?")) {
      setState(initialState)
    } else {
      return false
    }
  }

  useEffect(() => {
    if (showBikes) {
    }
  })
  return (
    <div className="App">
      <header className={showBikes ? "App-header hidden" : "App-header"}>
        <img src={logo}
         className={"App-logo " + (loading ? "animated" : "")}
         alt="logo" />
         <button className="reset" onClick={resetForm}>↺</button>
        <ThemeProvider theme={theme}>
          <StyledName onInput={onInput} />
        </ThemeProvider>
      </header>
      <div className='bikes-container'>
        {showBikes && items.map((item, key) => {
            let props = {
              item: item,
              selected: item.active,
              onSelect: onSelect,
              className: 'bike',
              id: key
            }
            return (
              <Item {...props} key={key}  />
            )
          })
        }
        {showBikes && <button onClick={selectAll}>SELECT ALL</button>}
        {showBikes && <button onClick={postSelected}>GRAB</button>}
      </div>
      <div className='bike-content-container'>
        {showBikeContent && bikeContent.map((item, key) => {
            return (
              <div className='Item' key={key}>{
                item.map((sub, id) => {
                              let props = {
                                item: sub,
                                id: id,
                                className: 'content'
                              }
                              return (
                                <Item {...props} key={id}  />
                              )
                  })
              }</div>
            )
          })
        }
      </div>
    </div>
  );
}


export default App;
