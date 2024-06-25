import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import { GeneralContext } from '../context/GeneralContext';
import fetchData from '../utils/data/fetchData';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';

import { useDispatch, useSelector } from "react-redux";

import { setData} from "../fetures/DataOfServer/DataOfServerSlice";
import {
  setCategories, setSubCategories, 
  setCategorySelected,setSubCategoriesSelected
} from "../fetures/Services/ServicesSlice";
import { setPublishers} from "../fetures/Publishers/PublishersSlice";


const Home = ({ navigation }) => {

  const dataOfServerStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const publishersStored =useSelector((state)=>state.publishers.value.publishers);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const { setSubscriptionsType, setActualPage } = useContext(GeneralContext);


  const cardWidth = (width - 10) / 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        /*  setDataOfServer(data); */
        dispatch(setData(data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    loadData();
  }, []);

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
      dispatch(setSubCategories(uniqueSubCategories))
    }
  }, [dataOfServerStored]);

  const handleClickOnCategory = (item) => {
    dispatch(setCategorySelected(item));

  };



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


      if (servicesStored.categorySelected?.id) {
        const subcategoriesOfCategory = servicesStored.subCategories.filter(category => category.categoryid == servicesStored.categorySelected?.id);

        if (subcategoriesOfCategory.length > 0 && subcategoriesOfCategory[0]?.subcategoryid) {
          dispatch(setSubCategoriesSelected(subcategoriesOfCategory))
          navigation.navigate('SubCategories', servicesStored.categorySelected?.name);
        } else {
          try {
            console.log('CATEGORIA SELECCTED ID ', servicesStored.categorySelected?.id)
            const data = await getPublishers(servicesStored.categorySelected?.id, null, null);
            console.log('data de ArrayPublishers ', data)
            dispatch(setPublishers(data));
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${servicesStored.categorySelected?.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      }
    };

    loadPublishers();
  }, [servicesStored.categorySelected, servicesStored.subCategories]);

  useEffect(() => {
    setActualPage('home');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={servicesStored.categories}
        keyExtractor={(item) => item.categoryid.toString()}
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
  listCards: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center'
  }
});

export default Home;
