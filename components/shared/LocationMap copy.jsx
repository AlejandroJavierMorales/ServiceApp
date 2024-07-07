import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from "expo-location"
import { calculateDistanceBetweenTwoCoordinates } from '../../helpers/calculateDistance';
import { googleMapsApiKey } from '../../databases/googlemap';



const LocationMap = ({ entities, onHandleLocation, onHandleWhatsapp, onHandleDetail }) => {

    const { coordinates } = entities[0];
    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [distance, setDistance] = useState(null);
    const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${googleMapsApiKey}`

    useEffect(() => {
        //Cargar mi posición en el primer renderizado del componente
        const getMyPosition = async () => {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            //calcular distancia
            const lat = coordinates.split(',')[0];
            const lon = coordinates.split(',')[1]
            /*  alert('Lat: '+ lat + ' Long '+lon + 'Lat: '+ location.latitude + ' Long '+ location.longitude) */
            setDistance(calculateDistanceBetweenTwoCoordinates(location.coords.latitude,
                location.coords.longitude, lat, lon));
        }
        getMyPosition();
    }, [])

    return (<>
        <View style={styles.row}>
            <Text>{`Coordenadas de Mi Posición: Latitud ${location.latitude} Longitud ${location.longitude}`}</Text>
            <Text>{`Coordenadas de Entity: ${coordinates}`}</Text>
            {distance && <Text>{`Distancia: ${distance} km`}</Text>}
        </View>
        <View style={styles.mapPreview}>
            <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
        </View>
    </>

    );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: 300,
        height: 300,
    },
});

export default LocationMap;
