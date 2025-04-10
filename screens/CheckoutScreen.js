import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Linking,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import PaymentStatusScreen from "./PaymentStatusScreen"; // Assurez-vous que le chemin est correct

const CheckoutScreen = () => {
  const { items = [], totalPrice = 0 } = useSelector(
    (state) => state.cart || {}
  );
  const { userInfo, isLoggedIn } = useSelector((state) => state.user || {});
  const navigation = useNavigation();
  const [paymentLink, setPaymentLink] = useState("");

  const pay = Number(totalPrice || 0) * 1000;

  // Formulaire d'adresse utilisateur
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const handlePayment = async () => {
    if (!address || !city || !postalCode || !country) {
      Alert.alert("Erreur", "Veuillez remplir toutes les coordonnées.");
      return;
    }

    if (isNaN(pay) || pay <= 0) {
      Alert.alert("Erreur", "Le montant du paiement est invalide.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/flouci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: pay,
          accept_card: true,
          success_link: "https://votre-site.com/success",
          fail_link: "https://votre-site.com/fail",
          session_timeout_secs: 1200,
          developer_tracking_id: "order12345",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Erreur backend: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.result && data.result.success) {
        const link = data.result.link;
        const paymentId = data.result.payment_id;

        if (!paymentId) {
          throw new Error("L'ID du paiement n'a pas été fourni");
        }

        setPaymentLink(link);
        await Linking.openURL(link);

        navigation.navigate("PaymentStatusScreen", { paymentId });
      } else {
        throw new Error("Échec de la génération du lien de paiement");
      }
    } catch (error) {
      console.error("Erreur :", error.message);
      Alert.alert("Erreur", error.message);
    }
  };

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Récapitulatif de la commande</Text>
        <Text style={styles.message}>
          Vous devez être connecté pour passer la commande.
        </Text>
        <Button
          title="Se connecter"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Récapitulatif de la commande</Text>

      {items.length > 0 ? (
        items.map((item) => (
          <View key={item.id || item._id} style={styles.itemContainer}>
            <Text>
              {item.name} - Quantité: {item.quantity || 1}
            </Text>
            <Text>
              Prix: {((item.price || 0) * (item.quantity || 1)).toFixed(2)} TND
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.message}>Votre panier est vide.</Text>
      )}

      <Text style={styles.totalPrice}>
        Total: {Number(totalPrice || 0).toFixed(2)} TND
      </Text>

      {/* Coordonnées de livraison */}
      <Text style={styles.sectionTitle}>Adresse de livraison</Text>
      <TextInput
        placeholder="Adresse"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Ville"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        placeholder="Code postal"
        style={styles.input}
        keyboardType="numeric"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <TextInput
        placeholder="Pays"
        style={styles.input}
        value={country}
        onChangeText={setCountry}
      />

      <Text style={styles.sectionTitle}>Méthode de paiement</Text>
      <Button title="Payer avec Flouci" onPress={handlePayment} />

      {paymentLink && (
        <Text style={{ marginTop: 20 }}>Rediriger vers : {paymentLink}</Text>
      )}

      <Button
        title="Payer avec D17"
        onPress={() => Alert.alert("Info", "Paiement D17 non disponible")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "red",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});

export default CheckoutScreen;
