import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';



const SubCategories = ({ navigation, route }) => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const {
    categories, setCategories,
    subCategories, setSubCategories,
    categorySelected, setCategorySelected,
    subCategorySelected, setSubCategorySelected,
    setDataOfServer, dataOfServer,
    setSubCategoriesSelected, setSubscriptionsType,
    subCategoriesSelected, setSubSubCategorySelected,
    setActualPage, actualPage, setSubSubCategoriesSelected,
    setArrayPublishers
  } = useGeneralContext();

  const isMounted = useRef(false);

  const handleClickOnSubCategory = (item) => {
    console.log('****SubCategoria***** ', JSON.stringify(item, null, 2))
    setSubCategorySelected(item);//Se actualiza y procesa en useEffect con categorySelected como dependencia
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
        const subSubcategoriesOfSubCategory = dataOfServer.filter((subCategory) => subCategory?.subcategoryid === subCategorySelected?.id
        );
        console.log(
          "SUBCATEGORIAS DE LA SUBCATEGORIA " +
          subCategorySelected?.name +
          " - " +
          JSON.stringify(subSubcategoriesOfSubCategory, null, 2)
        );
        if (subSubcategoriesOfSubCategory.length > 0 && subSubcategoriesOfSubCategory[0].subsubcategoryid) {
          setSubSubCategoriesSelected(subSubcategoriesOfSubCategory);
          navigation.navigate('SubSubCategories', subCategorySelected?.name);
        } else {
          try {
            const data = await getPublishers(categorySelected?.id, subCategorySelected?.id, null);
            console.log('data de ArrayPublishers ', data)
            setArrayPublishers(data);
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${subCategorySelected?.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      } else {
        isMounted.current = true;
      }
    }
    loadPublishers();
  }, [subCategorySelected]);


  useEffect(() => {
    setActualPage('subcategories');
    console.log(JSON.stringify(route, null, 2))
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={subCategoriesSelected}
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
