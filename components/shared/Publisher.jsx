import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useGeneralContext from '../../hooks/useGeneralContext';
import ContactItem from './ContactItem';
import Carrusel from './carrusel';
import { fetchGetImagesBySubscriptionId } from '../../utils/data/fetchImagesBySubscription';

/* import { useTranslation } from 'react-i18next';
import useQuerysContext from '../hooks/useQuerysContext'; // Asume que este hook existe
import {
  fetchGetFavoritesBySubscriptionId,
  fetchDeleteFavoritesBySubscriptionId,
  fetchCreateFavoritesBySubscriptionId,
  fetchGetFavoritesByEmail,
  fetchGetImagesBySubscriptionId
} from '../utils/data'; // Ajusta las importaciones según tu proyecto
import Carrusel from '../components/Carrusel'; // Asume que este componente existe
import ContactItem from '../components/ContactItem'; // Asume que este componente existe
import WhatsAppClient from '../components/WhatsAppClient'; // Asume que este componente existe */


const Publisher = ({ item }) => {
  
  const [arrayImages, setArrayImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { logged, userLogged, setMyFavorites } = useGeneralContext();


  const image = `https://calamuchita.ar/assets/images/publishers/profile/${item?.profile_image}`;


/*   const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }; */

  const handleClickFavorite = async (e, subscriptionId) => {
    e.preventDefault();
    if (!logged && !session?.user) {
      return;
    }
    const email = userLogged?.email;

    try {
      const res = await fetchGetFavoritesBySubscriptionId(subscriptionId, email);

      if (res?.data?.length > 0) {
        await fetchDeleteFavoritesBySubscriptionId(subscriptionId, email);
        setFavorite(null);
      } else {
        await fetchCreateFavoritesBySubscriptionId(1, subscriptionId, email);
        setFavorite(true);
      }
    } catch (error) {
      console.error('Error actualizando favoritos:', error);
    }

    try {
      const myRes = await fetchGetFavoritesByEmail(email);
      setMyFavorites(myRes?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchGetImagesBySubscriptionId(item?.subscription_id);
        let array = [];
        if (res.status == 200) {
          res.data.map((item) => {
            array.push(item?.image_name);
          });
          setArrayImages(array);
        }
      } catch (error) {
        console.log('Error en la Carga de Imagenes SubscriptionItemDetail ' + error);
      }
      try {
        if (logged && userLogged?.email) {
          const resFavorite = await fetchGetFavoritesBySubscriptionId(item?.subscription_id, userLogged?.email);
          if (resFavorite.status == 200) {
            setFavorite(resFavorite.data[0]?.favorite);
          }
        }
      } catch (error) {
        console.log('Error en la Carga de DatosFavoritos en SubscriptionItemDetail ' + error);
      }
    };
    getData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>
          {item?.company_name ? item?.company_name : `${item.firstname} ${item?.lastname}`}
        </Text>
      </View>
      <View style={styles.center}>
        <Image
          source={{ uri: image }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => openLocationModal([item])}>
          <Image
            source={require('../../assets/images/icons/location.png')}
            style={styles.icon}
            title='Ver Ubicación en el Mapa'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => handleClickFavorite(e, item?.subscription_id)}>
          <Image
            source={favorite ? require('../../assets/images/icons/favorito_red.png') : require('../../assets/images/icons/favorito_black.png')}
            style={styles.icon}
            title='Guardar en Favoritos'
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logged && userLogged?.email && openCalendarModal(item)}>
          <Image
            source={require('../../assets/images/icons/agenda_color.png')}
            style={styles.icon}
            title='Agendar'
          />
        </TouchableOpacity>
        {item?.delivery !== 0 && (
          <Image
            source={require('../../assets/images/icons/delivery.png')}
            style={styles.icon}
            title='Hace Entrega a Domicilio'
          />
        )}
      </View>
      <View style={styles.descriptionContainer}>
        <Text>{item?.description1}</Text>
        {item?.description2 && <Text>{item?.description2}</Text>}
        {arrayImages.length > 0 && (
          <Carrusel
            images={arrayImages}
            path={`assets/images/subscriptions/${item?.subscription_id}`}
          />
        )}
        <View style={styles.contactContainer}>
          {item?.street && <ContactItem data={`${item?.street} - ${item?.city}`} image={'home'} />}
          {item?.phone && <ContactItem data={item?.phone} image={'phone'} />}
          {item?.whatsapp && <ContactItem data={item?.whatsapp} image={'whatsapp'} />}
          {item?.email1 && <ContactItem data={item?.email1} image={'email'} />}
          {item?.email2 && <ContactItem data={item?.email2} image={'email'} />}
          {item?.coordinates && (
            <ContactItem
              data={`${item?.coordinates}`}
              image={'location'}
              onClickOnContactItem={() => openLocationModal([item])}
            />
          )}
          {item?.web && <ContactItem data={item?.web} image={'web'} />}
          {item?.fb && <ContactItem data={item?.fb} image={'facebook'} />}
          {item.ig && <ContactItem data={item?.ig} image={'instagram'} />}
          {item.delivery !== 0 && <ContactItem data={'Entrega a Domicilio'} image={'delivery'} />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 3,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  icon: {
    width: 36,
    height: 36,
    marginHorizontal: 10,
  },
  descriptionContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  contactContainer: {
    marginTop: 20,
  },
  whatsappContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default Publisher;
