import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import pizza1 from '../../Assets/Images/Pizza1.jpeg';
import pizza2 from '../../Assets/Images/Pizza2.jpeg';
import Desserts from '../../Assets/Images/desserts1.jpeg';
import healthy2 from '../../Assets/Images/Healthy2.jpeg';

const offersData = [
  {
    id: '1',
    title: 'Flat 50% Off on Burgers 🍔',
    image: pizza1,
    discount: '50% OFF',
    rating: '4.5',
    time: '30 min',
    tag: 'NEW',
  },
  {
    id: '2',
    title: 'Buy 1 Get 1 Free Pizza 🍕',
    image: pizza2,
    discount: 'BOGO Offer',
    rating: '4.7',
    time: '25 min',
    tag: 'LIMITED TIME',
  },
  {
    id: '3',
    title: 'Free Dessert on Orders Above $20 🍰',
    image: Desserts,
    discount: 'FREE Dessert',
    rating: '4.3',
    time: '20 min',
    tag: 'HOT DEAL',
  },
  {
    id: '4',
    title: 'Flat 30% Off on Healthy Meals 🥗',
    image: healthy2,
    discount: '30% OFF',
    rating: '4.8',
    time: '35 min',
    tag: 'RECOMMENDED',
  },
];

const OfferCard = ({offer, onPress}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onLongPress={() => setIsFavorite(!isFavorite)}>
      <Image source={offer.image} style={styles.image} />
      <View style={styles.cardDetails}>
        <View style={styles.header}>
          <Text style={styles.title}>{offer.title}</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.discount}>{offer.discount}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFD700" /> {offer.rating}
          </Text>
          <Text style={styles.time}>
            <MaterialIcons name="timer" size={16} color="#555" /> {offer.time}
          </Text>
        </View>
        {offer.tag && (
          <Text style={[styles.tag, styles[offer.tag.replace(' ', '')]]}>
            {offer.tag}
          </Text>
        )}
        <TouchableOpacity style={styles.button} onPress={() => onPress(offer)}>
          <Text style={styles.buttonText}>Grab Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Offers = () => {
  const [selectedOffer, setSelectedOffer] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Ionicons name="pricetags" size={28} color="#fff" />
        <Text style={styles.heading}>Exclusive Offers</Text>
      </View>
      <View style={styles.headingUnderline} />

      <FlatList
        data={offersData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <OfferCard offer={item} onPress={setSelectedOffer} />
        )}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      />

      {/* Custom Modal */}
      <Modal visible={!!selectedOffer} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedOffer && (
              <>
                <Image source={selectedOffer.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedOffer.title}</Text>
                <Text style={styles.modalDiscount}>
                  {selectedOffer.discount}
                </Text>
                <Text style={styles.modalInfo}>
                  <Ionicons name="star" size={16} color="#FFD700" />{' '}
                  {selectedOffer.rating} |
                  <MaterialIcons name="timer" size={16} color="#555" />{' '}
                  {selectedOffer.time}
                </Text>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setSelectedOffer(null)}>
                  <Text style={styles.modalCloseText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    padding: 10,
  },
  headingWrapper: {
    flexDirection: 'row',
    backgroundColor: '#000', // Bright, eye-catching color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 6, // For a raised effect on Android
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 3,
    marginLeft: 10,
  },

  headingUnderline: {
    height: 4,
    width: 130,
    backgroundColor: '#D63031', // A slightly darker red for contrast
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: -6,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  cardDetails: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  discount: {
    fontSize: 16,
    color: '#ff6347',
    marginTop: 4,
  },
  metaInfo: {
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 10,
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  tag: {
    fontSize: 14,
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 6,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2A9D8F',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalDiscount: {
    fontSize: 16,
    color: '#ff6347',
    marginVertical: 5,
  },
  modalInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  modalClose: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
