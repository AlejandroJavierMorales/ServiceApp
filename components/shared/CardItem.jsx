import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function CardItem({entity, item, entityType, text, cardWidth, clickOnCardItem }) {
  
  /* const entity = { id: item.categoryid, name: item.category, img: item.categoryimage }; */
  const props = Object.values(entity);
  
  const image = `https://calamuchita.ar/assets/images/${entityType}/${props[2]}`;
  console.log(image);

  return (
    <TouchableOpacity 
      style={[styles.card, { width: '30%' }]}
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
    marginVertical: 5
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
