import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "../screens";
import { Header } from "../components/shared";


const Stack = createNativeStackNavigator();

const UserStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="User"
      screenOptions={ ({route})=> ({
        header: ({ navigation, route }) => {
          return (
            <Header 
              title={
                route.name === 'User' 
                ? "Perfil de usuario"
                : 'User...'
              }
              navigation={navigation} route={route}
            />
          )
        }
      })}
    >
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
