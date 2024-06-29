import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions, ActivityIndicator, Text } from 'react-native';
import { CardItem } from '../components/shared';
import { GeneralContext } from '../context/GeneralContext';
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../fetures/DataOfServer/DataOfServerSlice";
import {
  setCategories,
  setSubCategories,
  setCategorySelected,
  setSubCategoriesSelected
} from "../fetures/Services/ServicesSlice";
import { setPublishers } from "../fetures/Publishers/PublishersSlice";
import { useGetCategoriesQuery, useGetSubcategoriesQuery, useGetSubsubcategoriesQuery } from '../services/rubrosServices';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';
import { formatRubrosData } from '../utils/formatRubrosData';




const Home = ({ navigation }) => {

  
  const dataOfServerStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const { setSubscriptionsType, setActualPage } = useContext(GeneralContext);

  const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();
  const { data: subcategoriesData, isLoading: isLoadingSubcategories, error: errorSubcategories } = useGetSubcategoriesQuery();
  const { data: subsubcategoriesData, isLoading: isLoadingSubsubcategories, error: errorSubsubcategories } = useGetSubsubcategoriesQuery();

  const cardWidth = (width - 10) / 3;

  // Combinar los datos de categorías, subcategorías y subsubcategorías
  useEffect(() => {

    dispatch(setData(formatRubrosData(categoriesData, subcategoriesData, subsubcategoriesData)));

  }, [categoriesData, subcategoriesData, subsubcategoriesData, dispatch]);


  useEffect(() => {
    if (dataOfServerStored && dataOfServerStored.length > 0) {
      const uniqueCategoriesMap = new Map();
      const uniqueSubCategoriesMap = new Map();

      dataOfServerStored.forEach(item => {
        uniqueCategoriesMap.set(item.categoryid, item);
        uniqueSubCategoriesMap.set(item.subcategoryid, item);
      });

      const uniqueCategories = Array.from(uniqueCategoriesMap.values());
      const uniqueSubCategories = Array.from(uniqueSubCategoriesMap.values());

      dispatch(setCategories(uniqueCategories));
      dispatch(setSubCategories(uniqueSubCategories));
    }
  }, [dataOfServerStored, dispatch]);

  const handleClickOnCategory = (item) => {
    dispatch(setCategorySelected(item));
  };

  useEffect(() => {
    const loadPublishers = async () => {
      if (servicesStored.categorySelected?.id) {
        const subcategoriesOfCategory = servicesStored.subCategories.filter(category => category.categoryid === servicesStored.categorySelected.id);

        if (subcategoriesOfCategory.length > 0 && subcategoriesOfCategory[0].subcategoryid) {
          dispatch(setSubCategoriesSelected(subcategoriesOfCategory));
          navigation.navigate('SubCategories', servicesStored.categorySelected.name);
        } else {
          try {
            const data = await fetchSubscriptions(servicesStored.categorySelected.id, null, null);
            dispatch(setPublishers(data));
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${servicesStored.categorySelected.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      }
    };

    loadPublishers();
  }, [servicesStored.categorySelected, servicesStored.subCategories, dispatch, navigation]);

  useEffect(() => {
    setActualPage('home');
  }, [setActualPage]);

  if (isLoadingCategories || isLoadingSubcategories || isLoadingSubsubcategories) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (errorCategories || errorSubcategories || errorSubsubcategories) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {errorCategories?.message || errorSubcategories?.message || errorSubsubcategories?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={servicesStored.categories} 
        keyExtractor={(item) => `${item.categoryid}_${item.subcategoryid}_${item.subsubcategoryid}`} // Clave única basada en los IDs
        renderItem={({ item }) => (
          <CardItem
            item={item}
            entity={{ id: item.categoryid, name: item.category, img: item.categoryimage }}
            entityType='categories'
            text={''}
            clickOnCardItem={handleClickOnCategory}
            cardWidth={cardWidth}
          />
        )}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listCards: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  }
});

export default Home;
