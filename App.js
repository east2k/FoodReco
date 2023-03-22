import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from './components/Screens/StartScreen';
import HomeWindow from './components/Screens/MainMenu/HomeWindow';
import ProfilingWindow from './components/Screens/MainMenu/ProfilingWindow';
import UserProfile from './components/Screens/MainMenu/UserProfile';
import DietOptions from './components/Screens/ContentMenu/DietOptions';
import BlacklistingWindow from './components/Screens/Blacklisting/BlacklistingWindow';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeWindow} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilingWindow" component={ProfilingWindow} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="DietOptions" component={DietOptions} options={{ headerShown: false }} />
        <Stack.Screen name="BlacklistingWindow" component={BlacklistingWindow} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App