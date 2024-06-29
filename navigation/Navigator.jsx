import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import HomeStackNavigator from './HomeStackNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import { useSelector } from 'react-redux'
import AuthStackNavigator from './AuthStackNavigator'

const Navigator = () => {
  const { user } = useSelector((state) => state.auth.value)
  return (
    <NavigationContainer>
      {/* <HomeStackNavigator /> */}
      {/* <BottomTabNavigator /> */}
      {user ? <BottomTabNavigator/> : <AuthStackNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

const styles = StyleSheet.create({})
