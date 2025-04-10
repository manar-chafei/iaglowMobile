import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import Config from "react-native-config";

// Fonction pour vérifier le statut du paiement
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await fetch(
      `https://developers.flouci.com/api/verify_payment/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apppublic: Config.APP_PUBLIC_KEY, // Utilisation des variables d'environnement via react-native-config
          appsecret: Config.APP_SECRET_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Erreur lors de la vérification du paiement. Statut: ${response.status}`
      );
    }

    const data = await response.json();
    return { success: true, message: data.result.status };
  } catch (error) {
    console.error("Erreur lors de la vérification du statut:", error.message);
    return { success: false, message: error.message };
  }
};

// Composant PaymentStatusScreen
const PaymentStatusScreen = ({ route }) => {
  const { paymentId } = route.params; // Récupérer l'ID du paiement depuis les paramètres de navigation
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      try {
        if (!paymentId) {
          throw new Error("Aucun ID de commande fourni");
        }

        const result = await checkPaymentStatus(paymentId);
        setStatus(result.message || "Statut inconnu");
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du statut:",
          error.message
        );
        setStatus("Erreur lors de la vérification du statut");
        Alert.alert("Erreur", error.message);
      } finally {
        setLoading(false); // Arrêter le chargement
      }
    };

    verifyPaymentStatus();
  }, [paymentId]);

  return (
    <View style={{ padding: 20 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Status du paiement : {status}</Text>
      )}
    </View>
  );
};

export default PaymentStatusScreen;
