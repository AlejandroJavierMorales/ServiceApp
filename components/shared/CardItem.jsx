import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions } from 'react-native';

export default function CardItem({entity, item, entityType, text, clickOnCardItem }) {
  const { width } = useWindowDimensions();
  const cardWidth = width / 3;  // Calcula el ancho de cada tarjeta para 3 tarjetas por fila

  const props = Object.values(entity);
  const image = `https://calamuchita.ar/assets/images/${entityType}/${props[2]}`;

  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth, minWidth: '30%' }]}
      onPress={() => clickOnCardItem(entity)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{props[1]?.charAt(0).toUpperCase() + props[1]?.slice(1)}</Text>
      </View>
      <View style={styles.cardBody}>
        {props[2] && (
          <Image
            source={{ uri: image }}
            style={styles.imgCard}
          />
        )}
      </View>
      <Text style={styles.cardDescription}>
        {text && text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#cccccc',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 5,
    flexBasis: '30%'  // Esto asegura que el ancho mínimo sea del 30%
  },
  cardHeader: {
    paddingVertical: 10,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardBody: {
    paddingVertical: 5
  },
  imgCard: {
    width: 60,
    height: 60
  },
  cardDescription: {
    fontSize: 10
  }
});
