import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import HomeStackNavigator from './HomeStackNavigator'
import BottomTabNavigator from './BottomTabNavigator'

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <HomeStackNavigator /> */}
      <BottomTabNavigator />

    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
