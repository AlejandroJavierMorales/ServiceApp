import React, { useState, useRef, useEffect } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Carrusel = ({ images, path }) => {
  const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width);
  const [itemWidth, setItemWidth] = useState(sliderWidth / 3);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = Dimensions.get('window').width;
      setSliderWidth(width);
      if (width <= 575) {
        setItemWidth(width / 1);
      } else if (width <= 767) {
        setItemWidth(width / 2);
      } else {
        setItemWidth(width / 3);
      }
    };

    // Llamamos a la función handleResize al montar el componente para establecer la configuración inicial
    handleResize();

    // Llamamos a la función handleResize cuando la ventana se redimensiona
    Dimensions.addEventListener('change', handleResize);

    // Limpiamos el evento del listener al desmontar el componente
    return () => {
      Dimensions.removeEventListener('change', handleResize);
    };
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.imageContainer} key={index}>
      <Image source={{ uri: `${path}/${item}` }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        data={images}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        autoplay={true}
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default Carrusel;
