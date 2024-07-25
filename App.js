import React, { useEffect } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { useFonts } from "expo-font";
import { GeneralContextProvider } from './context/GeneralContext';
import Navigator from './navigation/Navigator';
import { Provider } from "react-redux";
import store from "./store";
import { useDB } from './hooks/useDB';

export default function App() {

  const {initDB} = useDB()  // llamo a initDB

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla


  useEffect(()=>{
    initDB()
  })

  return (
    <Provider store={store}>
      <GeneralContextProvider>
        <Navigator />
      </GeneralContextProvider>
    </Provider>
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
