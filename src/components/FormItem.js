import React, { useContext } from 'react'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom'
import { FormDispatchContext } from '../App'

function FormItem({ form, formId }) {
  const navigate = useNavigate()
  const { onRemove } = useContext(FormDispatchContext)
  const newDate = new Date(parseInt(form.formDate)).toLocaleDateString()

  const goEdit = () => {
    navigate(`/edit/${formId}`)
  }

  const handleRemove = (targetId) => {
    console.log(targetId)
    onRemove(targetId)
    navigate('/', { replace: true })
  }

  return (
    <div className="FormItem">
      <div className="Form">
        <div className="info_wrapper">
          <div className="">제목: {form.formTitle}</div>
          <div>설명: {form.formSubTitle}</div>
          <div>생성일자: {newDate}</div>
          {form && form.contents && (
            <div>
              {form.contents.map((content, contentIndex) => (
                <div key={contentIndex}>
                  {content.ques.map((que, queIndex) => (
                    <div key={queIndex}>
                      {/* 질문 미리보기: {que.queTitle} */}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="btn_wrapper">
          <MyButton onClick={goEdit} text={'수정하기'} />
          <MyButton
            onClick={() => handleRemove(form.formId)}
            text={'삭제하기'}
            type={'negative'}
          />
        </div>
      </div>
    </div>
  )
}

export default FormItem
