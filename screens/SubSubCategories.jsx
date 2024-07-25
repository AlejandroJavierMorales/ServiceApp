import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';
import { useDispatch, useSelector } from "react-redux";
import { setSubSubCategorySelected } from "../fetures/Services/ServicesSlice";
import { setPublishers } from "../fetures/Publishers/PublishersSlice";


const SubSubCategories = ({ navigation, route }) => {

  const { setActualPage, actualPage, setSubscriptionsType } = useGeneralContext();
  const servicesStored = useSelector((state) => state.services.value);
  const publishersStored = useSelector((state) => state.publishers.value.publishers);
  const dispatch = useDispatch();



  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const isMounted = useRef(false);

  const handleClickOnSubSubCategory = (item) => {
    dispatch(setSubSubCategorySelected(item));
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  //Pocesa Sub-SubCategory Selected
  useEffect(() => {
    const getPublishers = async (categoryid, subcategoryid, subsubcategoryid) => {
      try {
        const data = await fetchSubscriptions(servicesStored.subscriptions, categoryid, subcategoryid, subsubcategoryid);
        return data;
      } catch (error) {
        console.error("Error fetching publishers: ", error);
      }
    }

    const loadPublishers = async () => {
      if (isMounted.current) {

        //Procesar las subSubCategorias de subCategorySelected
        if (servicesStored.subSubCategorySelected !== null) {
          //Mostrar publicaciones para la categoria seleciconada en SubscriptionsPage
          try {
            const data = await getPublishers(servicesStored.categorySelected?.id, servicesStored.subCategorySelected?.id, servicesStored.subSubCategorySelected?.id);
            data && dispatch(setPublishers(data));
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${servicesStored.subSubCategorySelected?.name.split('_')?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      }
    }
    loadPublishers();
  }, [servicesStored.subSubCategorySelected]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={servicesStored.subSubCategoriesSelected}
        keyExtractor={(item) => item.subsubcategoryid.toString()}
        renderItem={({ item }) => (
          <CardItem
            item={item}
            entity={{ id: item.subsubcategoryid, name: item.subsubcategory, img: item.subsubcategoryimage }}
            entityType='subsubcategories'
            text={''}
            clickOnCardItem={handleClickOnSubSubCategory}
            cardWidth={cardWidth} // Pasa el ancho de la tarjeta como prop
          />
        )}
        numColumns={3} // Muestra tres tarjetas por fila
      />
      {/* <StatusBar style="auto" /> */}
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

export default SubSubCategories;
