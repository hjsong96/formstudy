import React, { useEffect, useRef, useState } from 'react'
import MyButton from './MyButton'

function QueList({ type, que, changeQueTitle, changeQueTexts }) {
  //que { queId: '0', queTitle: '', queTexts: [{ itemId: '' itemText: '' }]}
  const { queId } = que
  const [queTitle, setQueTitle] = useState(que.queTitle)
  const [items, setItems] = useState(que.queTexts)
  const itemId = useRef(0)
  //const { originData, isEdit } = useContext(FormOriginContext)

  useEffect(() => {
    setQueTitle(que.queTitle)
  }, [que.queTitle])

  useEffect(() => {
    setItems(que.queTexts)
  }, [que.queTexts])

  const addItem = () => {
    itemId.current += 1
    const newItem = {
      itemId: itemId.current,
      itemText: '',
    }
    setItems([...items, newItem])
  }

  const removeItem = (itemId) => {
    const newItem = items.filter((item) => item.itemId !== itemId)
    setItems(newItem)
    changeQueTexts(queId, 'queTexts', newItem)
  }

  const changeForm = (id, name, value) => {
    const updatedItems = items.map((item) =>
      item.itemId === id ? { ...item, [name]: value } : item
    )
    setItems(updatedItems)
    changeQueTexts(queId, 'queTexts', updatedItems)
  }

  const handleQueTitle = (e) => {
    setQueTitle(e.target.value)
    changeQueTitle(queId, 'queTitle', e.target.value)
  }

  if (type === 'multiple') {
    return (
      <div>
        queId: {queId}
        <textarea
          placeholder="객관식 질문입력"
          value={queTitle}
          name="queTitle"
          onChange={handleQueTitle}
        />
        {items.map((item, itemIndex) => (
          <div key={itemIndex}>
            itemId: {item.itemId}
            <input
              placeholder="객관식 항목입력"
              name="itemText"
              value={item.itemText}
              onChange={(e) =>
                changeForm(item.itemId, e.target.name, e.target.value)
              }
            />
            <MyButton
              onClick={() => removeItem(item.itemId)}
              text={'항목삭제'}
            />
          </div>
        ))}
        <MyButton onClick={addItem} text={'항목 추가'} />
      </div>
    )
  } else if (type === 'long') {
    return (
      <div>
        <textarea
          placeholder="주관식 질문입력"
          value={queTitle}
          name="queTitle"
          onChange={handleQueTitle}
        />
        {items.map((item, itemIndex) => (
          <div key={itemIndex}>
            <textarea
              placeholder="주관식 항목입력"
              name="itemText"
              value={item.itemText}
              onChange={(e) =>
                changeForm(item.itemId, e.target.name, e.target.value)
              }
            />
            <MyButton
              onClick={() => removeItem(item.itemId)}
              text={'항목삭제'}
            />
          </div>
        ))}
        <MyButton onClick={addItem} text={'항목 추가'} />
      </div>
    )
  } else if (type === 'short') {
    return (
      <div>
        <textarea
          placeholder="단답식 질문입력"
          value={queTitle}
          name="queTitle"
          onChange={handleQueTitle}
        />
        {items.map((item, itemIndex) => (
          <div key={itemIndex}>
            <input
              placeholder="단답식 항목입력"
              name="itemText"
              value={item.itemText}
              onChange={(e) =>
                changeForm(item.itemId, e.target.name, e.target.value)
              }
            />
            <MyButton
              onClick={() => removeItem(item.itemId)}
              text={'항목삭제'}
            />
          </div>
        ))}
        <MyButton onClick={addItem} text={'항목 추가'} />
      </div>
    )
  }
}

export default QueList
