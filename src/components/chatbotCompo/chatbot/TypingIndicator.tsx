import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface TypingIndicatorProps {
  visible: boolean;
  name?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  visible,
  name = 'AI Assistant',
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {name} is typing
      </Text>

      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },

  name: {
    fontSize: 12,
    color: '#888',
    marginRight: 7,
  },

  dots: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#888',
    marginHorizontal: 2,
  },
});

export default TypingIndicator;