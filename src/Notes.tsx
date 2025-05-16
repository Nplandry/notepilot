import React, { useState, Dispatch, SetStateAction } from "react";
import { View, TouchableOpacity, ScrollView, Text } from "react-native";
import tw from "twrnc";

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

interface NotesProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  selectedNoteType: string | null;
  notePrompt: string;
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  onGenerateNote: (type: string, prompt: string) => Promise<string | null>;
}

export default function Notes({ 
  modalVisible, 
  setModalVisible, 
  selectedNoteType, 
  notePrompt,
  isGenerating,
  setIsGenerating,
  onGenerateNote
}: NotesProps) {
  const [notes, setNotes] = useState<Note[]>([
    { 
      id: 1, 
      title: "Lista de compras", 
      content: "Leche, huevos, pan...", 
      date: new Date(2024, 2, 15).toISOString() 
    },
    { 
      id: 2, 
      title: "Lista de compras 2", 
      content: "Leche, huevos, pan...", 
      date: new Date(2024, 2, 15).toISOString() 
    },
    { 
      id: 3, 
      title: "Ideas proyecto", 
      content: "Investigar APIs para...", 
      date: new Date(2024, 2, 14).toISOString() 
    },
    { 
      id: 4, 
      title: "Recordatorios", 
      content: "Llamar al médico a las...", 
      date: new Date(2024, 2, 13).toISOString() 
    },
    { 
      id: 5, 
      title: "Notas de lectura", 
      content: "Capítulo 5 - Los principales...", 
      date: new Date(2024, 2, 12).toISOString() 
    },
  ]);

  React.useEffect(() => {
    if (selectedNoteType && notePrompt && !isGenerating) {
      onGenerateNote(selectedNoteType, notePrompt).then((aiResponse) => {
        if (aiResponse) {
          const newNote = {
            id: Date.now(),
            title: notePrompt.length > 20 ? `${notePrompt.substring(0, 20)}...` : notePrompt,
            content: aiResponse,
            date: new Date().toISOString()
          };
          setNotes([newNote, ...notes]);
        }
      });
    }
  }, [selectedNoteType, notePrompt, isGenerating]);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`px-6 py-3`}>
        <View style={tw`bg-gray-800 rounded-3 px-4 py-2 flex-row items-center`}>
          <Text style={tw`text-gray-400`}>Buscar notas...</Text>
        </View>
      </View>
    
      <View style={tw`px-6 py-3 flex-1`}>        
        {notes.length === 0 ? (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-gray-500 text-center`}>No hay notas aún.{"\n"}Presiona el botón + para crear una.</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(
              notes.reduce((acc, note) => {
                const date = new Date(note.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
                if (!acc[date]) acc[date] = [];
                acc[date].push(note);
                return acc;
              }, {} as Record<string, Note[]>)
            ).map(([date, dayNotes]) => (
              <View key={date} style={tw`mb-6`}>
                <Text style={tw`text-gray-200 mb-4 text-lg font-bold capitalize`}>{date}</Text>
                <View style={tw`bg-blue-600 rounded-xl overflow-hidden`}>
                  {dayNotes.map((note, index) => (
                    <React.Fragment key={note.id}>
                      <TouchableOpacity 
                        style={tw`p-4 ${index !== dayNotes.length - 1 ? 'border-b border-blue-900' : ''}`}
                        onPress={() => console.log("Abrir nota:", note.id)}
                      >
                        <Text style={tw`text-white font-bold text-lg mb-2`} numberOfLines={1}>
                          {note.title}
                        </Text>
                        <Text style={tw`text-white text-opacity-80 text-sm`} numberOfLines={3}>
                          {note.content}
                        </Text>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
