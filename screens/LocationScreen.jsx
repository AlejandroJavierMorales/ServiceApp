import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { LocationMap } from '../components/shared';

function LocationScreen({navigation, route}) {

  const publisherStored =useSelector((state)=>state.publishers.value?.publisher);

    return (
        <View style={styles.container}>
            <LocationMap entities={[publisherStored]} />
        </View>
    )
}

export default LocationScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10
    },
    listCards: {
      paddingBottom: 10,
      paddingTop: 10,
      alignItems: 'center'
    }
  });
  