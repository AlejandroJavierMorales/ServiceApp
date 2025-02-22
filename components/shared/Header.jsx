import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, Modal, Linking, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useGeneralContext from '../../hooks/useGeneralContext';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../fetures/User/UserSlice';
import { useDB } from '../../hooks/useDB';
import { useIsFocused } from '@react-navigation/native';




const Header = ({ title = '', navigation, route }) => {
    const { user } = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const {
        setCategorySelected, setSubCategorySelected,
        setSubSubCategorySelected, actualPage,
        setActualPage
    } = useGeneralContext();

    const { truncateSessionTable } = useDB() // traigo el metodo que elimina la tabla de sessions de SQLite
    /*   const route = useRoute(); */
    const sendWhatsApp = () => {
        const message = 'Hola, te escribo desde AppServices...';
        const phoneNumber = '+543546562855';
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(() => {
            Alert.alert('Error', 'WhatsApp no está instalado en este dispositivo');
        });
    };

    const onBackPress = () => {
        navigation.goBack();
    }
    const onHomePress = () => {
        navigation.navigate('Home');
    }

    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Seguro que quieres cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Cerrar Sesión",
                    onPress: () => {
                        try {
                            truncateSessionTable(); // Se elimina la session 
                            dispatch(clearUser());
                            // Navegar a la pantalla de UserProfie
                            navigation.navigate('UserTabScreen');
                        } catch (error) {
                            console.log({ errorSignOutDB: error });
                        }

                    }
                }
            ],
            { cancelable: false }
        );
    };


    return (
        <View>
            <View style={styles.headerContainer}>
                {/* <Image
                    source={{ uri: 'https://calamuchita.ar/assets/images/logos/logocalamuchitar.png' }}
                    style={styles.logo}
                /> */}
                <View style={styles.textTitle}>
                    <Image
                        source={require('../../assets/images/services.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.appText}>App</Text>
                    <Text style={styles.serviceText}>Services</Text>
                </View>

                <TouchableOpacity style={styles.menuButton} onPress={() => setModalVisible(true)}>
                    <Icon name="bars" size={30} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={[styles.greenBar, (route.name === 'Home' || route.name === 'User' || route.name === 'Search') && styles.greenBarHome]}>
                {(route.name !== 'Home' && route.name !== 'User' && route.name !== 'Search') && (
                    <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
                <Text style={[styles.title, (route.name === 'Home' || route.name === 'User' || route.name === 'Search') && styles.titleHome]}>{title}</Text>
                {(route.name !== 'Home' && route.name !== 'User' && route.name !== 'Search') && (
                    <TouchableOpacity onPress={onHomePress} style={styles.iconButton}>
                        <Icon name="home" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.greenBarUser}>
                {
                    user && (
                        <View style={styles.greenBarUserLogged}>
                            <Icon name="user" size={20} color="#000" />
                            <Text style={styles.userNameText}>{`${user}`}</Text>
                            <View style={styles.spacer} />
                            {
                                (route.name === 'User' || route.name === 'ToDo') && (
                                    <>
                                        <TouchableOpacity onPress={() => { navigation.navigate('User') }} style={[styles.iconButton, { marginRight: 5 }]}>
                                            <Icon name="user-circle" size={24} color="#000" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { navigation.navigate('ToDo') }} style={[styles.iconButton, { marginRight: 15 }]}>
                                            <Icon name="sticky-note" size={24} color="#000" />
                                        </TouchableOpacity>
                                    </>
                                )

                            }


                            <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
                                <Icon name="sign-out" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="close" size={30} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('HomeTabScreen'); }}>
                            <Icon name="home" size={20} color="#24af63" />
                            <Text style={styles.menuItemText}>Inicio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('UserTabScreen') }}>
                            <Icon name="user" size={20} color="#24af63" />
                            <Text style={styles.menuItemText}>Usuario</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { setModalVisible(false); navigation.navigate('SearchTabScreen') }}>
                            <Icon name="search" size={20} color="#000" />
                            <Text style={styles.menuItemText}>Buscar</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                        <TouchableOpacity style={styles.menuItem} onPress={sendWhatsApp}>
                            <Icon name="whatsapp" size={20} color="#25D366" />
                            <Text style={styles.menuItemText}>Publicá en la App</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#ffffff',
        marginTop: 20,
    },
    logo: {
        width: 60,
        height: 60,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'rgba(177, 231, 197, 0.5)',
        borderStyle: 'solid',
        borderRadius: 50,
        marginStart: 40
    },
    menuButton: {
        marginRight: 15,
        marginTop: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(177, 231, 197, 0.5)',
    },
    modalContent: {
        width: 250,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    menuItem: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 18,
        marginLeft: 10,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    greenBar: {
        minHeight: 60,
        backgroundColor: '#24af63',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    greenBarHome: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    titleHome: {
        textAlign: 'center',
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    greenBarUser: {
        backgroundColor: 'rgba(177, 231, 197, 0.5)',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 2,
        paddingLeft: 10,
    },
    greenBarUserLogged: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        width: '100%',
    },
    userNameText: {
        color: "#3a3a3a",
        marginLeft: 10,
    },
    spacer: {
        flex: 1,
    },
    appText: {
        color: '#24af63',
        fontSize: 30,
        fontWeight: 'bold',
        marginStart: 5
    },
    serviceText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    textTitle: {
        flexDirection: 'row',
        alignItems: 'center',

    }
});

export default Header;
