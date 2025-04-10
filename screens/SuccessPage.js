import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const SuccessPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Paiement réussi</Text>
      <Text style={styles.message}>Merci pour votre paiement !</Text>
      <Button
        title="Retour à l'accueil"
        onPress={() => navigation.navigate("Home")} // Navigue vers l'écran d'accueil
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SuccessPage;
