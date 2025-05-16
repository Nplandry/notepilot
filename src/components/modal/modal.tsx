import { TouchableWithoutFeedback, View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from 'twrnc';
import React from 'react';

interface NoteModalProps {
  setModalVisible: (visible: boolean) => void;
  onNoteTypeSelect: (type: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ setModalVisible, onNoteTypeSelect }) => {
    const noteTypes = [
      {
        type: 'text',
        emoji: '✏️',
        title: 'Rutina Monk Mode',
        description: 'Crea una rutina estricta con IA',
        color: 'bg-indigo-500'
      },
      {
        type: 'list',
        emoji: '✅',
        title: 'Lista de tareas',
        description: 'Lista generada por IA',
        color: 'bg-red-500'
      },
      {
        type: 'image',
        emoji: '🖼️',
        title: 'Nota con imagen',
        description: 'Añade una imagen con anotaciones',
        color: 'bg-emerald-500'
      },
      {
        type: 'audio',
        emoji: '🎤',
        title: 'Nota de audio',
        description: 'Graba o sube un audio con notas',
        color: 'bg-amber-500'
      },
      {
        type: 'drawing',
        emoji: '🎨',
        title: 'Dibujo a mano',
        description: 'Crea un boceto o diagrama',
        color: 'bg-pink-500'
      },
      {
        type: 'document',
        emoji: '📄',
        title: 'Documento',
        description: 'Importa o crea un documento',
        color: 'bg-cyan-500'
      }
    ];

    return (
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={tw`flex-1 bg-black bg-opacity-50 justify-end`}>
                <TouchableWithoutFeedback>
                    <View style={tw`bg-gray-800 rounded-t-3xl p-6 max-h-3/4`}>
                        <Text style={tw`text-white text-xl font-bold mb-6 text-center`}>Crear nueva nota</Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {noteTypes.map((noteType) => (
                                <TouchableOpacity 
                                    key={noteType.type}
                                    style={tw`${noteType.color} rounded-xl p-5 mb-3 flex-row items-center`}
                                    onPress={() => onNoteTypeSelect(noteType.type)}
                                >
                                    <Text style={tw`text-white text-2xl mr-4`}>{noteType.emoji}</Text>
                                    <View style={tw`flex-1`}>
                                        <Text style={tw`text-white font-bold`}>{noteType.title}</Text>
                                        <Text style={tw`text-gray-300 text-sm`}>{noteType.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity 
                            style={tw`border border-gray-600 rounded-full py-3 mt-2`}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={tw`text-white text-center font-medium`}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
                
            </View>
        </TouchableWithoutFeedback>
    );
}

export default NoteModal;