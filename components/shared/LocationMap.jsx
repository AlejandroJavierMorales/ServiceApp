import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { calculateDistanceBetweenTwoCoordinates } from '../../helpers/calculateDistance';

const centerMap = { latitude: -31.91924741209984, longitude: -64.57716408465745 };

const LocationMap = ({ entities }) => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [showMyLocation, setShowMyLocation] = useState(false);
    const [distances, setDistances] = useState([]);
    const [region, setRegion] = useState({
        latitude: centerMap.latitude,
        longitude: centerMap.longitude,
        latitudeDelta: 0.1522,
        longitudeDelta: 0.0621,
    });

    useEffect(() => {
        const getMyPosition = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            // Recalcular distancias al obtener mi ubicación
            const calculatedDistances = entities.map((entity) => {
                const [lat, lon] = entity.coordinates.split(',').map(Number);
                return showMyLocation
                    ? calculateDistanceBetweenTwoCoordinates(location.coords.latitude, location.coords.longitude, lat, lon)
                    : calculateDistanceBetweenTwoCoordinates(centerMap.latitude, centerMap.longitude, lat, lon);
            });
            setDistances(calculatedDistances);
        };

        // Ejecutar la función al montar el componente y cuando `showMyLocation` cambie
        getMyPosition();
    }, [showMyLocation]);

    // Actualizar distancias cuando cambia `location` o `showMyLocation`
    useEffect(() => {
        if (showMyLocation) {
            const updateDistances = entities.map((entity) => {
                const [lat, lon] = entity.coordinates.split(',').map(Number);
                return calculateDistanceBetweenTwoCoordinates(location.latitude, location.longitude, lat, lon);
            });
            setDistances(updateDistances);
        } else {
            const referenceDistances = entities.map((entity) => {
                const [lat, lon] = entity.coordinates.split(',').map(Number);
                return calculateDistanceBetweenTwoCoordinates(centerMap.latitude, centerMap.longitude, lat, lon);
            });
            setDistances(referenceDistances);
        }
    }, [location, showMyLocation]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Switch
                    value={showMyLocation}
                    onValueChange={setShowMyLocation}
                />
                <Text>Ver Mi Ubicación</Text>
            </View>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
            >
                {showMyLocation && (
                    <Marker
                        coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                        pinColor="blue"
                        title="Mi Ubicación"
                        description="Esta es mi ubicación actual"
                    />
                )}
                <Marker
                    coordinate={{ latitude: centerMap.latitude, longitude: centerMap.longitude }}
                    pinColor="green"
                    title="Ubicación del Centro del Mapa"
                    description="Esta es la ubicación del centro del mapa"
                />
                {entities.map((entity, index) => {
                    const [lat, lon] = entity.coordinates.split(',').map(Number);
                    return (
                        <Marker
                            key={index}
                            coordinate={{ latitude: lat, longitude: lon }}
                        >
                            <Callout>
                                <View style={styles.callout}>
                                    <Text style={styles.boldText}>{entity.company_name}</Text>
                                    <Text style={styles.boldText}>Dirección:</Text>
                                    <Text>{`${entity.street}, ${entity.city}, ${entity.state}`}</Text>
                                    <Text style={styles.boldText}>Teléfono:</Text>
                                    <Text>{entity.whatsapp}</Text>
                                    <Text style={styles.boldText}>
                                        {showMyLocation
                                            ? `Distancia desde Mi Ubicación: ${distances[index]} km`
                                            : `Distancia desde Referencia: ${distances[index]} km`}
                                    </Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    row: {
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    callout: {
        width: 200,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default LocationMap;
