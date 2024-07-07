// database/uploadImageToFirebaseStorage.js

import { storage } from './firebase';  // Asegúrate de importar el `storage` desde el archivo de configuración de Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageToFirebaseStorage = async (uri, userEmail) => {
  try {
    // Crea una referencia a la carpeta `profileimage` y al archivo con un nombre único usando el email del usuario
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profileimage/${userEmail}/${Date.now()}.jpg`);
    
    // Sube la imagen al Storage
    await uploadBytes(storageRef, blob);
    
    // Obtén la URL de descarga de la imagen
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('No se pudo subir la imagen');
  }
};
