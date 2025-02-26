import { Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import MessageBubble from "../../components/MessageBubble"
import { fetchGeminiResponse } from "../../services/geminiService"
import * as DocumentPicker from "expo-document-picker"
import { MaterialIcons } from '@expo/vector-icons';

//export const [resultsContext, setResultContext| = useContext({});

export default function TabTwoScreen() {
  const [messages, setMessages] = useState<{ role: string; text: string; file?: string | null }[]>([])
  const [inputText, setInputText] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({});
  const [option, setOption] = useState("");
  useEffect(() => {
    const resultsContext = React.createContext({ ...data });
  }, [data]);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" })
      if (result.canceled || !result.assets || result.assets.length === 0) return

      setSelectedFile(result)

      const fileMessage = {
        role: "user",
        text: `Archivo subido: ${result.assets[0].name}`,
        file: result.assets[0].uri,
      }
      setMessages((prevMessages) => [...prevMessages, fileMessage])
    } catch (error) {
      console.error("Error al subir archivo: ", error)
    }
  }

  const handleSend = async () => {
    if (!inputText.trim() && !selectedFile) return

    // if (inputText.trim() === "1") {
    //   setOption("1");
    //   setInputText("Quiero que analices el archivo y me entregues un JSON con la cantidad de personas que votarón por noboa, las que votarán por Luis o las que tendrán el voto nulo, solo devuelveme el JSON nada más, con los siguientes keys noboa, luisa, nulo");
    // } else {
    //   setOption("");
    // }

    setLoading(true)

    const userMessage = {
      role: "user",
      text: inputText || `Pregunta sobre archivo: ${selectedFile?.assets?.[0].name}`,
      file: selectedFile?.assets?.[0]?.uri || null
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])

    try {
      const response = await fetchGeminiResponse(inputText, selectedFile)
      const botMessage = { role: "bot", text: response }
      // if(option === "1"){
      //   setData(JSON.parse(botMessage.text));
      // }
      setMessages(prevMessages => [...prevMessages, botMessage])
    } catch (error) {
      console.error("Error al obtener respuesta: ", error)
      setMessages(prevMessages => [...prevMessages, { role: "bot", text: "Error al comunicarse con la API" }])
    } finally {
      setLoading(false)
      setInputText("")
      setSelectedFile(null)
    }
  }

  return (
    <View className='flex-1 p-4 bg-gray-100'>
      <ScrollView className='flex-1 mt-4'>
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} text={msg.text} />
        ))}
      </ScrollView>

      {selectedFile?.assets?.[0] && (
        <View className='p-2 bg-gray-200 rounded-lg mt-2 flex-row items-center'>
          <Text className='text-black flex-1'>{selectedFile.assets[0].name}</Text>
          <TouchableOpacity onPress={() => setSelectedFile(null)}>
            <Text className='text-red-500 ml-2'>❌</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className='flex-row items-center p-2 bg-white shadow-md rounded-lg'>
        <TouchableOpacity className='bg-gray-300 p-3 rounded-lg mr-2' onPress={handleFileUpload}>
          <Text className='text-black'>📎</Text>
        </TouchableOpacity>

        <TextInput className='flex-1 p-2 border rounded-lg'
          placeholder='Escribe un mensaje...'
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity className='bg-blue-500 p-3 ml-2' style={{borderRadius: 50}} onPress={handleSend}>
          <MaterialIcons size={24} name="send" color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}