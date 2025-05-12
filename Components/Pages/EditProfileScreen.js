import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('123 Main St, New York, NY 10001');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Track OTP verification

  const showModal = message => {
    setModalMessage(message);
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleSendOtp = () => {
    // Simulate OTP sending
    setIsOtpSent(true);
    showModal('OTP sent to your phone number.');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      // Simulate correct OTP
      showModal('Phone number verified successfully!');
      setIsOtpVerified(true); // Hide OTP input after verification
    } else {
      showModal('Invalid OTP. Please try again.');
    }
  };

  const handleSave = () => {
    const updatedUser = {
      name,
      email,
      phone: `+${callingCode} ${phone}`,
      address,
    };

    showModal('Profile updated successfully!');

    setTimeout(() => {
      hideModal();
      navigation.navigate('HomePage', {
        screen: 'Profile',
        params: {updatedUser}, // Pass updatedUser as params
      });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Edit Profile</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter your password"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <CountryPicker
              withCallingCode
              withFlag
              withFilter
              countryCode={countryCode}
              onSelect={country => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
              containerButtonStyle={styles.countryPicker}
            />
            <Text style={styles.callingCode}>+{callingCode}</Text>
            <TextInput
              style={styles.phoneInput}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
            />
            <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp}>
              <Text style={styles.otpButtonText}>
                {isOtpSent ? 'Resend OTP' : 'Send OTP'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {isOtpSent && !isOtpVerified && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              placeholder="Enter OTP"
            />
            <TouchableOpacity
              style={styles.verifyButton}
              onPress={handleVerifyOtp}>
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        )}

        {isOtpVerified && (
          <Text
            style={{
              color: 'green',
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            ✅ Phone number verified!
          </Text>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Icon name="save" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Modal */}
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={hideModal}
        animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContent, {opacity: fadeAnim}]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E64848',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    marginRight: 10,
  },
  callingCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  otpButton: {
    backgroundColor: '#10B982',
    padding: 15,
    borderRadius: 10,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  otpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  verifyButton: {
    backgroundColor: '#E64848',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#E64848',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#E64848',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
