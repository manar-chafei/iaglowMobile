import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/products"
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initialement, tous les produits sont affichés
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.name.toLowerCase().includes(searchText.toLowerCase()) ||
            (product.category &&
              product.category.toLowerCase().includes(searchText.toLowerCase()))
        )
      );
    }
  }, [searchText, products]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF86C1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barre de recherche */}
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Liste des produits */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            style={styles.productCard}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>{item.price} TND</Text>
          </TouchableOpacity>
        )}
        numColumns={2} // Affichage en grille (2 colonnes)
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  productCategory: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
