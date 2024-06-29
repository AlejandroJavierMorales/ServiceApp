import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";


const SubmitButton = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    marginTop:30,
    backgroundColor: '#24af63',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    width: "60%",
  },
  text: {
    color: '#ffffff',
   /*  fontFamily: "PlayFair", */
    fontSize: 18,
  },
});
