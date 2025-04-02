import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { addToCart } from "../redux/slices/cartSlice";

const { height } = Dimensions.get("window");

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const goBack = () => {
    navigation.goBack();
  };

  const addToCartHandler = () => {
    const productExists = cartItems.some((item) => item.id === product.id);
    const totalPrice = product.price * quantity;

    if (!productExists) {
      dispatch(addToCart({ ...product, quantity, totalPrice }));
      alert(`${product.name} has been added to your cart!`);
    } else {
      alert(`${product.name} is already in your cart!`);
    }
  };

  const goToCheckout = () => {
    navigation.navigate("Checkout");
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (text) => {
    let value = parseInt(text);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > product.stock) {
      value = product.stock;
    }
    setQuantity(value);
  };

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Ionicons name="chevron-back-outline" size={25} color="black" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        style={styles.scrollView}
      >
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productStock}>In Stock: {product.stock}</Text>
        <Text style={styles.totalPrice}>
          Total Price: {totalPrice.toFixed(2)} TND
        </Text>

        {product.options && (
          <View style={styles.productOptions}>
            {product.options.map((option, index) => (
              <Text key={index} style={styles.optionText}>
                {option}
              </Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={goToCheckout} style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
        </TouchableOpacity>

        <View style={styles.reviewsSection}>
          <Text style={styles.reviewsTitle}>Customer Reviews</Text>
          {product.reviews && product.reviews.length > 0 ? (
            <FlatList
              data={product.reviews}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.reviewItem}>
                  <Text style={styles.reviewName}>{item.name}</Text>
                  <Text style={styles.reviewText}>{item.text}</Text>
                  <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
                </View>
              )}
            />
          ) : (
            <Text>No reviews yet.</Text>
          )}
        </View>

        <View style={styles.relatedProducts}>
          <Text style={styles.relatedTitle}>You May Also Like</Text>
          {/* Add similar products here */}
        </View>
      </ScrollView>

      <View style={styles.containerbtn}>
        <View style={styles.containerQuantity}>
          <Text style={styles.productPrice}>{product.price} TND</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={decrementQuantity}
            >
              <Text style={styles.arrowText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={incrementQuantity}
            >
              <Text style={styles.arrowText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={addToCartHandler} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.6,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  contentContainer: {
    padding: 20,
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 65,
  },
  scrollView: {
    marginTop: height * 0.5,
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 45,
  },

  backButton: {
    position: "absolute",
    padding: 6,
    left: 20,
    top: 40,
    zIndex: 999,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fc94c7",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderWidth: 1,
    borderColor: "#fc94c7",
    borderRadius: 10,
    elevation: 2, // Add shadow for elevation
  },
  productDescription: {
    fontSize: 16,
    textAlign: "left",
    marginVertical: 10,
    color: "#555",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  quantityInput: {
    width: 60,
    height: 40,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#040303",
    borderRadius: 5,
    fontSize: 18,
    marginHorizontal: 10,
    backgroundColor: "#fff",
  },
  arrowButton: {
    width: 40,
    height: 40,
    backgroundColor: "#040303",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  arrowText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f9f5fa",
  },
  productStock: {
    fontSize: 16,
    marginTop: 10,
    color: "#888",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#4CAF50",
  },
  addButton: {
    backgroundColor: "#fc94c7",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%", // Full width for the button
    elevation: 3, // Add shadow for elevation
  },
  containerQuantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Space between price and quantity controls
    width: "100%", // Full width
    marginBottom: 10, // Space below the quantity controls
  },
  containerbtn: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 20, // Keep it above the bottom of the screen
    alignItems: "center", // Center the buttons horizontally
    flexDirection: "column", // Use column layout for buttons
    paddingHorizontal: 20, // Add some horizontal padding
  },
  addButtonText: {
    color: "#f9f5fa",
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    elevation: 2,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  reviewsSection: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 10,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  reviewItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#040303",
    borderRadius: 5,
    elevation: 2,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewText: {
    fontSize: 14,
    marginTop: 5,
    color: "#555",
  },
  reviewRating: {
    fontSize: 14,
    marginTop: 5,
    color: "#888",
  },
  relatedProducts: {
    marginTop: 30,
    width: "100%",
    paddingHorizontal: 10,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
});

export default ProductDetailsScreen;
