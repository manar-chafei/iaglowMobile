import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";

const CheckoutScreen = () => {
  const [paymentLink, setPaymentLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // 1. Vérification de la connexion internet
      const isConnected = await checkInternetConnection();
      if (!isConnected) {
        Alert.alert("Erreur", "Pas de connexion internet");
        return;
      }

      // 2. Appel à l'API backend
      const response = await fetch("http://localhost:5000/api/flouci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 50.0, // Montant plus clair (en TND)
          accept_card: true,
          success_link: "flouciapp://payment/success", // Utilisation de deep linking
          fail_link: "flouciapp://payment/fail",
          session_timeout_secs: 1200,
          developer_tracking_id: `order_${Date.now()}`, // ID unique
        }),
      });

      // 3. Gestion des erreurs HTTP
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur serveur");
      }

      const data = await response.json();

      // 4. Validation de la réponse
      if (!data.success || !data.result?.link) {
        throw new Error("Lien de paiement non reçu");
      }

      // 5. Ouverture du lien de paiement
      const canOpen = await Linking.canOpenURL(data.result.link);
      if (!canOpen) {
        throw new Error("Impossible d'ouvrir l'application Flouci");
      }

      await Linking.openURL(data.result.link);
      setPaymentLink(data.result.link);
    } catch (error) {
      console.error("Erreur paiement:", error);
      Alert.alert("Erreur", error.message || "Erreur lors du paiement");
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de vérification de connexion (simplifiée)
  const checkInternetConnection = async () => {
    try {
      const response = await fetch("https://www.google.com", {
        method: "HEAD",
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      {isLoading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Préparation du paiement...</Text>
        </View>
      ) : (
        <>
          <Button
            title="Payer avec Flouci"
            onPress={handlePayment}
            disabled={isLoading}
          />

          {paymentLink && (
            <Text style={{ marginTop: 20, textAlign: "center" }}>
              Redirection vers Flouci...
            </Text>
          )}
        </>
      )}
    </View>
  );
};

export default CheckoutScreen;
