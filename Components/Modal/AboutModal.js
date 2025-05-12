import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutModal = ({visible, onClose}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with Close Button */}
          <View style={styles.header}>
            <Text style={styles.title}>About Foodie App</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="times" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* App Info */}
          <View style={styles.content}>
            <Icon
              name="info-circle"
              size={50}
              color="#E64848"
              style={styles.icon}
            />
            <Text style={styles.subtitle}>Version 1.0.0</Text>

            <View style={styles.divider} />

            <Text style={styles.description}>
              Enjoy the best food delivery experience with Foodie! Get your
              favorite meals delivered fast and fresh.
            </Text>

            <View style={styles.divider} />

            <Text style={styles.copyright}>
              © 2025 Foodie Inc. All rights reserved.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#E64848',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#D43F3F',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  description: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  copyright: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});

export default AboutModal;
