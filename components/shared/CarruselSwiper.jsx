import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa los íconos que desees usar

const { width: screenWidth } = Dimensions.get('window');

// Datos del carrusel
const carouselData = [
  { uri: 'https://calamuchita.ar/assets/images/cities/losreartes1.webp' },
  { uri: 'https://calamuchita.ar/assets/images/cities/losreartes2.webp' },
  { uri: 'https://calamuchita.ar/assets/images/cities/losreartes3.webp' },
  // Modificar funcionamiento para que si el publisher o subscription tiene images=true traiga sus imagenes de la web
]
const CarruselSwiper = (images=[]) => {
  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={true}
        prevButton={<Icon name="chevron-left" size={30} color="green" />} // Icono de "atrás"
        nextButton={<Icon name="chevron-right" size={30} color="green" />} // Icono de "adelante"
        prevButtonColor={'green'} // Color del botón anterior (izquierda)
        nextButtonColor={'green'} // Color del botón siguiente (derecha)
        dotColor={'rgba(0, 0, 0, 0.2)'} // Color del indicador
        activeDotColor={'green'} // Color del indicador activo
      >
        {carouselData.map((item, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
      <View style={styles.pagination}>
        <SwiperPagination />
      </View>
    </View>
  );
};

// Componente para personalizar los indicadores del Swiper
const SwiperPagination = ({ index, total }) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from(Array(total).keys()).map((_, i) => (
        <View
          key={i}
          style={[
            styles.paginationDot,
            i === index ? styles.paginationDotActive : null,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 40,
    marginTop:20
  },
  wrapper: {
    height: 300, 
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: screenWidth-20, // Ancho del slide igual al ancho de la pantalla
    borderRadius: 5,
  },
  pagination: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: 'green',
  },
});

export default CarruselSwiper;
