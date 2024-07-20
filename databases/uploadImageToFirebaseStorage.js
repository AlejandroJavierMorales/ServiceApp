import { storage } from './firebase';  // importar el `storage` desde el archivo de configuración de Firebase
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageToFirebaseStorage = async (uri, userEmail) => {
  try {
    // Remover o reemplazar caracteres no válidos del email
    const sanitizedEmail = userEmail.replace(/[@.]/g, '_');

    // Obtener el blob de la imagen
    const response = await fetch(uri);
    const blob = await response.blob();

    // Crear la referencia al archivo de imagen con el nombre fijo
    const storageRef = ref(storage, `profileimage/${sanitizedEmail}.jpg`);

    // Subir la imagen al Storage
    await uploadBytes(storageRef, blob);

    // Obtener la URL de descarga de la imagen
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('No se pudo subir la imagen');
  }
};
