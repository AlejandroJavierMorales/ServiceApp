import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchTool = ({ rubros = [{ name: 'pipo', id: 1 }, { name: 'caramuza', id: 2 }], onSearch }) => {
    const [selectedRubro, setSelectedRubro] = useState({ id: '', type: '' });
    const [descripcion, setDescripcion] = useState('');
    const [searchByRubro, setSearchByRubro] = useState(false);
    const [searchByDescripcion, setSearchByDescripcion] = useState(false);

    const handleSearch = () => {
        if (searchByRubro || searchByDescripcion) {
            onSearch(selectedRubro.id, selectedRubro.type, descripcion, searchByRubro, searchByDescripcion);
        } else {
            Alert.alert('Buscar', 'Selecciona un Criterio de Búsqueda', [{ text: 'Aceptar', style: 'cancel' }]);
        }
    };

    const handleClear = () => {
        setSelectedRubro({ id: '', type: '' });
        setDescripcion('');
        setSearchByRubro(false);
        setSearchByDescripcion(false);
        onSearch('', '', '', false, false);
    };

    useEffect(() => {
        handleClear();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <CheckBox
                    style={styles.checkbox}
                    value={searchByRubro}
                    onValueChange={setSearchByRubro}
                />
                <Text style={styles.label}>Rubros</Text>
                <View style={[styles.picker, searchByRubro && styles.pickerBorder]}>
                    <Picker
                        selectedValue={selectedRubro.id}
                        onValueChange={(itemValue) => {
                            const selected = rubros.find(rubro => rubro.id === itemValue);
                            setSelectedRubro({ id: selected?.id, type: selected?.type });
                        }}
                        enabled={searchByRubro}
                    >
                        <Picker.Item label="" value="" />
                        {rubros.map((rubro) => (
                            <Picker.Item key={rubro.id} label={rubro.name} value={rubro.id} />
                        ))}
                    </Picker>
                </View>

            </View>
            <View style={styles.row}>
                <CheckBox
                    style={styles.checkbox}
                    value={searchByDescripcion}
                    onValueChange={setSearchByDescripcion}
                />
                <Text style={styles.label}>Descripción</Text>
            </View>
            {searchByDescripcion && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={descripcion}
                        onChangeText={setDescripcion}
                    />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
                    <Icon name="search" size={21} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnClear} onPress={handleClear}>
                    <Text style={styles.txtBtnClear}>Borrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginLeft: 10,
        flex: 1,
    },
    checkbox: {
        marginLeft: 0,
    },
    picker: {
        height: 40,
        width: 250,
        marginLeft: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(177, 231, 197, 0.5)',
    },
    pickerBorder: {
        borderWidth: 1,
        borderColor: '#24af63',
    },
    inputContainer: {
        width: '100%',
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btnSearch: {
        borderRadius: 3,
        backgroundColor: '#24af63',//verde background
        paddingHorizontal: 100,
        paddingVertical: 10,
        marginRight:10
    },
    btnClear: {
        borderRadius: 3,
        backgroundColor: '#24af63',//verde background
        paddingHorizontal: 40,
        paddingVertical: 10,
    },
    txtBtnClear:{
        color:'#ffff'
    }
});

export default SearchTool;
