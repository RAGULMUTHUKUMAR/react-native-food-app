import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import AboutModal from '../Modal/AboutModal';
import {useRoute} from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [aboutVisible, setAboutVisible] = useState(false);

  const [user, setUser] = useState({
    name: 'RAGUL M',
    email: 'ragul.doe@example.com',
    phone: '+1 123 456 7890',
    address: '123 Main St, New York, NY 10001',
    profileImage: '',
    orderHistory: [
      {id: 1, item: 'Pizza', date: '2023-10-01'},
      {id: 2, item: 'Burger', date: '2023-10-05'},
    ],
    favorites: ['Sushi', 'Pasta', 'Tacos'],
    reviews: [
      {id: 1, restaurant: 'Italiano', rating: 4, comment: 'Amazing pasta!'},
      {
        id: 2,
        restaurant: 'Burger House',
        rating: 5,
        comment: 'Best burgers in town!',
      },
    ],
  });

  useEffect(() => {
    if (route.params?.updatedUser) {
      setUser(prevUser => ({
        ...prevUser,
        ...route.params.updatedUser,
      }));
    }
  }, [route.params?.updatedUser]);

  const getInitials = name => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {user.profileImage ? (
          <Image
            source={{uri: user.profileImage}}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.initials}>{getInitials(user.name)}</Text>
          </View>
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>

        {/* Address Section */}
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{user.address}</Text>
          <TouchableOpacity
            style={styles.editAddressButton}
            onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="pencil" size={16} color="#fff" />
            <Text style={styles.editAddressText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Order History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {user.orderHistory.map(order => (
          <View key={order.id} style={styles.orderItem}>
            <Text style={styles.orderText}>{order.item}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
        ))}
      </View>

      {/* Favorites */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorites</Text>
        <View style={styles.favoritesContainer}>
          {user.favorites.map((item, index) => (
            <Text key={index} style={styles.favoriteItem}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Reviews</Text>
        {user.reviews.map(review => (
          <View key={review.id} style={styles.reviewItem}>
            <Text style={styles.reviewRestaurant}>{review.restaurant}</Text>
            <Text style={styles.reviewRating}>⭐ {review.rating}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setAboutVisible(true)}>
          <Entypo
            name="info-with-circle"
            size={20}
            color="#2A9D8F"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings')}>
          <Icon name="cog" size={20} color="#2A9D8F" style={styles.icon} />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Icon name="sign-out" size={20} color="#E64848" style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <AboutModal
        visible={aboutVisible}
        onClose={() => setAboutVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E64848',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginBottom: 15,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2A9D8F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  initials: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  addressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  addressText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 5,
  },
  editAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#2A9D8F',
    padding: 10,
    borderRadius: 20,
  },
  editAddressText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2A9D8F',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#F8F8F8',
    marginBottom: 10,
    borderRadius: 10,
  },
  orderText: {
    fontSize: 16,
    color: '#333333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666666',
  },
  favoritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  favoriteItem: {
    backgroundColor: '#2A9D8F',
    color: '#FFFFFF',
    padding: 10,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  reviewItem: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewRestaurant: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2A9D8F',
  },
  reviewRating: {
    fontSize: 14,
    color: '#E64848',
    marginVertical: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#666666',
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '90%',
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default Profile;
