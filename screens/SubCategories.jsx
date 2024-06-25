import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';
import { useDispatch, useSelector } from "react-redux";
import {
  setSubCategorySelected, setSubSubCategoriesSelected
} from "../fetures/Services/ServicesSlice";
import { setPublishers} from "../fetures/Publishers/PublishersSlice";


const SubCategories = ({ navigation, route }) => {

  const dataOfServerStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const publishersStored =useSelector((state)=>state.publishers.value.publisher);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const { setSubscriptionsType, setActualPage, actualPage } = useGeneralContext();

  const isMounted = useRef(false);

  const handleClickOnSubCategory = (item) => {
    console.log('****SubCategoria***** ', JSON.stringify(item, null, 2))
    dispatch(setSubCategorySelected(item));//Se actualiza y procesa en useEffect con categorySelected como dependencia
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  useEffect(() => {

    const getPublishers = async (categoryid, subcategoryid, subsubcategoryid) => {
      try {
        const data = await fetchSubscriptions(categoryid, subcategoryid, subsubcategoryid);
        return data;
      } catch (error) {
        console.error("Error fetching publishers: ", error);
      }
    }

    const loadPublishers = async () => {
      if (isMounted.current) {
        const subSubcategoriesOfSubCategory = dataOfServerStored.filter((subCategory) => subCategory?.subcategoryid == servicesStored.subCategorySelected?.id
        );
        console.log(
          "SUBCATEGORIAS DE LA SUBCATEGORIA " +
          servicesStored.subCategorySelected?.name +
          " - " +
          JSON.stringify(subSubcategoriesOfSubCategory, null, 2)
        );
        if (subSubcategoriesOfSubCategory.length > 0 && subSubcategoriesOfSubCategory[0].subsubcategoryid) {
          dispatch(setSubSubCategoriesSelected(subSubcategoriesOfSubCategory));
          navigation.navigate('SubSubCategories', servicesStored.subCategorySelected?.name);
        } else {
          try {
            const data = await getPublishers(servicesStored.categorySelected?.id, servicesStored.subCategorySelected?.id, null);
            console.log('data de ArrayPublishers ', data)
            dispatch(setPublishers(data));
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${servicesStored.subCategorySelected?.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      } else {
        isMounted.current = true;
      }
    }
    loadPublishers();
  }, [servicesStored.subCategorySelected]);


  useEffect(() => {
    setActualPage('subcategories');
    console.log(JSON.stringify(route, null, 2))
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={servicesStored.subCategoriesSelected}
        keyExtractor={(item) => item?.subcategoryid.toString()}
        renderItem={({ item }) => (
          <CardItem
            item={item}
            entity={{ id: item.subcategoryid, name: item.subcategory, img: item.subcategoryimage }}
            entityType='subcategories'
            text={''}
            clickOnCardItem={handleClickOnSubCategory}
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

export default SubCategories;
