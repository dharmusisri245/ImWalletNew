import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface ShopInfoCardProps {
  shopName: string;
  ownerName: string;
  mobile: string;
  address: string;
  category: string;
}

const ShopInfoCard: React.FC<ShopInfoCardProps> = ({
  shopName,
  ownerName,
  mobile,
  address,
  category,
}) => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.iconContainer}>
          <Ionicons
            name="storefront-outline"
            size={28}
            color="#0936B0"
          />
        </View>

        <View style={styles.headerText}>
          <Text
            numberOfLines={1}
            style={styles.shopName}>
            {shopName}
          </Text>

          <Text style={styles.owner}>
            {ownerName}
          </Text>
        </View>

      </View>

      <View style={styles.divider} />

      <InfoRow
        icon="call-outline"
        value={mobile}
      />

      <InfoRow
        icon="location-outline"
        value={address}
      />

      <InfoRow
        icon="grid-outline"
        value={category}
      />

    </View>
  );
};

interface InfoRowProps {
  icon: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon,
  value,
}) => (
  <View style={styles.infoRow}>

    <Ionicons
      name={icon as any}
      size={18}
      color="#6B7280"
    />

    <Text
      numberOfLines={2}
      style={styles.infoText}>
      {value}
    </Text>

  </View>
);

export default React.memo(ShopInfoCard);

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 58,
    height: 58,

    borderRadius: 29,

    backgroundColor: '#EEF4FF',

    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    flex: 1,
    marginLeft: 14,
  },

  shopName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  owner: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
  },

  divider: {
    marginVertical: 16,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    color: '#374151',
    fontSize: 15,
  },

});