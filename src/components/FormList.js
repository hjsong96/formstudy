import { useState } from 'react'
import FormItem from './FormItem'
import ControlMenu from './ControlMenu'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom'

function FormList({ formList }) {
  const [sortType, setSortType] = useState('latest')

  const compare = (a, b) => {
    if (sortType === 'latest') {
      return parseInt(b.formDate) - parseInt(a.formDate)
    } else {
      return parseInt(a.formDate) - parseInt(b.formDate)
    }
  }

  const sortedList = formList.slice().sort(compare)

  const formOption = [
    { value: 'latest', name: '최신순' },
    { value: 'oldest', name: '오래된 순' },
  ]

  const navigate = useNavigate()

  const goNew = () => {
    navigate(`/new`)
  }

  return (
    <div className="FormList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            formOption={formOption}
            onChange={setSortType}
            value={sortType}
          />
        </div>
        <div className="right_col">
          <MyButton text={'새로 만들기'} type={'positive'} onClick={goNew} />
        </div>
      </div>
      {sortedList.map((form, formIndex) => (
        <div key={formIndex}>
          <FormItem form={form} formId={form.formId} />
        </div>
      ))}
    </div>
  )
}

export default FormList
