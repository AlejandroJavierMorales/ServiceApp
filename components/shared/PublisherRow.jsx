import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';


const PublisherRow = ({ item, onHandleLocation, onHandleWhatsapp, onHandleDetail }) => {
  const { company_name, firstname, lastname, description1 } = item;

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.name}>{company_name ? company_name : `${firstname} ${lastname}`}</Text>
        <Text style={styles.description}>{description1}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onHandleLocation}>
          <Image style={styles.icon} source={require('../../assets/images/icons/location.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHandleWhatsapp}>
          <Image style={styles.icon} source={require('../../assets/images/icons/whatsapp_verde_bordeblanco.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onHandleDetail}>
          <Image style={styles.icon} source={require('../../assets/images/icons/ver_mas.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: '#555',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});

export default PublisherRow;
