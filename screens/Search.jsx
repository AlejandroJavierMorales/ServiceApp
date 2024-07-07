import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { SearchTool } from '../components/shared';

function Search() {

  /* const { setActualPage, setUserLogged, setLogged, subscriptionsList, setSubscriptionsList, setCitySelected } = useQuerysContext(); */
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (rubroId, rubroType, descripcion, searchByRubro, searchByDescripcion) => {

    searchByRubro===true || searchByDescripcion === true && setIsLoading(true); //Si se requiere buscar seteo isLoading hasta que fetch devuelva el resultado

    //funcion que busca los publishers o Subscriptions en funcion de los criterioos de busqueda
    const publishers = await fetchGetSearchPulishers(rubroId, rubroType, descripcion, searchByRubro, searchByDescripcion);
    
    setIsLoading(false);

    setSubscriptionsList(publishers?.data || []); //Seteo subscriptionsLis con los resultados a mostrar

    //si no hay resultados
    !publishers?.data && setResult('No se encontraron Resultados') ;
    //si se resetea la busqueda
    searchByRubro===false && searchByDescripcion === false && setResult('');
  }

  useEffect(() => {
  /*   setActualPage('search');
    setCitySelected('todas');
    if (session?.user) {
      setLogged(true);
      setUserLogged({ ...session.user, expires: session.expires });
    } */
  }, []);


return (
  <View style={styles.container}>
    <SearchTool /* rubros={rubros} */ onSearch={handleSearch}/>
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
