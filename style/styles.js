import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    padding: 10,
  },
  productImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 20,
    color: "gray",
  },
});
//Home
export const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#faf7fe",
  },
  categCard: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    height: 150,
    borderRadius: 20,
    backgroundColor: "#fc88c1",
  },
  productCard: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    height: 250,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  categImage: {},
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
    margin: 8,
  },
  categName: {},
  productName: {
    fontSize: 16,
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginLeft: 10,
    color: "#040303",
  },
  categPrice: {},
  productPrice: {
    color: "#fc94c7",
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  Popular: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
    color: "#040303",
  },
});
//Checkout
export const stylesCheckout = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, marginTop: 30 },
  item: { fontSize: 16, marginBottom: 8 },
  total: { fontSize: 18, fontWeight: "bold", marginTop: 16 },
});
