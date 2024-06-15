import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CardItem } from '../components/shared';



const PublishersList = ({ publishers=[] }) => {
  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

 
  const handleClickOnPublisher = (item)=>{
    console.log(JSON.stringify(item,null,2))
  }

  const cardWidth = (width - 10) / 3; // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  return (
    <View style={styles.container}>
      <Text>{'Publishers'}</Text>
      <FlatList
        contentContainerStyle={styles.listCards}
        data={publishers}
        keyExtractor={(item) => item.publisherId.toString()}
        renderItem={({ item }) => (
        //Listar una fila por cada item de Publisgher
        <View>
            <Text>{item.name}</Text>
        </View>
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

export default PublishersList;
