import React from 'react'
import useGeneralContext from '../hooks/useGeneralContext'
import { View } from 'react-native';
import { Publisher } from '../components/shared';

const PublisherDetail = () => {

  const { publisherDetail } = useGeneralContext();

  return (
    <View>
      {publisherDetail !== null &&
        <Publisher item={publisherDetail} />
      }
    </View>



  )
}

export default PublisherDetail
