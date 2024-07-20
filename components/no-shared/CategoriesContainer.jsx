import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../shared';


const CategoriesContainer = ({ listaCategorias }) => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

 


  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={listaCategorias}
        keyExtractor={(item) => item.categoryid.toString()}
        renderItem={({ item }) => (
          <CardItem
            item={item}
            entityType='categories'
            text={''}
            clickOnCardItem={handleClickOnCategory}
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

export default CategoriesContainer;
