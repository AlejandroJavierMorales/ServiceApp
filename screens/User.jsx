import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

function User() {
    return (
        <View style={styles.container}>
            <Text>{'User Screen'}</Text>
        </View>
    )
}

export default User

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
  