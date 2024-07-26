import React, { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { GeneralContextProvider } from './context/GeneralContext';
import Navigator from './navigation/Navigator';
import { Provider } from "react-redux";
import store from "./store";
import { useDB } from './hooks/useDB';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {

  const { initDB } = useDB()  // llamo a initDB

  const { width } = useWindowDimensions(); // Obtiene el ancho de la pantalla


  useEffect(() => {
    initDB()
  })

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <GeneralContextProvider>
          <Navigator />
        </GeneralContextProvider>
      </Provider>
    </SafeAreaProvider>
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
