import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, ToDo } from "../screens";
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
                : 'Registro de Tareas'
              }
              navigation={navigation} route={route}
            />
          )
        }
      })}
    >
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="ToDo" component={ToDo} />
    </Stack.Navigator>
  );
};

export default UserStackNavigator;
