import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const CartScreen = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);

  // Vérifier si le panier est vide
  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyCartText}>Votre panier est vide</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Calculer le prix total de chaque produit
          const itemTotalPrice = item.price * item.quantity;

          return (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantité: {item.quantity}</Text>
              <Text style={styles.itemPrice}>
                Prix unitaire: {item.price} TND
              </Text>
              <Text style={styles.itemTotalPrice}>
                Total: {itemTotalPrice.toFixed(2)} TND
              </Text>
            </View>
          );
        }}
      />
      <Text style={styles.totalPrice}>
        Total Commande: {totalPrice.toFixed(2)} TND
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
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
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 18,
    color: "green",
  },
  itemTotalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
});

export default CartScreen;
