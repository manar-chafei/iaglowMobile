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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getTokenFromStorage } from "../utils/tokenUtils";
export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState(null); // Tracks the selected category name
  const [filteredProducts, setFilteredProducts] = useState([]);
  const user = useSelector((state) => state.user.userInfo);
  // Fetch products on component mount
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const fetchedToken = await getTokenFromStorage(); // Fetch token from AsyncStorage
        setToken(fetchedToken); // Update the state
      } catch (error) {
        console.error("Erreur lors de la récupération du token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/products"
        );
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Initially, all products are displayed
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on search text
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

  // Filter products based on the selected category
  useEffect(() => {
    if (activeCategory) {
      // Filter products by the selected category name
      const categoryFilteredProducts = products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === activeCategory.toLowerCase()
      );
      setFilteredProducts(categoryFilteredProducts);
    } else {
      // Reset to all products if no category is selected
      setFilteredProducts(products);
    }
  }, [activeCategory, products]);

  const categories = [
    {
      id: "1",
      name: "Serum",
      icon: require("../assets/1.png"),
      activeIcon: require("../assets/11.png"),
    },
    {
      id: "2",
      name: "Cosmetics",
      icon: require("../assets/2.png"),
      activeIcon: require("../assets/22.png"),
    },
    {
      id: "3",
      name: "Body Soap",
      icon: require("../assets/3.png"),
      activeIcon: require("../assets/33.png"),
    },
    {
      id: "4",
      name: "Hair Care",
      icon: require("../assets/pro.png"),
      activeIcon: require("../assets/pro.png"),
    },
  ];

  const offers = [
    {
      id: "1",
      title: "Buy 1 Get 1 For Free",
      image: require("../assets/pro.png"),
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF86C1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {user ? (
          <Text style={styles.greeting}>Hello, {user.name}!</Text>
        ) : (
          <Text style={styles.greeting}>Welcome to Ia Glow!</Text>
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* User Name */}
      <Text style={styles.userName}>User Name</Text>

      {/* Categories */}
      <FlatList
        style={styles.catList}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryCard
            item={item}
            isActive={activeCategory === item.name}
            onPress={() =>
              setActiveCategory(activeCategory === item.name ? null : item.name)
            }
          />
        )}
      />

      {/* Popular Section or Category Filtered Products */}
      <View style={styles.popularSection}>
        <Text style={styles.sectionTitle}>
          {activeCategory ? activeCategory : "Popular"}
        </Text>
        <TouchableOpacity
          style={styles.seeAllButton}
          onPress={() => navigation.navigate("ProductList")}
        >
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatList}
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
            <Text style={styles.productPrice}>{item.price} TND</Text>
          </TouchableOpacity>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      {/* Offers Section (Hidden when a category is selected) */}
      {!activeCategory && (
        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>Offers</Text>
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </View>
      )}

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarItem}>
          <Image
            source={require("../assets/pro.png")}
            style={styles.navBarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem}>
          <Image
            source={require("../assets/pro.png")}
            style={styles.navBarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem}>
          <Image
            source={require("../assets/pro.png")}
            style={styles.navBarIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarItem}>
          <Image
            source={require("../assets/pro.png")}
            style={styles.navBarIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Category Card Component
const CategoryCard = ({ item, isActive, onPress }) => {
  const scale = useSharedValue(isActive ? 1.2 : 1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  }, [isActive]); // Add dependency array

  React.useEffect(() => {
    scale.value = isActive ? 1.2 : 1;
  }, [isActive]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View
        style={
          isActive
            ? [styles.categoryCardact, animatedStyle]
            : [styles.categoryCard, animatedStyle]
        }
      >
        <Image
          source={isActive ? item.activeIcon : item.icon}
          style={styles.categoryIcon}
        />
        <Text style={[styles.categoryName, isActive && styles.categoryActive]}>
          {item.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Offer Card Component
const OfferCard = ({ offer }) => {
  return (
    <View style={styles.offerCard}>
      <Image source={offer.image} style={styles.offerImage} />
      <Text style={styles.offerTitle}>{offer.title}</Text>
    </View>
  );
};

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  searchInput: {
    width: 300,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  categoryCardact: {
    width: 100,
    height: 100,
    backgroundColor: "#FF86C1",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryActive: {
    fontWeight: "bold",
    color: "#fff",
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  popularSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllButton: {
    backgroundColor: "#ff69b4",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  productCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginRight: 16,
    padding: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  offersSection: {
    marginTop: 16,
  },
  offerCard: {
    backgroundColor: "#ff69b4",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  offerImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    marginRight: 16,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingVertical: 8,
  },
  navBarItem: {
    flex: 1,
    alignItems: "center",
  },
  navBarIcon: {
    width: 24,
    height: 24,
    tintColor: "#333",
  },
  flatList: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
  catList: {
    paddingTop: 20,
  },
});
