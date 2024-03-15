import React, { useEffect, useState } from 'react'
import ControlMenu from './ControlMenu'
import QueList from './QueList'

function FormEditList({ content, ques, changeSort, changeContent, contentId }) {
  const { type } = content
  /*  content {
      contentId: contentId.current,
      type: 'multiple',
      ques: [{ queId: '0', queTitle: '', queTexts: [{ itemId: itemId.current, itemText: '' }]}],
    } */
  const [queList, setQueList] = useState(ques)
  useEffect(() => {
    setQueList(ques)
  }, [ques])

  useEffect(() => {
    changeContent(contentId, queList)
  }, [queList, contentId])

  const formOption = [
    {
      value: 'multiple',
      name: '객관식',
    },
    {
      value: 'long',
      name: '주관식',
    },
    {
      value: 'short',
      name: '단답식',
    },
  ]

  const changeQueTitle = (id, name, value) => {
    setQueList(
      queList.map((que) => (que.queId === id ? { ...que, [name]: value } : que))
    )
  }

  const changeQueTexts = (id, name, value) => {
    setQueList(
      queList.map((que) => (que.queId === id ? { ...que, [name]: value } : que))
    )
  }

  return (
    <div className="FormEditList">
      <div>
        <ControlMenu
          formOption={formOption}
          value={type}
          onChange={(selectValue) => {
            changeSort(contentId, 'type', selectValue)
          }}
        />
      </div>
      <div>
        {queList.map((que) => (
          <div key={que.queId}>
            queId: {que.queId}
            <QueList
              changeQueTitle={changeQueTitle}
              changeQueTexts={changeQueTexts}
              type={type}
              que={que}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FormEditList
