import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Animated,
  ViewStyle,
} from 'react-native';
import { colors, spacing, typography } from '../../color/Colurs';

type Props = TextInputProps & {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  rightElement?: React.ReactNode;
};

/**
 * Underline-style text field with a floating label, matching the
 * "Register User" screen mock. Shared by every text input on the form.
 */


export default function CustomInput({
  label,
  error,
  containerStyle,
  rightElement,
  value,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  const hasValue = !!value && value.length > 0;

  React.useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: focused || hasValue ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [focused, hasValue]);

  const labelStyle = {
    top: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [14, -8] }),
    fontSize: animatedLabel.interpolate({ inputRange: [0, 1], outputRange: [16, 12] }),
    color: error ? colors.error : focused ? colors.primary : colors.textLabel,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.fieldRow}>
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.label, labelStyle]} numberOfLines={1}>
            {label}
          </Animated.Text>
          <TextInput
            {...rest}
            value={value}
            placeholder=""
            placeholderTextColor={colors.textPlaceholder}
            style={[
              styles.input,
              { borderBottomColor: error ? colors.error : focused ? colors.borderFocused : colors.border },
            ]}
            onFocus={(e) => {
              setFocused(true);
              onFocus && onFocus(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              onBlur && onBlur(e);
            }}
          />
        </View>
        {rightElement ? <View style={styles.rightElement}>{rightElement}</View> : null}
      </View>
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputWrapper: {
    flex: 1,
  },
  label: {
    position: 'absolute',
    left: 0,
    fontWeight: '500',
  },
  input: {
    fontSize: typography.input,
    color: colors.textPrimary,
    fontWeight: '600',
    paddingVertical: spacing.sm,
    paddingTop: 18,
    borderBottomWidth: 1.5,
  },
  rightElement: {
    marginLeft: spacing.sm,
    paddingBottom: spacing.sm,
  },
  errorText: {
    marginTop: 4,
    fontSize: typography.helper,
    color: colors.error,
  },
});