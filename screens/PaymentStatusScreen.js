import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import Config from "react-native-config";

const checkInternetConnection = async () => {
  try {
    const response = await fetch("https://www.google.com", {
      method: "HEAD",
      timeout: 5000,
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const checkPaymentStatus = async (orderId) => {
  try {
    const isConnected = await checkInternetConnection();
    if (!isConnected) {
      throw new Error("Vérifiez votre connexion internet");
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(
      `https://developers.flouci.com/api/verify_payment/${orderId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apppublic: Config.APP_PUBLIC_KEY,
          appsecret: Config.APP_SECRET_KEY,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Erreur serveur: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      status: data.result?.status || "UNKNOWN",
      data,
    };
  } catch (error) {
    let errorMessage = "Erreur réseau";
    if (error.name === "AbortError") {
      errorMessage = "La requête a expiré (10s)";
    }
    return {
      success: false,
      status: "ERROR",
      message: errorMessage,
    };
  }
};

const PaymentStatusScreen = ({ route }) => {
  const { paymentId } = route.params;
  const [status, setStatus] = useState({
    text: "Chargement...",
    color: "#999",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const verifyPayment = async () => {
      try {
        if (!paymentId) {
          throw new Error("ID de paiement manquant");
        }

        const result = await checkPaymentStatus(paymentId);
        if (!isMounted) return;

        const statusMap = {
          SUCCESS: { text: "Paiement réussi", color: "#4CAF50" },
          FAILED: { text: "Paiement échoué", color: "#F44336" },
          PENDING: { text: "En attente", color: "#FFC107" },
          UNKNOWN: { text: "Statut inconnu", color: "#9E9E9E" },
          ERROR: { text: result.message || "Erreur", color: "#F44336" },
          NETWORK_ERROR: { text: "Problème de connexion", color: "#F44336" },
        };

        setStatus(statusMap[result.status] || statusMap["UNKNOWN"]);
      } catch (error) {
        if (isMounted) {
          setStatus({ text: error.message, color: "#F44336" });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [paymentId]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Vérification en cours...</Text>
        </>
      ) : (
        <>
          <Text style={styles.statusLabel}>Statut du paiement :</Text>
          <Text style={[styles.statusText, { color: status.color }]}>
            {status.text}
          </Text>
        </>
      )}
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
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  statusLabel: {
    fontSize: 18,
    marginBottom: 8,
  },
  statusText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default PaymentStatusScreen;
