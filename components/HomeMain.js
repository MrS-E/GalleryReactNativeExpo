import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./Home";
import New from "./New";

export default function (){
    const Stack = createNativeStackNavigator();
    return(
    <Stack.Navigator>
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
    )
}
