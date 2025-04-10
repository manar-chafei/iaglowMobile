import axios from "axios";

// Remplacez cette URL par l'URL de votre API
const axiosInstance = axios.create({
  baseURL: "http://20.50.1.252:5000", // URL de l'API Flouci
});

export const createPaymentLink = async (data) => {
  try {
    const response = await axiosInstance.post("/api/payment/flouci", data);
    console.log("Réponse de l'API:", response.data); // Afficher la réponse complète
    return response.data;
  } catch (error) {
    if (error.response) {
      // Afficher la réponse d'erreur
      console.error("Erreur de réponse:", error.response.data);
      throw new Error(
        error.response.data.message || "Erreur lors du traitement du paiement"
      );
    } else if (error.request) {
      console.error("Erreur de requête:", error.request);
      throw new Error("Problème de réseau, impossible de joindre le serveur.");
    } else {
      console.error("Erreur inconnue:", error.message);
      throw new Error("Une erreur inconnue est survenue.");
    }
  }
};
