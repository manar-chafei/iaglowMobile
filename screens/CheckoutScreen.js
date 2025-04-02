import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { stylesCheckout } from "../style/styles";

import { Ionicons } from "@expo/vector-icons";

export default function CheckoutScreen({ navigation }) {
  // Récupérer les éléments du panier et l'état d'authentification depuis Redux
  const cart = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Calculer le total de la commande
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      Alert.alert(
        "Connexion requise",
        "Vous devez être connecté pour passer une commande.",
        [
          {
            text: "Annuler",
            style: "cancel",
          },
          {
            text: "Se connecter",
            onPress: () => navigation.navigate("Login"), // Redirection vers l'écran de connexion
          },
        ]
      );
      return;
    }

    // Simuler l'envoi de la commande au backend
    Alert.alert("Succès", "Commande passée avec succès!");
    navigation.navigate("Home");
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={stylesCheckout.container}>
      {/* Bouton Retour */}
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={stylesCheckout.title}>Récapitulatif de la commande</Text>

      {/* Contenu du panier */}
      {cart.length === 0 ? (
        <Text style={stylesCheckout.item}>Votre panier est vide</Text>
      ) : (
        cart.map((item, index) => (
          <View key={index} style={stylesCheckout.item}>
            <Text>
              {item.name} - {item.quantity} x {item.price} TND
            </Text>
            <Text>Total: {(item.price * item.quantity).toFixed(2)} TND</Text>
          </View>
        ))
      )}

      {/* Total */}
      <Text style={stylesCheckout.total}>Total: {total.toFixed(2)} TND</Text>

      {/* Bouton Passer la commande */}
      <Button title="Passer la commande" onPress={handleCheckout} />
    </View>
  );
}

// Styles supplémentaires
const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 20,
    top: 20,
  },
});
