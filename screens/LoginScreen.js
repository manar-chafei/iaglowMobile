import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slices/userSlice"; // Ensure correct import path

import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Après la connexion réussie, sauvegardez le token JWT
  const handleLogin = async () => {
    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        dispatch(loginUser(data)); // Dispatch the login action with user data
        navigation.replace("Main"); // Navigate to the main screen after successful login
      } else {
        Alert.alert(
          "Erreur de connexion",
          data.message || "Connexion échouée."
        );
      }
    } catch (error) {
      console.error("Erreur pendant la connexion:", error);
      Alert.alert("Erreur", "Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleNavigateToRegister = () => {
    // Navigate to the Register screen if the user isn't registered
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Pas encore de compte ?</Text>
        <Button title="S'inscrire" onPress={handleNavigateToRegister} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginScreen;
