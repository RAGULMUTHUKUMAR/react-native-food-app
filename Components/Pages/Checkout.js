import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Checkout = ({navigation, route}) => {
  const [user, setUser] = useState({
    name: 'RAGUL M',
    email: 'ragul.doe@example.com',
    phone: '+1 123 456 7890',
    address: '123 Main St, New York, NY 10001',
  });

  const {totalAmount = 0, gstAmount = 0, finalTotal = 0} = route.params || {};

  // Animation for the payment button
  const buttonScale = new Animated.Value(1);

  const handlePayment = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start(() => {
      ToastAndroid.show('Payment Successful!', ToastAndroid.SHORT);
      navigation.navigate('HomePage'); // Navigate to home or confirmation screen
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Checkout</Text>

      {/* Billing Details Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Billing Details</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="person" size={20} color="#2A9D8F" />
            <Text style={styles.info}>{user.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#2A9D8F" />
            <Text style={styles.info}>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="phone" size={20} color="#2A9D8F" />
            <Text style={styles.info}>{user.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="location-on" size={20} color="#2A9D8F" />
            <Text style={styles.info}>{user.address}</Text>
          </View>
        </View>
      </View>

      {/* Order Summary Card */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal:</Text>
          <Text style={styles.value}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>GST (18%):</Text>
          <Text style={styles.value}>₹{gstAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>₹{finalTotal.toFixed(2)}</Text>
        </View>
      </View>

      {/* Payment Button with Animation */}
      <Animated.View style={{transform: [{scale: buttonScale}]}}>
        <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
          <Icon name="payment" size={24} color="#fff" />
          <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2A9D8F',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
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
    color: '#E64848',
  },
  divider: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A9D8F',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Checkout;
