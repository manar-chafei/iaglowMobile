import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const products = [
  {
    id: "1",
    name: "Crème hydratante",
    image: "https://via.placeholder.com/150",
    price: "25 TND",
  },
  {
    id: "2",
    name: "Shampoing doux",
    image: "https://via.placeholder.com/150",
    price: "15 TND",
  },
  {
    id: "3",
    name: "Sérum anti-chute",
    image: "https://via.placeholder.com/150",
    price: "40 TND",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProductDetails", { product: item })
            }
            style={styles.productCard}
          >
            <Animated.Image
              source={{ uri: item.image }}
              style={styles.productImage}
              sharedTransitionTag={`product-${item.id}`} // Unique tag
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  productCard: {
    marginBottom: 20,
    alignItems: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  productName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "gray",
  },
});
