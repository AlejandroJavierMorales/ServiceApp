import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import useGeneralContext from '../../hooks/useGeneralContext';
import ContactItem from './ContactItem';
import { fetchGetImagesBySubscriptionId } from '../../utils/data/fetchImagesBySubscription';
import CarruselSwiper from './CarruselSwiper';






const Publisher = ({ item }) => {

    const [arrayImages, setArrayImages] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const { logged, userLogged, setMyFavorites } = useGeneralContext();


    const image = `https://calamuchita.ar/assets/images/publishers/profile/${item?.profile_image}`;

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
            
            <CarruselSwiper />

            <View style={styles.descriptionContainer}>
                <Text>{item?.description1}</Text>
                {item?.description2 && <Text>{item?.description2}</Text>}

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
        fontSize: 20,
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
        marginBottom: 40
    },
    whatsappContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Publisher;
