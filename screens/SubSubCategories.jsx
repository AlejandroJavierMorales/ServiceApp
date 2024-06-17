import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';
import fetchSubscriptions from '../utils/data/fetchSubscriptions';



const SubSubCategories = ({ navigation, route }) => {

  const {
    categories, setCategories,
    subCategories, setSubCategories,
    categorySelected, setCategorySelected,
    subCategorySelected, setSubCategorySelected,
    setDataOfServer, dataOfServer,
    setSubCategoriesSelected, setSubscriptionsType,
    subCategoriesSelected, setSubSubCategorySelected,
    setActualPage, actualPage,
    setSubSubCategoriesSelected, subSubCategoriesSelected,
    subSubCategorySelected, setArrayPublishers
  } = useGeneralContext();

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla
  const isMounted = useRef(false);

  const handleClickOnSubSubCategory = (item) => {
    console.log(JSON.stringify(item, null, 2))
    setSubSubCategorySelected(item);
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  //Pocesa Sub-SubCategory Selected
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
        console.log(
          "La SubSubCategoria Seleccionada es : " +
          JSON.stringify(subSubCategorySelected, null, 2)
        );
        //Procesar las subSubCategorias de subCategorySelected
        if (subSubCategorySelected !== null) {
          //Mostrar publicaciones para la categoria seleciconada en SubscriptionsPage
          try {
            const data = await getPublishers(categorySelected?.id, subCategorySelected?.id, subSubCategorySelected?.id);
            console.log('data de ArrayPublishers ', data)
            setArrayPublishers(data);
            setSubscriptionsType('categories');
            navigation.navigate('PublishersList', `Servicios de ${subSubCategorySelected?.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}`);
          } catch (error) {
            console.error("Error while setting publishers: ", error);
          }
        }
      }
    }
    loadPublishers();
  }, [subSubCategorySelected]);

  useEffect(() => {
    console.log('SUBSUBCATEGORIAS ***   ', subSubCategoriesSelected)
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={subSubCategoriesSelected}
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
