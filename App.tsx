import React, { useEffect, useState } from "react";
import { SafeAreaView, Modal, View, Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import tw from "twrnc";
import Home from "./src/Home";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../notepilot/firebaseconfig"; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setModalVisible(!firebaseUser);
    });
    return unsubscribe;
  }, []);

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
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
        >
          <View style={tw`flex-1 bg-black bg-opacity-60 justify-center items-center`}>
            <View style={tw`bg-blue-950 rounded-xl p-8`}>
              <Text style={tw`text-gray-400 text-2xl font-semibold mb-2`}>¡Bienvenido a NotePilot!</Text>
              <Text style={tw`text-gray-400 text-xl mb-4`}>Empieza a crear</Text>
              <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-blue-900 bg-opacity-60 px-10 py-2 rounded-full border border-2 border-orange-400`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white text-center`}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-blue-600 px-10 py-2 rounded-full`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white text-center`}>Ingresar</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </NavigationContainer>
  );
}
