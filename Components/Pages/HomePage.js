import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
  TextInput,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Categories from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';

// Sample Images
import popularDishes from '../Data/FilterData';
import CustomModal from '../Modal/CustomModal';
import Permission from '../Auth/Permissions';

const {width, height} = Dimensions.get('window');

const categories = [
  {id: '1', name: 'Fast Food', icon: 'hamburger'},
  {id: '2', name: 'Desserts', icon: 'ice-cream'},
  {id: '3', name: 'Pizza', icon: 'pizza'},
  {id: '4', name: 'Healthy', icon: 'leaf'},
  {id: '5', name: 'Seafood', icon: 'fish'},
];

const HomePage = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quantities, setQuantities] = useState(
    popularDishes.reduce((acc, dish) => {
      acc[dish.id] = 0; // Default quantity is 0
      return acc;
    }, {}),
  );
  const [cart, setCart] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [location, setLocation] = useState('Fetching location...');

  // Animation refs
  const heroAnim = useRef(new Animated.Value(0)).current;
  const categoryAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hero section animation
    Animated.timing(heroAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Category section animation
    Animated.timing(categoryAnim, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Card section animation
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 800,
      delay: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const requestLocation = async () => {
      if (Platform.OS === 'android') {
        const hasPermission = await Permission({
          permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          title: 'Location Permission',
          message:
            'This app requires access to your location to display nearby restaurants.',
        });

        if (!hasPermission) {
          setLocation('Permission denied');
          return;
        }
      }
      getCurrentLocation();
    };

    requestLocation();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        )
          .then(res => res.json())
          .then(data => {
            const fetchedState = data.address.state || 'State not found';
            const fetchedVillage = data.address.village || 'Village not found';

            // Update location to show only state and village
            setLocation(`${fetchedState}, ${fetchedVillage}`);
          })
          .catch(error => {
            console.error('Error fetching location:', error);
            setLocation('Error fetching location');
          });
      },
      error => {
        console.error('Location error:', error);
        setLocation('Unknown location');
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleIncreaseQuantity = id => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = id => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleAddToCart = item => {
    console.log('item: ', item);
    if (quantities[item.id] === 0) {
      setModalMessage('Please select a quantity greater than 0');
      setModalVisible(true);
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // Update quantity if item already exists in cart
      setCart(prev =>
        prev.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + quantities[item.id]}
            : cartItem,
        ),
      );
    } else {
      // Add new item to cart
      setCart(prev => [...prev, {...item, quantity: quantities[item.id]}]);
    }

    setModalMessage(`${item.name} added to cart!`);
    setModalVisible(true);
  };

  const handleCart = item => {
    navigation.navigate('Cart', {
      cartItems: cart, // Pass the entire cart array
    });
  };

  const filteredDishes = selectedCategory
    ? popularDishes.filter(dish => dish.category === selectedCategory)
    : popularDishes;

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <Animated.View
        style={[
          styles.heroSection,
          {
            opacity: heroAnim,
            transform: [
              {
                translateY: heroAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.heroHeader}>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={24} color="#000" />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <TouchableOpacity onPress={handleCart}>
            <View style={styles.cartIconContainer}>
              <Icon name="shopping-cart" size={24} color="#000" />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.heroTitle}>What would you like to eat today?</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for dishes or restaurants..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Categories Section */}
      <Animated.View
        style={[
          styles.categoriesSection,
          {
            opacity: categoryAnim,
            transform: [
              {
                translateY: categoryAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.categoryItem,
                selectedCategory === item.name && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedCategory(item.name)}>
              <Categories
                name={item.icon}
                size={24}
                color={selectedCategory === item.name ? '#E64848' : '#888'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.name && styles.selectedCategoryText,
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </Animated.View>

      {/* Popular Dishes Section */}
      <ScrollView style={styles.dishesSection}>
        <Text style={styles.sectionTitle}>Popular Dishes</Text>
        {filteredDishes.map(item => (
          <Animated.View
            key={item.id}
            style={[
              styles.dishCard,
              {
                opacity: cardAnim,
                transform: [
                  {
                    translateY: cardAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Image source={item.image} style={styles.dishImage} />
            <View style={styles.dishDetails}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDescription}>{item.description}</Text>
              <View style={styles.dishFooter}>
                <Text style={styles.dishPrice}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() => handleDecreaseQuantity(item.id)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantities[item.id]}</Text>
                  <TouchableOpacity
                    onPress={() => handleIncreaseQuantity(item.id)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
      {/* Custom Modal */}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} // Hide modal
        title="Notification"
        message={modalMessage}
        buttonText="Close"
      />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heroSection: {
    backgroundColor: '#2A9D8F',
    padding: 20,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 5,
  },
  cartIconContainer: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E64848',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#E64848',
    borderRadius: 100,
    padding: 5,
  },
  categoriesSection: {
    paddingVertical: 15,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  selectedCategoryItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#E64848',
  },
  categoryText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  selectedCategoryText: {
    color: '#E64848',
    fontWeight: 'bold',
  },
  dishesSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dishImage: {
    width: '100%',
    height: 150,
  },
  dishDetails: {
    padding: 15,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dishDescription: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  dishFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E64848',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  quantityButton: {
    fontSize: 18,
    color: '#E64848',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#2A9D8F',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
