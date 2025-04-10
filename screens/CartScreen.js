import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useSelector } from "react-redux";

export default function CartScreen({ navigation }) {
  const { items, totalPrice } = useSelector((state) => state.cart);

  // Fallback pour totalPrice
  const validTotalPrice = typeof totalPrice === "number" ? totalPrice : 0;

  // Filtrer les éléments invalides
  const validItems = Array.isArray(items)
    ? items.filter((item) => item && item._id)
    : [];

  if (validItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
      </View>
    );
  }

  const handleCheckout = () => {
    // Navigate to the Checkout screen
    navigation.navigate("Checkout"); // Assuming you have a Checkout screen set up
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={validItems}
        keyExtractor={(item, index) => item?._id?.toString() || `item-${index}`}
        renderItem={({ item }) => {
          const itemTotalPrice = (item.price || 0) * (item.quantity || 0);

          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name || "Nom inconnu"}</Text>
              <Text style={styles.itemQuantity}>
                Quantité: {item.quantity || 0}
              </Text>
              <Text style={styles.itemPrice}>
                Prix unitaire: {(item.price || 0).toFixed(2)} TND
              </Text>
              <Text style={styles.itemTotalPrice}>
                Total: {itemTotalPrice.toFixed(2)} TND
              </Text>
            </View>
          );
        }}
      />

      {/* Afficher le prix total */}
      <Text style={styles.totalPrice}>
        Total Commande: {validTotalPrice.toFixed(2)} TND
      </Text>

      {/* Checkout Button */}
      <View style={styles.checkoutButtonContainer}>
        <Button title="Passer à la caisse" onPress={handleCheckout} />
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemQuantity: {
    fontSize: 16,
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "green",
    marginTop: 5,
  },
  itemTotalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  checkoutButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
