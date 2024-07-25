import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const CustomButton = ({
    title = "",
    onPress = () => {},
    backgroundColor = "green",
    textColor = "white"  // Prop para el color del texto
}) => {
    return (
        <Pressable
            style={{ ...styles.button, backgroundColor: backgroundColor }} 
            onPress={onPress}
        >
            <Text style={{ ...styles.text, color: textColor }}>{title}</Text>  
        </Pressable>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    button: {
        width: "100%",
        /* borderWidth: 1, */
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        marginTop:15,
        borderRadius:5
    },
    text: {
        fontSize: 18
    },
});
