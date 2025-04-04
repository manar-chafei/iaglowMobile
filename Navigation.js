import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import { View, Image, StyleSheet, Animated, Easing } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * SplashScreen avec animation
 */
function SplashScreen({ navigation }) {
  const logoScale = new Animated.Value(0); // Animation du logo
  const circle1Animation = new Animated.ValueXY({ x: 0, y: 0 }); // Animation du premier cercle
  const circle2Animation = new Animated.ValueXY({ x: 0, y: 0 }); // Animation du deuxième cercle

  useEffect(() => {
    // Animation du logo
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 1500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    // Animation des cercles
    const animateCircles = () => {
      Animated.loop(
        Animated.parallel([
          // Premier cercle (rose)
          Animated.sequence([
            Animated.timing(circle1Animation, {
              toValue: { x: -78, y: -40 }, // Déplacement vers le haut et à gauche
              duration: 1000,
              easing: Easing.bezier(0, 0, 0.8, 1),
              useNativeDriver: true,
            }),
            Animated.timing(circle1Animation, {
              toValue: { x: -150, y: -100 }, // Déplacement plus loin
              duration: 1000,
              easing: Easing.bezier(0.8, 0, 1, 1),
              useNativeDriver: true,
            }),
            Animated.timing(circle1Animation, {
              toValue: { x: 0, y: 0 }, // Retour à la position initiale
              duration: 1000,
              easing: Easing.bezier(0, 0, 0.2, 1),
              useNativeDriver: true,
            }),
          ]),
          // Deuxième cercle (violet)
          Animated.sequence([
            Animated.timing(circle2Animation, {
              toValue: { x: 78, y: 40 }, // Déplacement vers le bas et à droite
              duration: 1000,
              easing: Easing.bezier(0, 0, 0.8, 1),
              useNativeDriver: true,
            }),
            Animated.timing(circle2Animation, {
              toValue: { x: 150, y: 100 }, // Déplacement plus loin
              duration: 1000,
              easing: Easing.bezier(0.8, 0, 1, 1),
              useNativeDriver: true,
            }),
            Animated.timing(circle2Animation, {
              toValue: { x: 0, y: 0 }, // Retour à la position initiale
              duration: 1000,
              easing: Easing.bezier(0, 0, 0.2, 1),
              useNativeDriver: true,
            }),
          ]),
        ])
      ).start();
    };

    animateCircles();

    // Naviguer vers l'écran principal après 2 secondes
    const timer = setTimeout(() => {
      navigation.navigate("Main");
    }, 2000);

    return () => clearTimeout(timer); // Nettoyer le timer lors du démontage
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      {/* Cercle rose */}
      <Animated.View
        style={[
          styles.circle,
          styles.pinkCircle,
          {
            transform: [
              { translateX: circle1Animation.x },
              { translateY: circle1Animation.y },
            ],
          },
        ]}
      />
      {/* Cercle violet */}
      <Animated.View
        style={[
          styles.circle,
          styles.purpleCircle,
          {
            transform: [
              { translateX: circle2Animation.x },
              { translateY: circle2Animation.y },
            ],
          },
        ]}
      />
      {/* Logo animé */}
      <Animated.Image
        source={require("./assets/pro.png")} // Remplacez par le chemin de votre logo
        style={[
          styles.logo,
          {
            transform: [
              {
                scale: logoScale, // Appliquer l'animation d'échelle
              },
            ],
          },
        ]}
      />
    </View>
  );
}

/**
 * Bottom Tabs Navigator (Barre de navigation inférieure)
 */
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: "#fc94c7",
        tabBarInactiveTintColor: "#040303",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#faf7fe", borderColor: "#faf7fe" },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Checkout" component={CheckoutScreen} />
    </Tab.Navigator>
  );
}

/**
 * Main Stack Navigator (Gère les écrans en dehors des Bottom Tabs)
 */
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* Splash Screen */}
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      {/* Bottom Tabs */}
      <Stack.Screen
        name="Main"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      {/* Détails du produit */}
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * Main Navigation Container
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

// Styles pour la splash screen
const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Couleur de fond
  },
  circle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  pinkCircle: {
    backgroundColor: "rgb(249, 196, 216)", // Rose transparent
  },
  purpleCircle: {
    backgroundColor: "rgb(	220,222	,251)", // Violet transparent
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
});

/**
 * Fonction pour gérer les icônes des onglets
 */
const getTabBarIcon = (route, focused, color, size) => {
  const icons = {
    Home: "planet",
    Cart: "bag-handle",
    Checkout: "person",
  };

  const iconName = icons[route.name]
    ? focused
      ? icons[route.name]
      : `${icons[route.name]}-outline`
    : "help-circle-outline"; // Icône par défaut en cas d'erreur

  return <Ionicons name={iconName} size={size} color={color} />;
};
