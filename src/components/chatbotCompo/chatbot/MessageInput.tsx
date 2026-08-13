import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Type your message...',
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
        placeholderTextColor="#999"
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
        ]}
      >
        <Text style={styles.sendIcon}>
          ➤
        </Text>
      </Pressable>
    </View>
  );
};

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
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#F9F9F9',
    marginRight: 8,
  },

  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7A1F2B',
  },

  disabledButton: {
    opacity: 0.4,
  },

  sendIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});

export default MessageInput;