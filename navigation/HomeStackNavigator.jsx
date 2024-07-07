
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Publish, PublisherDetail, PublishersList, SubCategories, SubSubCategories } from "../screens";
import { Header } from "../components/shared";
import LocationScreen from "../screens/LocationScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
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
              : route.name === "LocationScreen"
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
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="Publish" component={Publish} />
    </Stack.Navigator>
  );
}
