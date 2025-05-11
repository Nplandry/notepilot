import React from "react";
import { Text, TouchableOpacity, View, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";

export default function Home() {
  const notes = [
    { id: 1, title: "Lista de compras", content: "Leche, huevos, pan...", color: "bg-blue-500" },
    { id: 2, title: "Ideas proyecto", content: "Investigar APIs para...", color: "bg-purple-500" },
    { id: 3, title: "Recordatorios", content: "Llamar al médico a las...", color: "bg-green-500" },
    { id: 4, title: "Notas de lectura", content: "Capítulo 5 - Los principales...", color: "bg-yellow-500" },
  ];

  return (
    <SafeAreaView style={tw`bg-gray-900 flex-1`}>
      <View style={tw`flex-row justify-between items-center px-6 py-4`}>
        <Text style={tw`text-3xl font-bold text-white`}>NotePilot</Text>
        <TouchableOpacity
          style={tw`mt--3 mr--2`}
          onPress={() => console.log("Añadir nueva nota")}
        >
          <Text style={tw`text-white text-6xl`}>＋</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`px-6 py-3`}>
        <View style={tw`bg-gray-800 rounded-4 px-4 py-3`}>
          <Text style={tw`text-gray-400`}>Buscar notas...</Text>
        </View>
      </View>

      <View style={tw`px-6 py-3`}>
        <Text style={tw`text-xl font-bold text-gray-300 mb-4`}>Tus notas</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {notes.map((note) => (
              <TouchableOpacity
                key={note.id}
                style={tw`${note.color} w-[48%] rounded-xl p-4 mb-4 shadow-md`}
                onPress={() => console.log("Abrir nota:", note.id)}
              >
                <Text style={tw`text-white font-bold text-lg mb-2`} numberOfLines={1}>
                  {note.title}
                </Text>
                <Text style={tw`text-white text-opacity-80 text-sm`} numberOfLines={3}>
                  {note.content}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
