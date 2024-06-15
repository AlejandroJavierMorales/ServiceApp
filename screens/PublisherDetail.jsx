import React from 'react'
import { Publisher } from '../components/shared'

const PublisherDetail = ({publisher}) => {
  return (
    //Screen de detalles del Publisher, Modals etc
    <div>
      <Publisher publisher={publisher}/>
    </div>
  )
}

export default PublisherDetail
