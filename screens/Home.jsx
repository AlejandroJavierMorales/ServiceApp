import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import { GeneralContext } from '../context/GeneralContext';
import fetchData from '../utils/data/fetchData';

const Home = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const {
    categories, setCategories,
    subCategories, setSubCategories,
    categorySelected, setCategorySelected,
    setDataOfServer, dataOfServer,
    setSubCategoriesSelected, setSubscriptionsType,
    setActualPage
  } = useContext(GeneralContext);
  const cardWidth = (width - 10) / 3;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setDataOfServer(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    // Filter unique categories and subcategories when dataOfServer changes
    if (dataOfServer && dataOfServer.length > 0) {
      const uniqueCategoriesMap = new Map();
      const uniqueSubCategoriesMap = new Map();

      dataOfServer.forEach(item => {
        if (!uniqueCategoriesMap.has(item.categoryid)) {
          uniqueCategoriesMap.set(item.categoryid, item);
        }
        if (!uniqueSubCategoriesMap.has(item.subcategoryid)) {
          uniqueSubCategoriesMap.set(item.subcategoryid, item);
        }
      });

      const uniqueCategories = Array.from(uniqueCategoriesMap.values());
      const uniqueSubCategories = Array.from(uniqueSubCategoriesMap.values());

      setCategories(uniqueCategories);
      setSubCategories(uniqueSubCategories);
    }
  }, [dataOfServer]);

  const handleClickOnCategory = (item) => {
    setCategorySelected(item);
  };

  useEffect(() => {
    if (categorySelected) {
      const subcategoriesOfCategory = subCategories.filter(category => category.categoryid === categorySelected.id);
      console.log('SUBCATEGORIAS DE CATEGORIA ****', subcategoriesOfCategory)
      if (subcategoriesOfCategory.length > 0 && subcategoriesOfCategory[0]?.subcategoryid) {
        console.log('Tiene: ' + subcategoriesOfCategory.length + ' subcategorias')
        setSubCategoriesSelected(subcategoriesOfCategory);
        navigation.navigate('SubCategories', categorySelected?.name);
      } else {
        console.log('por publishers en categorias')
        setSubscriptionsType('categories');
        navigation.navigate('PublishersList', `Servicios de ${categorySelected?.name.split('_') // Divide el nombre por guiones bajos
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
        .join(' ')}`);
      }
    }
  }, [categorySelected, subCategories]);

  useEffect(() => {
    setActualPage('home');
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={categories}
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

