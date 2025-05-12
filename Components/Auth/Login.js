import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  ImageBackground,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Permission from './Permissions';

const {width, height} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const emailAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // Replace with your web client ID
      offlineAccess: true,
    });
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);

    const isGranted = await Permission({
      permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      title: 'Location Permission',
      message:
        'This app needs access to your location to find nearby restaurants.',
    });

    if (!isGranted) {
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '1234') {
        navigation.replace('HomePage');
      } else {
        Alert.alert('Error', 'Invalid Credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      navigation.replace('HomePage'); // Navigate to HomePage after successful Google sign-in
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Error', 'Sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Error', 'Sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'Play services not available');
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  const animateInput = (anim, isFocused) => {
    Animated.timing(anim, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const emailBorderColor = emailAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ddd', '#10B982'],
  });

  const passwordBorderColor = passwordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ddd', '#10B982'],
  });

  return (
    <ImageBackground
      source={require('../../Assets/Images/Seafood5.jpeg')}
      style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            {/* Food Animation */}
            <LottieView
              source={require('../../Assets/JsonAnimation/Login2Animation.json')}
              autoPlay
              loop
              style={styles.animation}
            />
            <Text style={styles.slogan}>Savor the Flavor</Text>
            <View style={styles.header}>
              <View style={styles.labelHeader}>
                <Icon name="email" size={24} color="#333" />
                <Text style={styles.label}>Email</Text>
              </View>
              <Animated.View
                style={[
                  styles.inputContainer,
                  {borderColor: emailBorderColor},
                ]}>
                <TextInput
                  style={styles.input}
                  value={email}
                  placeholder="Enter your email"
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  onFocus={() => {
                    setIsFocusedEmail(true);
                    animateInput(emailAnim, true);
                  }}
                  onBlur={() => {
                    setIsFocusedEmail(false);
                    animateInput(emailAnim, false);
                  }}
                />
              </Animated.View>
            </View>
            <View style={styles.header}>
              <View style={styles.labelHeader}>
                <Icon name="lock" size={24} color="#333" />
                <Text style={styles.label}>Password</Text>
              </View>
              <Animated.View
                style={[
                  styles.inputContainer,
                  {borderColor: passwordBorderColor},
                ]}>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  onFocus={() => {
                    setIsFocusedPassword(true);
                    animateInput(passwordAnim, true);
                  }}
                  onBlur={() => {
                    setIsFocusedPassword(false);
                    animateInput(passwordAnim, false);
                  }}
                />
              </Animated.View>
            </View>
            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.7}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              activeOpacity={0.7}>
              <SimpleLineIcons name="social-google" size={24} color="#DB4437" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signUpLink}
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.7}>
              <Text style={styles.signUpText}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.58)',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  animation: {
    width: 250,
    height: 250,
  },
  slogan: {
    fontSize: 24,
    color: '#10B982', // Food-themed color
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    width: '100%',
    marginBottom: 10,
  },
  labelHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#10B982', // Food-themed color
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ff9e99', // Lighter color when disabled
  },
  orText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 20,
  },
  googleButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpLink: {
    marginTop: 5,
  },
  signUpText: {
    color: '#ff6f61',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
