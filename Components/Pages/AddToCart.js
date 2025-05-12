import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons

const AddToCart = ({route, navigation}) => {
  const {cartItems} = route.params;
  const [cart, setCart] = useState(cartItems || []);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const GST_RATE = 0.18; // 18% GST

  // Calculate GST and total price
  const gstAmount = totalPrice * GST_RATE;
  const finalTotal = totalPrice + gstAmount;

  // Animation for button press
  const animatedValue = new Animated.Value(1);

  useEffect(() => {
    const initialQuantities = {};
    let total = 0;
    cart.forEach(item => {
      initialQuantities[item.id] = item.quantity || 1;
      total += item.price * (item.quantity || 1);
    });
    setQuantities(initialQuantities);
    setTotalPrice(total);
  }, [cart]);

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }
    const updatedQuantities = {...quantities, [itemId]: newQuantity};
    setQuantities(updatedQuantities);

    // Update total price
    const item = cart.find(item => item.id === itemId);
    const newTotalPrice =
      totalPrice -
      item.price * (quantities[itemId] || 1) +
      item.price * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  const removeItem = itemId => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);

    // Update total price
    const item = cart.find(item => item.id === itemId);
    const newTotalPrice = totalPrice - item.price * (quantities[itemId] || 1);
    setTotalPrice(newTotalPrice);

    // Check if the cart is empty after removing the item
    if (updatedCart.length === 0) {
      navigation.navigate('HomePage'); // Navigate to the home page
    }
  };

  const animateButton = () => {
    Animated.timing(animatedValue, {
      toValue: 0.9,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              updateQuantity(item.id, (quantities[item.id] || 1) - 1);
              animateButton();
            }}
            style={styles.quantityButton}>
            <Icon name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantities[item.id] || 1}</Text>
          <TouchableOpacity
            onPress={() => {
              updateQuantity(item.id, (quantities[item.id] || 1) + 1);
              animateButton();
            }}
            style={styles.quantityButton}>
            <Icon name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeItem(item.id)}
        style={styles.removeButton}>
        <Icon name="delete" size={24} color="#E64848" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Cart</Text>
      </View>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addMoreContainer}
            onPress={() => navigation.navigate('HomePage')}>
            <Icon name="add-shopping-cart" size={24} color="#2A9D8F" />
            <Text style={styles.addMoreText}>Add More Items</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.totalContainer}>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Subtotal:</Text>
          <Text style={styles.priceValue}>₹{totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>GST (18%):</Text>
          <Text style={styles.priceValue}>₹{gstAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate('Checkout', {
              totalAmount: totalPrice,
              gstAmount: gstAmount,
              finalTotal: finalTotal,
            })
          }>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2A9D8F',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#2A9D8F',
    padding: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    padding: 10,
  },
  addMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2A9D8F',
  },
  addMoreText: {
    fontSize: 16,
    color: '#2A9D8F',
    marginLeft: 10,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 16,
    color: '#888',
  },
  priceValue: {
    fontSize: 16,
    color: '#333',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  checkoutButton: {
    backgroundColor: '#2A9D8F',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCart;
