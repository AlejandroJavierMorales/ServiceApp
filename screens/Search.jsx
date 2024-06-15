import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function Search() {
    return (
        <View style={styles.container}>
            <Text>{'Search Screen'}</Text>
        </View>
    )
}

export default Search

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
  