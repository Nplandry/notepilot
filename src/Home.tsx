import React, { useState } from "react";
import { 
  Text, 
  TouchableOpacity, 
  View, 
  SafeAreaView, 
  Modal, 
  TextInput, 
  Alert, 
  ActivityIndicator 
} from "react-native";
import tw from "twrnc";
import NoteModal from './components/modal/modal';
import Notes from "./Notes";
import axios from 'axios';

const API_KEY = 'sk_proxy_your_api_key_here';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNoteType, setSelectedNoteType] = useState<string | null>(null);
  const [notePrompt, setNotePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiNotesAvailable, setAiNotesAvailable] = useState(5);

  const generateNoteWithAI = async (type: string, prompt: string): Promise<string | null> => {
    if (aiNotesAvailable <= 0) {
      Alert.alert("Sin notas disponibles", "Has agotado tus notas AI disponibles.");
      return null;
    }

    setIsGenerating(true);
    try {
      let instruction = "";
      
      if(type === "text"){
        instruction = `Como experto en productividad, genera una rutina Monk Mode detallada para: ${prompt}. 
                      Incluye horarios específicos, bloques de trabajo, descansos y objetivos diarios. 
                      Formato: 1. Mañana (5:00-8:00) - Actividad específica\n2. Tarde...`;
      } 
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: instruction }],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setAiNotesAvailable(prev => prev - 1);
      setModalVisible(false);
      setSelectedNoteType(null);
      setNotePrompt("");
      return aiResponse;
    } catch (error) {
      console.error("Error al generar la nota:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor. Inténtalo más tarde.");
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNoteTypeSelect = (type: string) => {
    setSelectedNoteType(type);
  };

  return (
    <SafeAreaView style={tw`bg-gray-900 flex-1`}>
      <View style={tw`flex-row justify-between items-center px-6 py-4`}>
        <Text style={tw`text-3xl font-bold text-white`}>NotePilot</Text>
        <View style={tw`flex-row items-center gap-4`}>
          <View style={tw`bg-blue-600 px-2 py-2 rounded-full`}>
            <Text style={tw`text-white text-sm font-medium`}>AI Notes: {aiNotesAvailable}</Text>
          </View>
          <TouchableOpacity
            style={tw`rounded-full w-12 h-12 items-center justify-center shadow-lg`}
            onPress={() => setModalVisible(true)}
          >
            <Text style={tw`text-white text-4xl`}>＋</Text>
          </TouchableOpacity>
          <View style={tw`w-12 h-12 rounded-full bg-blue-600 items-center justify-center`}>
            <Text style={tw`text-white text-xl font-bold`}>NP</Text>
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedNoteType(null);
          setNotePrompt("");
        }}
      >
        {!selectedNoteType ? (
          <NoteModal 
            setModalVisible={setModalVisible} 
            onNoteTypeSelect={handleNoteTypeSelect} 
          />
        ) : (
          <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
            <View style={tw`bg-gray-800 rounded-t-3xl p-6 max-h-3/4`}>
              <Text style={tw`text-white text-xl font-bold mb-4 text-center`}>
                {selectedNoteType === 'text' ? 'Describe tu rutina' : 
                 selectedNoteType === 'list' ? 'Detalla tu lista' : 
                 'Explica tu nota'}
              </Text>
              
              <TextInput
                style={tw`bg-gray-700 text-white rounded-lg p-4 mb-6`}
                placeholder={
                  selectedNoteType === 'text' ? 'Ej: "Rutina para aprender React Native en 30 días"' :
                  selectedNoteType === 'list' ? 'Ej: "Preparación para entrevista técnica de frontend"' :
                  'Ej: "Resumen de conceptos clave de TypeScript"'
                }
                placeholderTextColor="#9CA3AF"
                value={notePrompt}
                onChangeText={setNotePrompt}
                multiline
                editable={!isGenerating}
              />
              
              <View style={tw`flex-row justify-between`}>
                <TouchableOpacity 
                  style={tw`border border-gray-600 rounded-full py-3 flex-1 mr-2 ${isGenerating ? 'opacity-50' : ''}`}
                  onPress={() => !isGenerating && setSelectedNoteType(null)}
                  disabled={isGenerating}
                >
                  <Text style={tw`text-white text-center font-medium`}>Atrás</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={tw`bg-indigo-600 rounded-full py-3 flex-1 ml-2 ${isGenerating ? 'opacity-75' : ''}`}
                  onPress={() => {
                    if (!notePrompt.trim()) {
                      Alert.alert("Campo vacío", "Por favor ingresa un contexto para tu nota");
                      return;
                    }
                    if (selectedNoteType) {
                      generateNoteWithAI(selectedNoteType, notePrompt);
                    }
                  }}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={tw`text-white text-center font-medium`}>Crear nota</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>

      <Notes 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedNoteType={selectedNoteType}
        notePrompt={notePrompt}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
        onGenerateNote={generateNoteWithAI}
      />
    </SafeAreaView>
  );
}