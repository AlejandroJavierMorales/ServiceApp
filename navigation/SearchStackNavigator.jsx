

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Search } from '../screens';
import { Header } from '../components/shared';


const Stack = createNativeStackNavigator()

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={ ({route})=> ({
        header: ({ navigation, route }) => {
          return (
            <Header 
              title={
                route.name === 'Search' 
                ? "Buscar Servicio"
                : 'Buscar...'
              }
              navigation={navigation} route={route}
            />
          )
        }
      })}
    >
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

export default SearchStackNavigator
