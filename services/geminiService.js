import React, {useState} from "react"
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";

const API_KEY = "AIzaSyCpl667dZHlD-HUHl2mCf03as1213UKssI";

export const fetchGeminiResponse = async (question, file) => {
    try {
        let filePart = null;
        const prompt = "Eres un asistente inteligente que analiza archivos y responde preguntas basadas en su contenido. Todas tus respuestas deben estar en español";

        if (file && file.assets && file.assets.length > 0) {
            try {
                const fileUri = file.assets[0].uri;
                let mimeType = file.assets[0].mimeType || file.assets[0].type;

                if (!mimeType) {
                    if (fileUri.endsWith(".pdf")) {
                        mimeType = "application/pdf"
                    } else if (fileUri.endsWith(".txt")) {
                        mimeType = "text/plain"
                    } else if (fileUri.endsWith(".png")) {
                        mimeType = "image/png"
                    } else if (fileUri.endsWith(".jpg") || fileUri.endsWith(".jpeg")) {
                        mimeType = "image/jpeg"
                    }
                }

                console.log("Archivo seleccionado:", { uri: fileUri, mimeType })

                // Validamos que sea un tipo de archivo permitido
                const allowedMimeTypes = ["application/pdf", "text/plain", "image/png", "image/jpeg"];
                if (!allowedMimeTypes.includes(mimeType)) {
                    console.warn("Formato de archivo no soportado:", mimeType);
                    return "Formato de archivo no soportado";
                }

                // Leemos el archivo en Base64
                const fileContent = await FileSystem.readAsStringAsync(fileUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                filePart = {
                    inline_data: {
                        mime_type: mimeType,
                        data: fileContent,
                    },
                };
            } catch (fileError) {
                console.error("Error al leer el archivo:", fileError);
                return "Error al leer el archivo";
            }
        }

        if(!filePart && file){
            console.warn("El archivo no se pudo procesar correctamente");
            return "Error: el archivo no se procesó correctamente.";
        }

        // Construcción del cuerpo de la solicitud
        const requestBody = {
            contents: [
                {
                    role: "user",
                    parts: [
                        {text:prompt},
                        ...(filePart ? [filePart] : []),
                        {text: question},
                    ],
                },
            ],
        };

        // Petición a la API de Gemini
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            }
        );

        const data = await response.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo obtener respuesta";
    } catch (error) {
        console.error("Error al comunicarse con la API:", error);
        return "Error al comunicarse con la API";
    }
};