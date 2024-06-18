import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from "expo-font";
import { GeneralContextProvider } from './context/GeneralContext';
import Navigator from './navigation/Navigator';

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
    <GeneralContextProvider>
      <Navigator />
    </GeneralContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  listCards: {
    paddingBottom: 10,
    paddingTop: 10,
    alignItems: 'center',
  },
});
