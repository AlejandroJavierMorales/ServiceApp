import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/icons/whatsapp_negro.png')}
            style={styles.icono}
          />
          <Text style={styles.contactInfo}>3546 562855</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/icons/email_negro.png')}
            style={styles.icono}
          />
          <Text style={styles.contactInfo}>info@calamuchita.ar</Text>
        </View>
        <View style={styles.row}>
          <Image
            source={require('../../assets/images/icons/web_negro.png')}
            style={styles.icono}
          />
          <Text style={styles.contactInfo}>https://calamuchita.ar</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Image
          source={{uri: 'https://calamuchita.ar/assets/images/logos/logocalamuchitarredondo.png'}}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f0f0f0',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  rightSection: {
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  icono: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  contactInfo: {
    fontSize: 12,
  },
});

export default Footer;
