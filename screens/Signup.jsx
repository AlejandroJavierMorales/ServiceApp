import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";



import { useSignUpMutation } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../fetures/User/UserSlice";
import { InputForm, SubmitButton } from "../components/shared";



const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [errorMail, setErrorMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const dispatch = useDispatch()
  const [triggerSignUp, result] = useSignUpMutation()

  useEffect(()=>{
    if(result.isSuccess) {
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken
        })
      )
    }
  }, [result])

  const onSubmit = () => {
    // logica de registro
    triggerSignUp({email, password, returnSecureToken: true})
  }

  //console.log(result)

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Registro de Usuario</Text>
        <InputForm 
            label={"email"} 
            onChange={setEmail} 
            error={errorMail} 
        />
        <InputForm
          label={"password"}
          onChange={setPassword}
          error={errorPassword}
          isSecure={true}
        />
        <InputForm
          label={"confirmar password"}
          onChange={setconfirmPassword}
          error={errorConfirmPassword}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Registrarse" />
        <Text style={styles.sub}>Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Ingresar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: '70%',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#e2e0e0',
    gap: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    /* fontFamily: "Josefin", */
  },
  sub: {
    marginTop:20,
    fontSize: 14,
    /* fontFamily: "Josefin", */
    color:"#3a3a3a",
  },
  subLink: {
    fontSize: 16,
    /* fontFamily: "Josefin", */
    color:  "#24af63",
  },
});
