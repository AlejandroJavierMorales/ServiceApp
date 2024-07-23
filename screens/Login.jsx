import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { InputForm, SubmitButton } from "../components/shared";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../services/authService";
import { setUser } from "../fetures/User/UserSlice"; // Asegúrate de que este import esté correcto
import { useDB } from "../hooks/useDB";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [triggerSignIn, result] = useSignInMutation();

  const { insertSession } = useDB(); // traigo el metodo para insertarSession


  useEffect(() => {
    if (result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
      dispatch(
        setUser({
          email: result.data.email,
          idToken: result.data.idToken,
          localId: result.data.localId,
        })
      );
    } else if (result.isError) {
      alert("Error: No se pudo Iniciar Sesión");
    }
  }, [result]);

  const onSubmit = () => {
    triggerSignIn({ email, password, returnSecureToken: true });
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Inicio de Sesión</Text>
        <InputForm label={"email"} onChange={setEmail} error={""} />
        <InputForm
          label={"password"}
          onChange={setPassword}
          error={""}
          isSecure={true}
        />
        <SubmitButton onPress={onSubmit} title="Ingresar" />
        <Text style={styles.sub}>No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Regístrate aquí</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

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
    color: "#3a3a3a"
    /*     fontFamily: "Josefin", */
  },
  sub: {
    marginTop: 20,
    fontSize: 14,
    color: "#3a3a3a",
  },
  subLink: {
    fontSize: 16,
    color: "#24af63",
  },
});
