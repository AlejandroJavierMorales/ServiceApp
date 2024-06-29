import React, { useEffect, useContext, useState } from 'react';
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
import { useGetCategoriesQuery, useGetSubcategoriesQuery, useGetSubsubcategoriesQuery } from '../services/rubrosServices';



const Home = ({ navigation }) => {

  const dataOfServerStored = useSelector((state) => state.dataOfServer.value);
  const servicesStored = useSelector((state) => state.services.value);
  const publishersStored =useSelector((state)=>state.publishers.value.publishers);
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const { setSubscriptionsType, setActualPage } = useContext(GeneralContext);

  const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();
  const { data: subcategoriesData, isLoading: isLoadingSubcategories, error: errorSubcategories } = useGetSubcategoriesQuery();
  const { data: subsubcategoriesData, isLoading: isLoadingSubsubcategories, error: errorSubsubcategories } = useGetSubsubcategoriesQuery();
  const [combinedData, setCombinedData] = useState([]);

  const cardWidth = (width - 10) / 3;



 // Combinar los datos de categorías, subcategorías y subsubcategorías
 useEffect(() => {
  if (categoriesData && subcategoriesData && subsubcategoriesData) {
    const combinedData = [];

    Object.entries(categoriesData).forEach(([categoryId, category]) => {
      const categoryName = category.name;
      const categoryImage = category.img_name;

      const matchingSubcategories = Object.values(subcategoriesData).filter(subcategory => subcategory.category_id === Number(categoryId));

      matchingSubcategories.forEach(subcategory => {
        const subcategoryId = subcategory.id;
        const subcategoryName = subcategory.name;
        const subcategoryImage = subcategory.img_name;

        const matchingSubsubcategories = Object.values(subsubcategoriesData).filter(subsubcategory => subsubcategory.subcategory_id === subcategoryId);

        matchingSubsubcategories.forEach(subsubcategory => {
          const subsubcategoryId = subsubcategory.id;
          const subsubcategoryName = subsubcategory.name;
          const subsubcategoryImage = subsubcategory.image;

          combinedData.push({
            categoryid: Number(categoryId),
            category: categoryName,
            categoryimage: categoryImage,
            subcategoryid: subcategoryId,
            subcategory: subcategoryName,
            subcategoryimage: subcategoryImage,
            subsubcategoryid: subsubcategoryId,
            subsubcategory: subsubcategoryName,
            subsubcategoryimage: subsubcategoryImage,
          });
        });
      });
    });

    setCombinedData(combinedData);
    dispatch(setData(combinedData));
  }
}, [categoriesData, subcategoriesData, subsubcategoriesData]);


useEffect(()=>{
console.log('CATEGORIASDATA:  ', categoriesData)
},[categoriesData])

  //------------------------------------------

    const [subscriptions, setSubscriptions] = useState([]);
    const [loading, setLoading] = useState(true);
  
    /* useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await fetch('https://calamuchita.ar/api/services',{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          console.log('datos recibidos de MYSQL: ', data?.data)
          dispatch(setData(data?.data));
          setLoading(false);
        } catch (error) {
          console.error('Error fetching subscriptions:', error);
          setLoading(false);
        }
      };
  
      fetchServices();
    }, []); */
  //------------------------------------------


 /*  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
       
        dispatch(setData(data));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    loadData();
  }, [data]); */

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
