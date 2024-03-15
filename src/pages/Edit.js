import React, { useContext, useEffect, useState } from 'react'
import FormEditor from '../components/FormEditor'
import { useNavigate, useParams } from 'react-router-dom'
import { FormStateContext } from '../App'

export const FormOriginContext = React.createContext()

const Edit = () => {
  const [originData, setOriginData] = useState()
  const navigate = useNavigate()
  const { id } = useParams()

  const formList = useContext(FormStateContext)

  useEffect(() => {
    if (formList && formList.length >= 1) {
      const targetDiary = formList.find(
        (form) => parseInt(form.formId) === parseInt(id)
      )

      if (targetDiary) {
        setOriginData(targetDiary)
      } else {
        alert('설문지가 존재하지 않습니다!')
        navigate('/', { replace: true })
      }
    }
  }, [id, formList])

  return (
    <div className="Edit">
      <FormOriginContext.Provider value={originData} isEdit={true}>
        {originData && <FormEditor originData={originData} isEdit={true} />}
      </FormOriginContext.Provider>
    </div>
  )
}

export default Edit
