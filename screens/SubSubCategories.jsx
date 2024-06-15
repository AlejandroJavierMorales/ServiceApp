import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';
import useGeneralContext from '../hooks/useGeneralContext';



const SubSubCategories = ({ navigation, route } ) => {

  const { 
    categories, setCategories,
    subCategories, setSubCategories,
    categorySelected, setCategorySelected,
    subCategorySelected, setSubCategorySelected,
    setDataOfServer, dataOfServer,
    setSubCategoriesSelected, setSubscriptionsType,
    subCategoriesSelected ,setSubSubCategorySelected,
    setActualPage, actualPage,
    setSubSubCategoriesSelected,subSubCategoriesSelected,
    subSubCategorySelected
  } = useGeneralContext();

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

 
  const handleClickOnSubSubCategory = (item)=>{
    console.log(JSON.stringify(item,null,2))
    setSubSubCategorySelected(item);
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  //Pocesa Sub-SubCategory Selected
  useEffect(() => {
    console.log(
      "La SubSubCategoria Seleccionada es : " +
      JSON.stringify(subSubCategorySelected, null, 2)
    );
    //Procesar las subSubCategorias de subCategorySelected

    if (subSubCategorySelected !== null) {
      //Mostrar publicaciones para la categoria seleciconada en SubscriptionsPage
      setSubscriptionsType('subsubcategories');
      navigation.navigate('PublishersList', `Servicios de ${subSubCategorySelected?.name.split('_') // Divide el nombre por guiones bajos
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza la primera letra de cada palabra
      .join(' ')}`);
    }
  }, [subSubCategorySelected]);

  useEffect(()=>{
    console.log('SUBSUBCATEGORIAS ***   ',subSubCategoriesSelected)
  },[])


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
