import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface EmptyVisitProps {
  title?: string;
  message?: string;
  buttonTitle?: string;
  onPress?: () => void;
}

const EmptyVisit: React.FC<EmptyVisitProps> = ({
  title = 'No Visits Found',
  message = 'Start your first visit to begin tracking shop visits and lead generation.',
  buttonTitle = 'Start Visit',
  onPress,
}) => {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>

        <Ionicons
          name="storefront-outline"
          size={70}
          color="#0936B0"
        />

      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.message}>
        {message}
      </Text>

      {onPress && (
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.button}
          onPress={onPress}>

          <Ionicons
            name="add-circle-outline"
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            {buttonTitle}
          </Text>

        </TouchableOpacity>
      )}

    </View>
  );
};

export default React.memo(EmptyVisit);

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    paddingVertical: 40,

    paddingHorizontal: 24,

    justifyContent: 'center',

    alignItems: 'center',

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  iconContainer: {

    width: 120,

    height: 120,

    borderRadius: 60,

    backgroundColor: '#EEF4FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginBottom: 24,
  },

  title: {

    fontSize: 22,

    fontWeight: '700',

    color: '#111827',

    textAlign: 'center',
  },

  message: {

    marginTop: 10,

    fontSize: 15,

    color: '#6B7280',

    textAlign: 'center',

    lineHeight: 24,
  },

  button: {

    marginTop: 30,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor: '#0936B0',

    paddingHorizontal: 28,

    height: 52,

    borderRadius: 26,
  },

  buttonText: {

    color: '#FFFFFF',

    fontSize: 16,

    fontWeight: '700',

    marginLeft: 8,
  },

});