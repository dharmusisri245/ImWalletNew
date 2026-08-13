import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type QuestionTier = 1 | 2 | 3;

interface QuestionTierBadgeProps {
  tier: QuestionTier;
}

const QuestionTierBadge: React.FC<QuestionTierBadgeProps> = ({
  tier,
}) => {
  const getTierInfo = () => {
    switch (tier) {
      case 1:
        return {
          label: 'Tier 1',
          backgroundColor: '#DCFCE7',
          textColor: '#166534',
        };

      case 2:
        return {
          label: 'Tier 2',
          backgroundColor: '#FEF3C7',
          textColor: '#92400E',
        };

      case 3:
        return {
          label: 'Tier 3',
          backgroundColor: '#FEE2E2',
          textColor: '#991B1B',
        };

      default:
        return {
          label: 'Tier 1',
          backgroundColor: '#DCFCE7',
          textColor: '#166534',
        };
    }
  };

  const tierInfo = getTierInfo();

  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: tierInfo.backgroundColor},
      ]}>
      <View
        style={[
          styles.dot,
          {backgroundColor: tierInfo.textColor},
        ]}
      />

      <Text
        style={[
          styles.text,
          {color: tierInfo.textColor},
        ]}>
        {tierInfo.label}
      </Text>
    </View>
  );
};

export default QuestionTierBadge;

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 5,
  },

  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});