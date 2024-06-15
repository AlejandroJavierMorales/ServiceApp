// WhatsApp.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const WhatsApp = ({ phoneNumber }) => {
    const sendWhatsApp = () => {
        const message = 'Hola, te escribo desde la App Calamuchitar...'; // Mensaje predeterminado
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo');
        });
    };

    return (
        <TouchableOpacity style={styles.menuItem} onPress={sendWhatsApp}>
            <Icon name="whatsapp" size={20} color="#25D366" />
            <Text style={styles.menuItemText}>WhatsApp</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    menuItem: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 18,
        marginLeft: 10,
    },
});

export default WhatsApp;
