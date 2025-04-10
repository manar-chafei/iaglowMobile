import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/slices/userSlice"; // Ensure the import path is correct

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Added a 'name' field for the user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    // Make the API call to register the user
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, // Include name in the registration body
          email,
          password,
          isAdmin: false, // Ensure this is set to false for normal users
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming the response returns user data upon successful registration
        dispatch(registerUser(data)); // Dispatch the user data to the Redux store

        // Navigate to CheckoutScreen after successful registration
        navigation.navigate("Checkout");
      } else {
        // Handle registration failure
        alert(data.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={name}
        onChangeText={setName}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
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
});

export default RegisterScreen;
