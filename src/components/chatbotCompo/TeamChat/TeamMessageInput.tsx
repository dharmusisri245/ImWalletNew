import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface TeamMessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TeamMessageInput: React.FC<
  TeamMessageInputProps
> = ({
  onSend,
  disabled = false,
  placeholder = 'Reply to client...',
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    const message = text.trim();

    if (!message || disabled) {
      return;
    }

    onSend(message);
    setText('');
  };

  return (
    <View style={styles.container}>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        placeholderTextColor="#999999"
        multiline
        editable={!disabled}
        style={styles.input}
      />

      <Pressable
        onPress={handleSend}
        disabled={!text.trim() || disabled}
        style={[
          styles.sendButton,
          (!text.trim() || disabled) &&
            styles.disabledButton,
        ]}>
        <Text style={styles.sendIcon}>
          ➤
        </Text>
      </Pressable>

    </View>
  );
};

export default TeamMessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 22,
    backgroundColor: '#F9F9F9',
    fontSize: 14,
    color: '#222222',
    marginRight: 8,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6366F1',
  },

  disabledButton: {
    opacity: 0.4,
  },

  sendIcon: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
});