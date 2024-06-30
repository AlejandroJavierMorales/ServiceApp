import React, { useEffect, useContext, useState } from 'react';
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
import { useGetPublishersQuery, useGetSubscriptions_TypeQuery, useGetSubscriptionsCategoriesQuery, useGetSubscriptionsQuery } from '../services/subscriptionsService';
import { formatSubscriptionsData } from '../utils/data/formatSubscriptionsData';
import useGeneralContext from '../hooks/useGeneralContext';


const Home = ({ navigation }) => {


  const dataOfServerStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const { setSubscriptionsType, setActualPage } = useContext(GeneralContext);
  const {subscriptions, setSubscritions} = useGeneralContext([]);

  const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();
  const { data: subcategoriesData, isLoading: isLoadingSubcategories, error: errorSubcategories } = useGetSubcategoriesQuery();
  const { data: subsubcategoriesData, isLoading: isLoadingSubsubcategories, error: errorSubsubcategories } = useGetSubsubcategoriesQuery();
  const { data: publishersData, isLoading: isLoadingPublishers, error: errorPublishers } = useGetPublishersQuery();
  const { data: subscriptionsData, isLoading: isLoadingSubscriptions, error: errorSubscriptions } = useGetSubscriptionsQuery();
  const { data: subscriptionsCategoriesData, isLoading: isLoadingSubscriptionsCategories, error: errorSubscriptionsCategories } = useGetSubscriptionsCategoriesQuery();
  const { data: subscriptionsTypeData, isLoading: isLoadingSubscriptionsType, error: errorSubscriptionsType } = useGetSubscriptions_TypeQuery();

  const cardWidth = (width - 10) / 3;

  // Combinar los datos de categorías, subcategorías y subsubcategorías
  useEffect(() => {

    dispatch(setData(formatRubrosData(categoriesData, subcategoriesData, subsubcategoriesData)));
   
  }, [categoriesData, subcategoriesData, subsubcategoriesData, dispatch]);

  useEffect(() => {
    setSubscritions(formatSubscriptionsData(categoriesData, subcategoriesData, subsubcategoriesData
      , publishersData, subscriptionsData, subscriptionsCategoriesData, subscriptionsTypeData))

    /*   console.log('**** publishers:  '+publishersData)
      console.log('**** subscriptions:  '+subscriptionsData) */

  }, [publishersData, subscriptionsData, subscriptionsCategoriesData, subscriptionsTypeData])

  useEffect(() => {
    console.log('**** SUBSCRIPCIONES:  '+JSON.stringify(subscriptions,null,2))
    
  }, [subscriptions])


  useEffect(() => {
    if (publishersData) {
      console.log('Publishers Data:', publishersData);
    } else {
      console.log('Publishers Data is undefined');
    }
  }, [publishersData]);
  
  useEffect(() => {
    if (subscriptionsData) {
      console.log('Subscriptions Data:', subscriptionsData);
    } else {
      console.log('Subscriptions Data is undefined');
    }
  }, [subscriptionsData]);

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
            const data = await fetchSubscriptions(subscriptions, servicesStored.categorySelected.id, null, null);
           data && dispatch(setPublishers(data));
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${servicesStored.categorySelected.name.split('_')?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
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
