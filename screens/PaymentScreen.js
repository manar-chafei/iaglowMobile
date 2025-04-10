import React, { useState } from "react";
import { View, Button, Text, Linking, Alert } from "react-native";

const CheckoutScreen = () => {
  const [paymentLink, setPaymentLink] = useState("");

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/flouci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 5000,
          accept_card: true,
          success_link: "flouciapp://payment/success",
          fail_link: "flouciapp://payment/fail",
          session_timeout_secs: 1200,
          developer_tracking_id: "order12345",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur du backend:", errorData);
        Alert.alert(
          "Erreur",
          `Le serveur a renvoyé une erreur: ${errorData.error}`
        );
        return;
      }

      const data = await response.json();
      console.log("Réponse reçue du backend:", data);

      if (data.success) {
        const link = data.result.link;
        setPaymentLink(link);
        Linking.openURL(link).catch((err) => {
          console.error("Erreur de redirection:", err);
          Alert.alert("Erreur", "Impossible d'ouvrir le lien de paiement.");
        });
      } else {
        console.error("Erreur Flouci:", data);
        Alert.alert("Erreur", "La génération du lien de paiement a échoué.");
      }
    } catch (error) {
      console.error("Erreur réseau ou autre:", error.message);
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la communication avec le serveur."
      );
    }
  };
  return (
    <View style={{ padding: 20 }}>
      <Button title="Payer avec Flouci" onPress={handlePayment} />
      {paymentLink && (
        <Text style={{ marginTop: 20 }}>Rediriger vers : {paymentLink}</Text>
      )}
    </View>
  );
};

export default CheckoutScreen;
