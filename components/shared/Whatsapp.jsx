// WhatsApp.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WhatsApp = ({ phoneNumber }) => {
    const sendWhatsApp = () => {
        const message = 'Hola, te escribo desde la App de Servicios...'; // Mensaje predeterminado
        const url = `whatsapp://send?phone=549${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo');
        });
    };

    return (
        <TouchableOpacity style={styles.menuItem} onPress={sendWhatsApp}>
            {/* <Icon name="whatsapp" size={30} color="#25D366" /> */}
            <Image style={styles.icon} source={require('../../assets/images/icons/whatsapp_verde_bordeblanco.png')} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        padding: 10,
    },
    menuItemText: {
        fontSize: 18,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
    icon: {
        width: 30,
        height: 30,
        marginHorizontal: 5,
      },
});

export default WhatsApp;
