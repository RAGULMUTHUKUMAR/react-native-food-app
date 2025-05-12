import {PermissionsAndroid, Alert} from 'react-native';

const Permission = async ({permission, title, message}) => {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title: title,
      message: message,
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(`${permission} permission granted`);
      return true;
    } else {
      Alert.alert(
        'Permission Denied',
        `You need to grant ${permission} to use this feature.`,
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default Permission;
