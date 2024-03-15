import { useNavigate } from 'react-router-dom'
import MyHeader from './MyHeader'
import MyButton from './MyButton'
import { useContext, useEffect, useRef, useState } from 'react'
import FormEditList from './FormEditList'
import { FormDispatchContext } from '../App'
import { getStringDate } from '../util/date'

function FormEditor({ originData, isEdit }) {
  const year =
    originData && originData.formDate
      ? new Date(originData.formDate).getFullYear()
      : ''
  const month =
    originData && originData.formDate
      ? (new Date(originData.formDate).getMonth() + 1)
          .toString()
          .padStart(2, '0')
      : ''
  const day =
    originData && originData.formDate
      ? new Date(originData.formDate).getDate().toString().padStart(2, '0')
      : ''
  const newDate =
    year && month && day ? `${year}-${month}-${day}` : getStringDate(new Date())
  const contentId = useRef(0)
  const queId = useRef(0)
  const { onCreate } = useContext(FormDispatchContext)
  const [formEdit, setFormEdit] = useState({
    formId: '',
    formTitle: '',
    formSubTitle: '',
    formDate: '',
    contents: [
      {
        contentId: contentId.current,
        contentIndex: '',
        type: 'multiple',
        ques: [
          {
            queId: queId.current,
            queIndex: '',
            queTitle: '',
            queTexts: [{ itemId: '', itemindex: '', itemText: '' }],
          },
        ],
      },
    ],
    formMent: '',
  })

  const changeContent = (contentId, ques) => {
    const copyContents = [...contents]
    const changeContents = copyContents.map((content) => {
      if (content.contentId === contentId) {
        return { ...content, ques: ques }
      }
      return content
    })
    setFormEdit((preForm) => ({
      ...preForm,
      contents: changeContents,
    }))
    setContents(changeContents)
  }

  const [contents, setContents] = useState([
    {
      contentId: contentId.current,
      type: 'multiple',
      ques: [
        {
          queId: queId.current,
          queTitle: '',
          queTexts: [],
        },
      ],
    },
  ])

  useEffect(() => {
    if (isEdit) {
      setFormEdit({
        formId: originData.formId,
        formTitle: originData.formTitle,
        formSubTitle: originData.formSubTitle,
        formDate: newDate,
        contents: originData.contents,
        formMent: originData.formMent,
      })
      setContents(originData.contents)
    } else {
      setFormEdit((prevForm) => ({
        ...prevForm,
        contents: contents,
      }))
    }
  }, [isEdit])

  const navigate = useNavigate()

  const addContent = () => {
    contentId.current += 1
    queId.current += 1
    const newContent = {
      contentId: contentId.current,
      type: 'multiple',
      ques: [
        {
          queId: queId.current,
          queTitle: '',
          queTexts: [],
        },
      ],
    }
    setFormEdit((prevForm) => ({
      ...prevForm,
      contents: [...prevForm.contents, newContent],
    }))
    setContents([...contents, newContent])
  }

  const removeContent = (contentId) => {
    setFormEdit((preForm) => ({
      ...preForm,
      contents: contents.filter((content) => content.contentId !== contentId),
    }))
    setContents(contents.filter((content) => content.contentId !== contentId))
  }

  const changeSort = (contentId, field, value) => {
    const copyContents = [...contents]
    const changeContents = copyContents.map((content) => {
      if (content.contentId === contentId) {
        return { ...content, [field]: value }
      }
      return content
    })
    setContents(changeContents)
    setFormEdit((preForm) => ({
      ...preForm,
      contents: changeContents,
    }))
  }

  const changeForm = (name, value) => {
    setFormEdit((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    /* if (formEdit.formTitle.length < 2) {
      alert('설문지 제목은 2글자 이상입니다.')
      return
    } else if (formEdit.formSubTitle.length < 1) {
      alert('설문지 보조설명은 1글자 이상입니다.')
      return
    } else if (formEdit.formDate.length < 1) {
      alert('작성일자는 필수값 입니다.')
      return
    } */
    /*     else if (
      formEdit.contents.some((content) =>
        content.ques.some((que) => que.queTitle.length < 5)
      )
    ) {
      alert('질문 제목은 5글자 이상입니다.')
      return
    } */

    onCreate(formEdit)
    navigate('/', { replace: true })
  }

  return (
    <div className="FormEditor">
      <MyHeader
        headText={isEdit ? '설문지 수정하기' : '설문지 작성하기'}
        leftChild={<MyButton text={'뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={
          <MyButton
            text={'작성완료'}
            type={'positive'}
            onClick={handleSubmit}
          />
        }
      />
      <div>
        <section>
          <h3>설문지 작성하기</h3>
          <div className="input_wrapper">
            <input
              placeholder="설문지 제목"
              className="input"
              value={formEdit.formTitle}
              name="formTitle"
              onChange={(e) => changeForm(e.target.name, e.target.value)}
            />
            <input
              placeholder="설문지 보조제목"
              className="input"
              value={formEdit.formSubTitle}
              name="formSubTitle"
              onChange={(e) => changeForm(e.target.name, e.target.value)}
            />
            <input
              className="date"
              name="formDate"
              value={formEdit.formDate}
              type="date"
              onChange={(e) => changeForm(e.target.name, e.target.value)}
            />
          </div>
        </section>
        <section>
          <h3>설문지 질문</h3>
          <MyButton text={'질문 추가'} type={'positive'} onClick={addContent} />
          {formEdit &&
            formEdit.contents.map((content, index) => (
              <div key={content.contentId}>
                <MyButton
                  text={'질문 삭제'}
                  type={'negative'}
                  onClick={() => removeContent(content.contentId)}
                />
                <FormEditList
                  changeContent={changeContent}
                  changeSort={changeSort}
                  content={content}
                  contentId={index}
                  ques={content.ques}
                />
              </div>
            ))}
        </section>
        <section>
          <h3>설문지 마무리 멘트</h3>
          <input
            className="input"
            value={formEdit.formMent}
            name="formMent"
            onChange={(e) => changeForm(e.target.name, e.target.value)}
          />
        </section>
      </div>
    </div>
  )
}

export default FormEditor
