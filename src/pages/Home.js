import { useState, useContext } from 'react'
import MyHeader from '../components/MyHeader'
import FormList from '../components/FormList'
import { FormStateContext } from '../App'

const Home = () => {
  //참고용
  const dummyForm = [
    {
      formId: 1,
      formTitle: '설문1',
      formSubTitle: '보조1',
      formDate: '1709381365614',
      contents: [
        {
          contentId: 1,
          type: 'multiple',
          ques: [
            {
              queId: 1,
              queTitle: '컨텐츠1',
              queText: [
                { itemId: 1, itemText: '하이' },
                { itemId: 2, itemText: '하이2' },
              ],
            },
          ],
        },
        {
          contentId: 2,
          type: 'long',
          ques: [
            {
              queId: 1,
              queTitle: '컨텐츠1',
              queText: [
                { itemId: 1, itemText: '하이' },
                { itemId: 2, itemText: '하이2' },
              ],
            },
          ],
        },
      ],
      formMent: '멘트2',
    },
    {
      formId: 2,
      formTitle: '설문2',
      formSubTitle: '보조2',
      formDate: '1709381365614',
      contents: [
        {
          contentId: 1,
          type: 'multiple',
          ques: [
            {
              queId: 1,
              queTitle: '컨텐츠1',
              queText: [
                { itemId: 1, itemText: '하이' },
                { itemId: 2, itemText: '하이2' },
              ],
            },
          ],
        },
        {
          contentId: 2,
          type: 'long',
          ques: [
            {
              queId: 1,
              queTitle: '컨텐츠1',
              queText: [
                { itemId: 1, itemText: '하이' },
                { itemId: 2, itemText: '하이2' },
              ],
            },
          ],
        },
      ],
      formMent: '멘트2',
    },
  ]

  const data = useContext(FormStateContext)

  return (
    <div className="Home">
      <MyHeader headText={'설문 리스트'} />
      <FormList formList={data} />
    </div>
  )
}

export default Home
