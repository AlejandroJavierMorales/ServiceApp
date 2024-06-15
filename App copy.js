import { StatusBar, useWindowDimensions } from 'react-native';
import { StyleSheet, View, FlatList } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { GeneralContextProvider } from './context/GeneralContext';
import { Footer, Header } from './components/shared';
import { Home, PublisherDetail, PublishersList, SubCategories, SubSubCategories } from './screens';
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/Navigator';


const Stack = createNativeStackNavigator()


export default function App() {

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla

  // Cargar las fuentes de manera condicional
  const [fontsLoaded] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Muestra un cargando, podrías poner un spinner o algo similar
  }

  return (
    <NavigationContainer>
      <GeneralContextProvider>
      <Navigator />
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={ ({route})=> ({
          header: ({ navigation, route }) => {
            return (
              <Header 
                title={
                  route.name === 'Home' 
                  ? "Rubros de Servicios"
                  : route.name === "SubCategories"
                  ? route.params
                  : route.name === "SubSubCategories"
                  ? route.params
                  : route.name === "PublishersList"
                  ? route.params
                  : route.params.publisher
                }
                navigation={navigation} route={route}
              />
            )
          }
        })}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SubCategories" component={SubCategories} />
          <Stack.Screen name="SubSubCategories" component={SubSubCategories} />
          <Stack.Screen name="PublishersList" component={PublishersList} />
          <Stack.Screen name="PublisherDetail" component={PublisherDetail} />
        </Stack.Navigator>
         <Header />
        <Home />
        <Footer /> 
      </GeneralContextProvider>
    </NavigationContainer>


  );
}

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
