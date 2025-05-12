import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Coupons from '../Data/CouponData';

const {width} = Dimensions.get('window');

const Coupon = () => {
  // State for selected coupon
  const [selectedCoupon, setSelectedCoupon] = useState(Coupons[0]); // Default to the first coupon

  // Function to update selected coupon
  const handleSelectCoupon = coupon => {
    setSelectedCoupon(coupon);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const CouponCard = ({coupon}) => (
    <TouchableOpacity onPress={() => handleSelectCoupon(coupon)}>
      <View style={styles.couponContainer}>
        {/* Left Section - Icon & Text */}
        <View style={styles.leftSection}>
          <Text style={styles.couponTitle}>{coupon.type}</Text>
          <Text style={styles.descriptionText}>{coupon.description}</Text>
        </View>

        {/* Right Section - Discount */}
        <View style={styles.rightSection}>
          <Text style={styles.discountText}>{coupon.discount}</Text>
          <Icon
            name="sack-percent"
            size={24}
            color="#FF6B6B"
            style={styles.icon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Selected Coupon Display */}
      <View style={[styles.couponSelectContainer]}>
        <View style={styles.selectCoupon}>
          <View style={styles.selectCouponLeft}>
            <Text style={styles.selectDiscountText}>
              {selectedCoupon.discount}
            </Text>
            <Text style={styles.selectCouponCode}>
              USE CODE: {selectedCoupon.code}
            </Text>
            <Text style={styles.selectExpiryText}>
              Expires in {selectedCoupon.expiry}
            </Text>
          </View>
          <View style={styles.selectCouponRight}>
            <Text style={styles.selectCouponTitle}>{selectedCoupon.type}</Text>
            <Text style={styles.selectCouponDescription}>
              {selectedCoupon.description}
            </Text>
            <TouchableOpacity style={styles.selectApplyButton}>
              <Text style={styles.selectApplyButtonText} >Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Coupon List */}
      <View>
        <FlatList
          data={Coupons}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CouponCard coupon={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ScrollView>
  );
};

export default Coupon;

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  couponSelectContainer: {
    width: width * 0.9,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#10B982',
  },
  selectCoupon: {
    flexDirection: 'row',
    padding: 20,
  },
  selectCouponLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 2,
    borderRightColor: '#FFFFFF',
  },
  selectDiscountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  selectCouponCode: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  selectExpiryText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 10,
  },
  selectCouponRight: {
    flex: 2,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  selectCouponTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  selectCouponDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  selectApplyButton: {
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectApplyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  listContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  couponContainer: {
    width: width * 0.9,
    backgroundColor: '#EAF8F1',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#C7E3D4',
    borderStyle: 'dashed',
    marginBottom: 15,
  },
  leftSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 5,
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10B982',
  },
  descriptionText: {
    fontSize: 10,
    color: '#000',
    marginTop: 4,
  },
  discountText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#10B982',
  },
});
