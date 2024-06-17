import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ImageContactMappings from '../../utils/imagesContactMapping';

const ContactItem = ({ data, image, onClickOnContactItem }) => {

    const getImageSource = () => {
        if (ImageContactMappings[image]) {
          return ImageContactMappings[image];
        } else {
          console.warn(`Image mapping not found for ${image}`);
          return ('Error al generar Imagen'); // Opcional: imagen por defecto o manejo de error
        }
      };


  return (
    <TouchableOpacity onPress={onClickOnContactItem} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{data}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16, // Half of width and height to make it circular
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
});

export default ContactItem;

