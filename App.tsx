import React from "react";
import { SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import Home from "./src/Home";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  const MainStack = () => (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
    <SafeAreaView style={tw`flex-1`}>
      <MainStack />
    </SafeAreaView>
    </NavigationContainer>
  );
}
