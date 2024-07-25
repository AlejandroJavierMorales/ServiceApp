// PublishersList.js
import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { PublisherRow } from '../components/shared';
import { useDispatch, useSelector } from "react-redux";
import { setPublisher } from "../fetures/Publishers/PublishersSlice";
import * as Location from "expo-location";
import { useState } from 'react';

const PublishersList = ({ navigation, route }) => {
    const { width } = useWindowDimensions();
    const publishersStored = useSelector((state) => state.publishers.value.publishers);
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const onHandleLocation = async (item) => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setError("El Permiso de Acceso a Su Ubicación fue Denegado");
                return;
            }
            if (status === "granted") {
                dispatch(setPublisher(item));
                navigation.navigate('LocationScreen', `${item?.company_name}`);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onHandleDetail = (item) => {
        item && dispatch(setPublisher(item));
        navigation.navigate('PublisherDetail', item?.company_name);
    };

    return (
        <View>
            {
                publishersStored[0]?.firstname && (
                    publishersStored.map((item, index) => (
                        <PublisherRow
                            key={index}
                            item={item}
                            onHandleLocation={() => onHandleLocation(item)}
                            onHandleWhatsapp={() => onHandleWhatsapp(item)}
                            onHandleDetail={() => onHandleDetail(item)}
                        />
                    ))
                )
            }
        </View>
    );
};

export default PublishersList;
