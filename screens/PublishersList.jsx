import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem, Publisher, PublisherRow } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';



const PublishersList = ({ navigation, route }) => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

  const {arrayPublishers, setPublisherDetail}=useGeneralContext();
  const [publishersList, setPublishersList] = useState([])
 
  const onHandleLocation = (item)=>{
    console.log(JSON.stringify('Location '+item,null,2))
  }
  const onHandleWhatsapp = (item)=>{
    console.log(JSON.stringify('Whatsapp '+item,null,2))
  }
  const onHandleDetail = (item)=>{
    setPublisherDetail(item);
    navigation.navigate('PublisherDetail', item?.company_name);
    console.log(JSON.stringify('Detail '+item,null,2))
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila


  useEffect(()=>{
    console.log('Array de Publishers: ', arrayPublishers)
    setPublishersList(arrayPublishers)
  }, [arrayPublishers])

  return (
    <View>
      {
      publishersList[0]?.firstname  && (
      arrayPublishers.map((item, index) => (
        <PublisherRow 
          key={index} 
          item={item} 
          onHandleLocation={() => onHandleLocation(item)}
          onHandleWhatsapp={() => onHandleWhatsapp(item)}
          onHandleDetail={() => onHandleDetail(item)}
        />
      ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  listCards: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  }
});

export default PublishersList;
