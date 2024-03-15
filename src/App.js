import { BrowserRouter, Form, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import New from './pages/New'
import Edit from './pages/Edit'
import React, { useEffect, useReducer, useRef } from 'react'

const reducer = (state, action) => {
  let newState = []
  switch (action.type) {
    case 'INIT': {
      return action.data
    }
    case 'CREATE': {
      newState = [action.data, ...state]
      break
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.formId !== action.targetId)
      break
    }
    case 'EDIT': {
      newState = state.map((it) =>
        it.formId === action.data.formId ? { ...action.data } : it
      )
      break
    }
    default:
      return state
  }
  localStorage.setItem('form3', JSON.stringify(newState))
  return newState
}

export const FormStateContext = React.createContext()
export const FormDispatchContext = React.createContext()

function App() {
  const [data, dispatch] = useReducer(reducer, [])

  const formId = useRef(0)

  //local storage 연결 후 사용 예정
  useEffect(() => {
    const localData = localStorage.getItem('form3')
    if (localData) {
      const formList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.formId) - parseInt(a.formId)
      )

      if (formList.length >= 1) {
        formId.current = parseInt(formList[0].formId) + 1
        dispatch({ type: 'INIT', data: formList })
      }
    }
  }, [])

  //CREATE
  const onCreate = (formEdit) => {
    const newDate = new Date(formEdit.formDate)
    dispatch({
      type: 'CREATE',
      data: {
        formId: formId.current,
        formTitle: formEdit.formTitle,
        formSubTitle: formEdit.formSubTitle,
        formDate: newDate.getTime(),
        contents: formEdit.contents,
        formMent: formEdit.formMent,
      },
    })
    formId.current += 1
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: 'REMOVE', targetId })
  }
  //EDIT
  const onEdit = (targetId, formTitle, formSubTitle, formDate, contents) => {
    dispatch({
      type: 'EDIT',
      data: {
        formId: targetId,
        formTitle,
        formSubTitle,
        formDate,
        contents,
      },
    })
  }

  return (
    <FormStateContext.Provider value={data}>
      <FormDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit/:id" element={<Edit />}></Route>
              <Route path="/form/:id" element={<Form />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </FormDispatchContext.Provider>
    </FormStateContext.Provider>
  )
}

export default App
