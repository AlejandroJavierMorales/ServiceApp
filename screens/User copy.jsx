import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CustomButton } from '../components/shared';
import { useGetUserDataQuery, useUpdateUserDataMutation } from '../services/userService';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';
import { uploadImageToFirebaseStorage } from '../databases/uploadImageToFirebaseStorage';
import { setUserData } from '../fetures/User/UserSlice';

const User = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth.value);
  const { data: users, error: userError, isLoading: isUserLoading } = useGetUserDataQuery();
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateUserData] = useUpdateUserDataMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (users) {
      const currentUser = users.find(u => u.email === user);
      if (currentUser) {
        setUserProfile(currentUser);
        setEditData(currentUser); // Inicializa los datos de edición con la información del usuario
      } else {
        console.log('Usuario Nuevo o No encontrado');
      }
    }
    if (userError) {
      console.error('Error al obtener datos del usuario:', userError);
    }
  }, [users, user, userError]);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
      Alert.alert('Permisos requeridos', 'Necesitas otorgar permisos para acceder a la cámara y la galería.');
    }
  };

  const selectImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const imageUri = result.assets[0].uri;
        console.log('Image URI from gallery:', imageUri);
        try {
          const downloadURL = await uploadImageToFirebaseStorage(imageUri, user);
          await updateUserData({ id: userProfile.id, profileimage: downloadURL, ...editData });
          dispatch(setUserData({ ...editData, profileimage: downloadURL }));
          setUserProfile({ ...userProfile, profileimage: downloadURL });
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    } else {
      Alert.alert('Se Requiere Permiso', 'Necesitas otorgar permiso para acceder a la galería.');
    }
  };

  const launchCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled) {
        console.log('User cancelled image picker');
      } else if (!result.assets || !result.assets[0]?.uri) {
        console.log('No image found or no URI available');
      } else {
        const imageUri = result.assets[0].uri;
        console.log('Image URI from camera:', imageUri);
        try {
          const downloadURL = await uploadImageToFirebaseStorage(imageUri, user);
          await updateUserData({ id: userProfile.id, profileimage: downloadURL, ...editData });
          dispatch(setUserData({ ...editData, profileimage: downloadURL }));
          setUserProfile({ ...userProfile, profileimage: downloadURL });
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    } else {
      Alert.alert('Se Requiere Permiso', 'Necesitas otorgar permiso para acceder a la cámara.');
    }
  };

  const openImagePickerModal = () => {
    Alert.alert(
      'Seleccionar Imagen de Perfil',
      'Puede tomar una foto con la cámara o escoger una imagen almacenada en el teléfono',
      [
        { text: 'Cámara', onPress: launchCamera },
        { text: 'Galería', onPress: selectImageFromGallery },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await updateUserData({ id: userProfile.id, ...editData });
      dispatch(setUserData(editData));
      setUserProfile(editData);
      setShowModal(false);
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const defaultImageRoute = require("../assets/images/user/user.png");

  return (
    <View style={styles.container}>
      <Image
        source={typeof userProfile?.profileimage === 'string' && userProfile?.profileimage ? { uri: userProfile?.profileimage } : defaultImageRoute}
        style={styles.img}
        resizeMode="cover"
      />
      <Pressable style={styles.editImageButton} onPress={openImagePickerModal}>
        <Icon name="edit" size={32} color="#24af63" />
      </Pressable>

      {isUserLoading ? (
        <Text>Loading user data...</Text>
      ) : (
        <View style={styles.userDataContainer}>
          <View style={styles.infoRow}>
            <Icon name="user" size={24} color="#000" />
            <Text>{`${userProfile?.firstname} ${userProfile?.lastname}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={24} color="#000" />
            <Text>{`${userProfile?.street} ${userProfile?.city} ${userProfile?.state}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="envelope" size={24} color="#000" />
            <Text>{`${userProfile?.email}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="whatsapp" size={24} color="#000" />
            <Text>{`${userProfile?.whatsapp}`}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="sticky-note" size={24} color="#000" />
            <Text>{`${userProfile?.obs}`}</Text>
          </View>
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Icon name="edit" size={32} color="#24af63" />
          </Pressable>
        </View>
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Editar Datos de Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={editData.firstname}
            onChangeText={(text) => setEditData({ ...editData, firstname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={editData.lastname}
            onChangeText={(text) => setEditData({ ...editData, lastname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Street"
            value={editData.street}
            onChangeText={(text) => setEditData({ ...editData, street: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={editData.city}
            onChangeText={(text) => setEditData({ ...editData, city: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
            value={editData.state}
            onChangeText={(text) => setEditData({ ...editData, state: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="WhatsApp"
            value={editData.whatsapp}
            onChangeText={(text) => setEditData({ ...editData, whatsapp: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Observations"
            value={editData.obs}
            onChangeText={(text) => setEditData({ ...editData, obs: text })}
          />
          <CustomButton title='Guardar' onPress={handleSave} />
          <CustomButton title='Cancelar' onPress={() => setShowModal(false)} backgroundColor='gray' />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 10,
  },
  editImageButton: {
    position: 'absolute',
    top: 160,
    left: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  userDataContainer: {
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  editButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default User;
