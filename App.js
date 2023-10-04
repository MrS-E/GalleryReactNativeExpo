import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./components/HomeMain";
import Search from "./components/Search";
import Settings from "./components/SettingsMain";
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator style={{marginBottom:"20%"}} screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const icons = {
                        Home: 'home',
                        Search: 'magnify',
                        Settings: 'account'
                    };
                    return (
                        <MaterialCommunityIcons
                            name={icons[route.name]}
                            color={color}
                            size={size}
                        />
                    );
                },
                headerShown: false})} >
            <Tab.Screen name="Home" options={{title: ""}}  component={Home} />
            <Tab.Screen name="Search" options={{title: ""}} component={Search}  />
            <Tab.Screen name="Settings" options={{title: ""}} component={Settings}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}


