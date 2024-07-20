
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { PublisherRow } from '../components/shared';
import { useDispatch, useSelector } from "react-redux";
import { setPublisher } from "../fetures/Publishers/PublishersSlice";

import * as Location from "expo-location"
import { useState } from 'react';




const PublishersList = ({ navigation, route }) => {

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

  const publishersStored = useSelector((state) => state.publishers.value.publishers);
  const publisherStored = useSelector((state) => state.publishers.value?.publisher);
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const onHandleLocation = async (item) => {
    //Solicitar Permiso para Mostrar Ubicacion
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("El Permiso de Acceso a Su Ubicación fue Denegado");
        return;
      }
      if (status === "granted") {
        dispatch(setPublisher(item));
        navigation.navigate('LocationScreen', `Ubicación de ${item?.company_name}`);
        /* console.log(JSON.stringify('Location ' + item, null, 2)); */
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onHandleWhatsapp = (item) => {
    console.log(JSON.stringify('Whatsapp ' + item, null, 2));
  }
  const onHandleDetail = (item) => {
    item && dispatch(setPublisher(item));
    navigation.navigate('PublisherDetail', item?.company_name);
    console.log('Detail ' + JSON.stringify(item, null, 2))
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila



  return (
    <View>
      {
        publishersStored[0]?.firstname && (
          publishersStored.map((item, index) => (
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
