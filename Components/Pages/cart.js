import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import popularDishes from '../Data/FilterData';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Cart = ({route, navigation}) => {
  const {item, quantity: initialQuantity, liked} = route.params;
  const [quantity, setQuantity] = useState(initialQuantity);
  const totalPrice = (item.price * quantity).toFixed(2);

  const INITIAL_ITEMS = 4;
  const [itemsToShow, setItemsToShow] = useState(INITIAL_ITEMS);
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const handleItems = type => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItemsToShow(prev => (type === 'more' ? prev + 4 : INITIAL_ITEMS));
  };

  const handleQuantity = type => {
    setQuantity(prev => (type === 'add' ? prev + 1 : Math.max(1, prev - 1)));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Your Cart</Text>
          <View style={{width: 24}} />
        </View>
        {/* Restaurant Info */}
        <View style={styles.restaurantCard}>
          <Image
            source={require('../../Assets/Images/AppIcon.jpeg')}
            style={styles.restaurantLogo}
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>Tasty Bites</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>4.5 (1k+ ratings)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Icon name="info" size={24} color="#10B982" />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantity('remove')}>
                <Icon name="remove" size={20} color="#10B982" />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantity('add')}>
                <Icon name="add" size={20} color="#10B982" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Coupon Section */}
        <TouchableOpacity
          style={styles.promoCard}
          onPress={() => navigation.navigate('CouponsPage')}>
          <View style={styles.promoContent}>
            {/* Left-side Coupon Icon */}
            <Entypo
              name="price-tag"
              size={22}
              color="#E64848"
              style={styles.icon}
            />

            {/* Text Section */}
            <View style={styles.textContainer}>
              <Text style={styles.promoTitle}>Apply Coupon</Text>
              <Text style={styles.promoText}>
                Save more with coupons available for you
              </Text>
            </View>

            {/* Right-Side Navigation Arrow */}
            <Icon name="arrow-forward-ios" size={15} color="#2A9D8F" />
          </View>
        </TouchableOpacity>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Subtotal</Text>
            <Text style={styles.summaryText}>${totalPrice}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Shipping</Text>
            <Text style={styles.summaryText}>Free</Text>
          </View>

          <View style={[styles.summaryRow, {marginTop: 15}]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalPrice}>${totalPrice}</Text>
          </View>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Delivery Instructions</Text>
          <TextInput
            style={styles.instructionsInput}
            placeholder="E.g. Leave at door, Don't ring bell"
            placeholderTextColor="#DADADA"
            multiline
            value={deliveryInstructions}
            onChangeText={setDeliveryInstructions}
          />
        </View>

        {/* Similar Products Section */}
        <View style={styles.similarProductsContainer}>
          <View style={styles.header}>
            <Text style={styles.similarTitle}>Add More Items</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.productsRow}>
              {popularDishes.slice(0, itemsToShow).map(dish => (
                <TouchableOpacity
                  key={dish.id}
                  style={styles.similarProductCard}
                  activeOpacity={0.9}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={dish.image}
                      style={styles.similarImage}
                      resizeMode="cover"
                    />
                    <TouchableOpacity style={styles.favoriteButton}>
                      <Text style={styles.favoriteIcon}>♥</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.similarProductName} numberOfLines={1}>
                      {dish.name}
                    </Text>
                    <Text
                      style={styles.similarProductDescription}
                      numberOfLines={2}>
                      {dish.description}
                    </Text>
                    <View style={styles.priceContainer}>
                      <Text style={styles.similarProductPrice}>
                        ${dish.price}
                      </Text>
                      <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add +</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {popularDishes.length > INITIAL_ITEMS && (
              <View style={styles.viewButtonsContainer}>
                {itemsToShow < popularDishes.length ? (
                  <TouchableOpacity
                    style={[styles.viewButton, styles.viewMoreButton]}
                    onPress={() => handleItems('more')}>
                    <Text style={styles.viewButtonText}>View More Items ↓</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.viewButton, styles.viewLessButton]}
                    onPress={() => handleItems('less')}>
                    <Text style={styles.viewButtonText}>View Less Items ↑</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </ScrollView>
        </View>

        <View style={styles.similarProductsContainer}>
          <Text style={styles.sectionTitle}>Frequently Bought Together</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularDishes.map(dish => (
              <View key={dish.id} style={styles.horizontalProductCard}>
                <Image source={dish.image} style={styles.horizontalImage} />
                <View style={styles.horizontalProductInfo}>
                  <Text style={styles.productName}>{dish.name}</Text>
                  <Text style={styles.productPrice}>${dish.price}</Text>
                  <TouchableOpacity style={styles.quickAddButton}>
                    <Text style={styles.quickAddText}>ADD +</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Safety Features */}
        <View style={styles.safetyCard}>
          <Icon name="security" size={24} color="#10B982" />
          <Text style={styles.safetyText}>
            100% Safe and Secure Payments • No Hidden Charges
          </Text>
        </View>
      </ScrollView>
      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 5,
    borderWidth: 1,
    elevation: 1,
    borderColor: '#F0F0F0',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 16,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#10B982',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,185,130,0.1)',
    borderRadius: 8,
    padding: 8,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E64848',
    marginHorizontal: 12,
  },
  instructionsCard: {
    padding: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  instructionsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  instructionsInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    marginRight: 8,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10B982',
  },
  checkoutButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#10B982',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B982',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  similarProductsContainer: {
    marginTop: 24,
  },
  similarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  productsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  similarProductCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    elevation: 4,
  },
  similarImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B982',
  },
  viewMoreButton: {
    backgroundColor: '#10B982',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  editText: {
    fontSize: 16,
    color: '#10B982',
    fontWeight: '600',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 6,
  },
  favoriteIcon: {
    color: '#FF6B6B',
    fontSize: 16,
  },
  productInfo: {
    padding: 12,
  },

  similarProductDescription: {
    fontSize: 12,
    color: '#636E72',
    marginBottom: 8,
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: '#10B982',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  viewButtonsContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  viewButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
  },

  viewLessButton: {
    backgroundColor: '#10B982',
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  restaurantCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    marginBottom: 10,
    borderColor: '#A4D8C6',
    borderRadius: 100,
    borderWidth: 1,
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  restaurantInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: 80,
  },
  restaurantName: {
    fontSize: 16,
    marginRight: 35,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  infoButton: {
    padding: 8,
  },
  promoCard: {
    backgroundColor: '#EAF8F1', // Light pastel green
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1, // Dotted border effect
    borderColor: '#C7E3D4',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  promoText: {
    fontSize: 10,
    fontWeight: '400',
    color: '#555',
  },
  icon: {
    padding: 8,
    backgroundColor: '#D4F1E4', // Light icon background
    borderRadius: 50,
  },
  horizontalProductCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  horizontalImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  horizontalProductInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B982',
    marginVertical: 4,
  },
  quickAddButton: {
    backgroundColor: '#10B98220',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  quickAddText: {
    color: '#10B982',
    fontWeight: 'bold',
    fontSize: 12,
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginTop: 30,
  },
  safetyText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 12,
    flex: 1,
  },
});

export default Cart;
