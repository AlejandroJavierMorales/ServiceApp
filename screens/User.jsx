import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Modal, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddButton } from '../components/shared';
import { useGetProfileImageQuery, useGetUserDataQuery, useUpdateUserDataMutation } from '../services/userService';
import { setUserData } from '../fetures/User/UserSlice';

const User = ({ navigation }) => {
  const { imageCamera, localId, user } = useSelector((state) => state.auth.value);
  const { data: users, error: userError, isLoading: isUserLoading } = useGetUserDataQuery();
  const { data: imageFromBase, error: imageError, isLoading: isImageLoading } = useGetProfileImageQuery(localId);
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateUserData] = useUpdateUserDataMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(JSON.stringify(users));
    if (users) {
      const currentUser = users.find(u => u.email === user);
      if (currentUser) {
        console.log('Usuario:', JSON.stringify(currentUser));
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

  useEffect(() => {
    if (imageFromBase) {
      console.log('Imagen de perfil:', imageFromBase.image);
    }
    if (imageError) {
      console.error('Error al obtener imagen de perfil:', imageError);
    }
  }, [imageFromBase, imageError]);

  const launchCamera = async () => {
    navigation.navigate("Image Selector");
  };

  const launchLocation = async () => {
    navigation.navigate("List Address");
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
      {imageFromBase || imageCamera ? (
        <Image
          source={{ uri: imageFromBase?.image || imageCamera }}
          style={styles.img}
          resizeMode="cover"
        />
      ) : (
        <Image
          style={styles.img}
          resizeMode="cover"
          source={defaultImageRoute}
        />
      )}
      <AddButton
        onPress={launchCamera}
        title={
          imageFromBase || imageCamera
            ? "Modify profile picture"
            : "Add profile picture"
        }
      />
      <AddButton title="My address" onPress={launchLocation} />

      {isUserLoading ? (
        <Text>Loading user data...</Text>
      ) : (
        <View>
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
          {/* Icono de editar al final del View */}
          <Pressable style={styles.editButton} onPress={handleEdit}>
            <Icon name="edit" size={32} color="#24af63" />
          </Pressable>
        </View>
      )}

      {/* Modal para editar los datos del usuario */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit User Data</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="First Name"
              value={editData.firstname}
              onChangeText={(text) => setEditData({ ...editData, firstname: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Last Name"
              value={editData.lastname}
              onChangeText={(text) => setEditData({ ...editData, lastname: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Street"
              value={editData.street}
              onChangeText={(text) => setEditData({ ...editData, street: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="City"
              value={editData.city}
              onChangeText={(text) => setEditData({ ...editData, city: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="State"
              value={editData.state}
              onChangeText={(text) => setEditData({ ...editData, state: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Whatsapp"
              value={editData.whatsapp}
              onChangeText={(text) => setEditData({ ...editData, whatsapp: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Observations"
              value={editData.obs}
              onChangeText={(text) => setEditData({ ...editData, obs: text })}
            />
            <Button title="Save Changes" onPress={handleSave} color="#24af63" />
            <Button title="Cancel" onPress={() => setShowModal(false)} color="#ff4d4d" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  btn: {
    marginTop: 10,
    backgroundColor: "green",
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 6
  },
  editButton: {
    marginTop: 10,
    alignItems: 'flex-end',
    width: '100%',
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
