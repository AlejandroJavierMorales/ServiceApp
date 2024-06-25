import React from 'react'
import { View } from 'react-native';
import { Publisher } from '../components/shared';
import { useSelector } from "react-redux";



const PublisherDetail = () => {

  const publisherStored =useSelector((state)=>state.publishers.value.publisher);

  return (
    <View>
      {publisherStored !== null &&
        <Publisher item={publisherStored} />
      }
    </View>



  )
}

export default PublisherDetail
