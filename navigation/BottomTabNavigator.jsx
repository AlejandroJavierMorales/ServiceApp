import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStackNavigator from './HomeStackNavigator'
import { FontAwesome5 } from "@expo/vector-icons";
import UserStackNavigator from './UserStackNavigator'
import SearchStackNavigator from './SearchStackNavigator'
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { useDB } from '../hooks/useDB';
import { useEffect } from 'react';
import { setUser } from '../fetures/User/UserSlice';


const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {

  const { user } = useSelector((state) => state.auth.value)
  const dispatch = useDispatch()
  const { getSession } = useDB() // peparo para obtener la session

  useEffect(() => {
    (async () => {
      try {
        const response = await getSession(); // obtengo la session
        if (response) {
          const user = response;
          dispatch(
            setUser({
              email: user?.email,
              localId: user?.localId,
              idToken: user?.token,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();
  });


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerShown: false
      })}
    >
      <Tab.Screen
        name="HomeTabScreen"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5 name="home" size={24} color={focused ? "grey" : 'black'} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="UserTabScreen"
        component={user ? UserStackNavigator : AuthStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5 name="user" size={24} color={focused ? "grey" : "black"} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchTabScreen"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View>
                <FontAwesome5
                  name="search"
                  size={24}
                  color={focused ? "grey" : "black"}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#24af63',
    height: 60
  }
})
