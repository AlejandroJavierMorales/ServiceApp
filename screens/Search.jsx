import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { PublisherRow, SearchTool } from '../components/shared';
import { useDispatch, useSelector } from "react-redux";
import formatUniqueCategories from '../utils/data/formatUniquesCategories';
import filterSubscriptionsByRubro from '../utils/data/filterSubscriptionsByRubro';
import * as Location from "expo-location";
import { setPublisher } from "../fetures/Publishers/PublishersSlice";

function Search({ navigation, route }) {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rubros, setRubros] = useState([]);
  const [publishersFound, setPublishersFound] = useState([]);

  const categSubCategSubCategStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const { subscriptions } = servicesStored;
  const dispatch = useDispatch();

  useEffect(() => {
    const rubrosFormatted = formatUniqueCategories(categSubCategSubCategStored);
    setRubros(rubrosFormatted);
  }, [servicesStored, categSubCategSubCategStored]);

  const onHandleLocation = async (item) => {
    // Solicitar Permiso para Mostrar Ubicacion
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("El Permiso de Acceso a Su Ubicación fue Denegado");
        return;
      }
      if (status === "granted") {
        dispatch(setPublisher(item));
        navigation.navigate('LocationScreen', `Ubicación de ${item?.company_name}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleWhatsapp = (item) => {
    console.log(JSON.stringify('Whatsapp ' + item, null, 2));
  };

  const onHandleDetail = (item) => {
    item && dispatch(setPublisher(item));
    navigation.navigate('PublisherDetail', item?.company_name);
  };

  const handleSearch = (rubro={}, description='', searchByRubro, searchByDescripcion) => {
    searchByRubro === true || searchByDescripcion === true && setIsLoading(true); // Si se requiere buscar seteo isLoading hasta que fetch devuelva el resultado

    // Funcion que busca los publishers o Subscriptions en funcion de los criterios de busqueda
    const publishers = filterSubscriptionsByRubro(subscriptions, rubro, description);
    setPublishersFound(publishers);
    setIsLoading(false);
  };

  useEffect(()=>{
    setPublishersFound([]);
  },[])

  return (
    <View style={styles.container}>
      <SearchTool rubros={rubros} onSearch={handleSearch} />
      {isLoading && <Text>Cargando...</Text>}
      <ScrollView style={styles.scrollView}>
        {publishersFound &&
          publishersFound.map((item, index) => (
            <PublisherRow
              key={index}
              item={item}
              onHandleLocation={() => onHandleLocation(item)}
              onHandleWhatsapp={() => onHandleWhatsapp(item)}
              onHandleDetail={() => onHandleDetail(item)}
            />
          )) 
        }
      </ScrollView>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
});
