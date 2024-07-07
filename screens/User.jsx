import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddButton, CustomButton } from '../components/shared';
import { useGetProfileImageQuery, useGetUserDataQuery, useUpdateUserDataMutation } from '../services/userService';
import * as ImagePicker from 'expo-image-picker';
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
        console.error('Usuario no encontrado');
      }
    }
    if (userError) {
      console.error('Error al obtener datos del usuario:', userError);
    }
  }, [users, user, userError]);

  const selectImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const imageUri = result.assets[0]?.uri;
        try {
          const downloadURL = await uploadImageToFirebaseStorage(imageUri, user);  // Usa el email del usuario en lugar de localId
          await updateUserData({ id: userProfile.id, profileimage: downloadURL, ...editData });  // Actualiza la imagen en la base de datos
          dispatch(setUserData({ ...editData, profileimage: downloadURL }));  // Actualiza el estado del usuario
          setUserProfile({ ...userProfile, profileimage: downloadURL });  // Actualiza el perfil local
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    } else {
      Alert.alert('Permission Required', 'You need to grant permission to access the gallery.');
    }
  };

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const imageUri = result.assets[0]?.uri;
        try {
          const downloadURL = await uploadImageToFirebaseStorage(imageUri, user);  // Usa el email del usuario en lugar de localId
          await updateUserData({ id: userProfile.id, profileimage: downloadURL, ...editData });  // Actualiza la imagen en la base de datos
          dispatch(setUserData({ ...editData, profileimage: downloadURL }));  // Actualiza el estado del usuario
          setUserProfile({ ...userProfile, profileimage: downloadURL });  // Actualiza el perfil local
        } catch (error) {
          console.error('Error al subir la imagen:', error);
        }
      }
    } else {
      Alert.alert('Permission Required', 'You need to grant permission to access the camera.');
    }
  };

  const openImagePickerModal = () => {
    Alert.alert(
      'Seleccioner Imagen de Perfil',
      'Puede tomar una foto con la cámara o escoger una imagen almacenada en el teléfono',
      [
        { text: 'Camara', onPress: launchCamera },
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
      await updateUserData({ id: userProfile.id, ...editData });  // Actualiza el usuario en la base de datos
      dispatch(setUserData(editData));  // Actualiza el estado del usuario
      setUserProfile(editData);  // Actualiza el perfil local
      setShowModal(false);  // Cierra el modal
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const defaultImageRoute = require("../assets/images/user/user.png");

  return (
    <View style={styles.container}>
      {/* <Text>{userProfile?.profileimage}</Text> */}
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
          <CustomButton title='Cancelar' onPress={() => setShowModal(false)} backgroundColor='white' textColor='green' />

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  editImageButton: {
    position: 'absolute',
    top: 210,
    right: 120,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 10
  },
  editButton: {

    marginLeft: 120,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    margin: 20,
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(177, 231, 197, 0.5)'
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5
  },
  userDataContainer: {
    marginTop: 40,
  }
});

export default User;
