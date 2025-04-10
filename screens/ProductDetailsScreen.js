/*import React from "react";
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});

export default ProductDetailsScreen;

import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { StyleSheet } from "react-native";
export default (props) => {
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/y38o93jy.png",
            }}
            style={styles.icon}
          />
          <View style={styles.spacer} />
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/o6zp7ti3.png",
            }}
            style={styles.icon}
          />
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/kbjug1oc.png",
            }}
            style={styles.icon}
          />
        </View>

        <View style={styles.productImageContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/yq62fjnn.png",
            }}
            style={styles.productImage}
          />
          <View style={styles.dotIndicatorContainer}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/bz9177pp.png",
              }}
              style={styles.dotIndicator}
            />
          </View>
        </View>

     
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productName}>Rosegold Dropper Serum</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>TND 79.99</Text>
            <Text style={styles.productStock}>150 ml</Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/vyju2o3w.png",
            }}
            style={styles.starIcon}
          />
          <Text style={styles.ratingText}>4.9</Text>
        </View>

     
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.descriptionText}>
          Rose gold dropper serum is Extraordinary Oil Hair Serum gives luscious
          lightweight hair oil. serum for dry hair, lifeless hair.
        </Text>

    
        <Text style={styles.sectionTitle}>Shipping & Return</Text>

  
        <Text style={styles.sectionTitle}>Reviews</Text>


        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => alert("Pressed!")}
        >
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    borderRadius: 30,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 86,
    marginBottom: 34,
    marginHorizontal: 33,
  },
  icon: {
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  spacer: {
    flex: 1,
  },
  productImageContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 3,
    paddingBottom: 19,
    paddingLeft: 70,
    marginBottom: 25,
  },
  productImage: {
    borderRadius: 30,
    width: 300,
    height: 300,
  },
  dotIndicatorContainer: {
    alignItems: "flex-end",
  },
  dotIndicator: {
    borderRadius: 30,
    width: 67,
    height: 6,
  },
  productName: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 104,
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 51,
    marginLeft: 33,
  },
  productPrice: {
    color: "#FF86C1",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productStock: {
    color: "#383838",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 51,
    marginLeft: 33,
  },
  starIcon: {
    borderRadius: 30,
    width: 25,
    height: 25,
    marginRight: 12,
  },
  ratingText: {
    color: "#383838",
    fontSize: 16,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 33,
  },
  descriptionText: {
    color: "#383838",
    fontSize: 16,
    marginBottom: 32,
    marginHorizontal: 33,
  },
  buyNowButton: {
    alignItems: "center",
    backgroundColor: "#FF86C1",
    borderRadius: 10,
    paddingVertical: 17,
    marginBottom: 27,
    marginHorizontal: 33,
  },
  buyNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
*/
import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCart } from "../redux/slices/cartSlice"; // Adjust the path if needed

const { height } = Dimensions.get("window");

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(1);
  const cartItems = useSelector((state) => state.cart.items);

  const goBack = () => {
    navigation.goBack();
  };

  const addToCartHandler = () => {
    const productExists = cartItems.some((item) => item._id === product._id);
    const totalPrice = product.price * quantity;

    if (productExists) {
      // Update the existing product's quantity
      const updatedCartItems = cartItems.map((item) => {
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
            totalPrice: item.price * (item.quantity + quantity),
          };
        }
        return item;
      });

      dispatch(updateCart(updatedCartItems)); // Now updateCart is correctly imported and dispatched
      alert(
        `${product.name} quantity has been updated to ${
          quantity + product.quantity
        } in your cart!`
      );
    } else {
      // Add the product to the cart if it's not already there
      dispatch(addToCart({ ...product, quantity, totalPrice }));
      alert(`${product.name} has been added to your cart!`);
    }
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
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="chevron-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <View style={styles.spacer} />
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/y38o93jy.png",
          }}
          style={styles.icon}
        />
        <Image
          source={{
            uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/o6zp7ti3.png",
          }}
          style={styles.icon}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Product Image Section */}
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.dotIndicatorContainer}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/YFHo9u6paQ/bz9177pp.png",
              }}
              style={styles.dotIndicator}
            />
          </View>
        </View>

        {/* Product Details Section */}
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.productPrice}>TND {product.price}</Text>
            <Text style={styles.productStock}>In Stock: {product.stock}</Text>
          </View>
        </View>

        {/* Quantity Control Section */}
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

        {/* Total Price Section */}
        <Text style={styles.totalPrice}>
          Total Price: {totalPrice.toFixed(2)} TND
        </Text>

        {/* Product Description Section */}
        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>

        {/* Reviews Section */}
        <Text style={styles.sectionTitle}>Reviews</Text>
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

        {/* Buy Now Button */}
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={addToCartHandler}
        >
          <Text style={styles.buyNowButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContent: {
    flex: 1,
    backgroundColor: "#FBF7FF",
    borderRadius: 30,
  },
  headerContainer: {
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 34,
    marginHorizontal: 33,
    alignItems: "center",
  },
  backButton: {
    padding: 6,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 30,
  },
  icon: {
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  spacer: {
    flex: 1,
  },
  productImageContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 3,
    paddingBottom: 19,
    paddingLeft: 70,
    marginBottom: 25,
  },
  productImage: {
    borderRadius: 30,
    width: 300,
    height: 300,
  },
  dotIndicatorContainer: {
    alignItems: "flex-end",
  },
  dotIndicator: {
    borderRadius: 30,
    width: 67,
    height: 6,
  },
  productDetailsContainer: {
    marginLeft: 33,
    marginBottom: 20,
  },
  productName: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 104,
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 51,
    marginLeft: 33,
  },
  productPrice: {
    color: "#FF86C1",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productStock: {
    color: "#383838",
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginLeft: 33,
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
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 33,
  },
  descriptionText: {
    color: "#383838",
    fontSize: 16,
    marginBottom: 32,
    marginHorizontal: 33,
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
  buyNowButton: {
    alignItems: "center",
    backgroundColor: "#FF86C1",
    borderRadius: 10,
    paddingVertical: 17,
    marginBottom: 27,
    marginHorizontal: 33,
  },
  buyNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
