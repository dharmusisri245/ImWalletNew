import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface VisitCardProps {
  shopName: string;
  ownerName: string;
  mobile: string;
  address: string;
  visitTime: string;

  status:
    | 'Interested'
    | 'Follow-up'
    | 'Decision Pending'
    | 'Not Interested'
    | 'Shop Closed';

  onPress?: () => void;
}

const VisitCard: React.FC<VisitCardProps> = ({
  shopName,
  ownerName,
  mobile,
  address,
  visitTime,
  status,
  onPress,
}) => {

  const getStatusColor = () => {

    switch (status) {

      case 'Interested':
        return '#10B981';

      case 'Follow-up':
        return '#F59E0B';

      case 'Decision Pending':
        return '#3B82F6';

      case 'Not Interested':
        return '#EF4444';

      case 'Shop Closed':
        return '#6B7280';

      default:
        return '#6B7280';
    }
  };

  return (

    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={onPress}>

      <View style={styles.header}>

        <View style={styles.shopSection}>

          <View style={styles.shopIcon}>

            <Ionicons
              name="storefront-outline"
              size={22}
              color="#0936B0"
            />

          </View>

          <View style={{ flex: 1 }}>

            <Text
              numberOfLines={1}
              style={styles.shopName}>

              {shopName}

            </Text>

            <Text style={styles.ownerName}>

              {ownerName}

            </Text>

          </View>

        </View>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: `${getStatusColor()}20`,
            },
          ]}>

          <Text
            style={[
              styles.statusText,
              {
                color: getStatusColor(),
              },
            ]}>

            {status}

          </Text>

        </View>

      </View>

      <View style={styles.infoRow}>

        <Ionicons
          name="call-outline"
          size={16}
          color="#6B7280"
        />

        <Text style={styles.infoText}>

          {mobile}

        </Text>

      </View>

      <View style={styles.infoRow}>

        <Ionicons
          name="location-outline"
          size={16}
          color="#6B7280"
        />

        <Text
          numberOfLines={1}
          style={styles.infoText}>

          {address}

        </Text>

      </View>

      <View style={styles.footer}>

        <View style={styles.timeRow}>

          <Ionicons
            name="time-outline"
            size={16}
            color="#6B7280"
          />

          <Text style={styles.timeText}>

            {visitTime}

          </Text>

        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#0936B0"
        />

      </View>

    </TouchableOpacity>
  );
};

export default React.memo(VisitCard);

const styles = StyleSheet.create({

  container: {

    backgroundColor: '#FFFFFF',

    borderRadius: 18,

    padding: 16,

    marginBottom: 14,

    shadowColor: '#000',

    shadowOpacity: 0.08,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  header: {

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    marginBottom: 14,
  },

  shopSection: {

    flex: 1,

    flexDirection: 'row',

    alignItems: 'center',
  },

  shopIcon: {

    width: 48,

    height: 48,

    borderRadius: 24,

    backgroundColor: '#EEF4FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 12,
  },

  shopName: {

    fontSize: 17,

    fontWeight: '700',

    color: '#111827',
  },

  ownerName: {

    marginTop: 3,

    fontSize: 13,

    color: '#6B7280',
  },

  statusBadge: {

    paddingHorizontal: 10,

    paddingVertical: 6,

    borderRadius: 20,
  },

  statusText: {

    fontSize: 12,

    fontWeight: '700',
  },

  infoRow: {

    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 10,
  },

  infoText: {

    marginLeft: 8,

    flex: 1,

    color: '#4B5563',

    fontSize: 14,
  },

  footer: {

    marginTop: 8,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',
  },

  timeRow: {

    flexDirection: 'row',

    alignItems: 'center',
  },

  timeText: {

    marginLeft: 6,

    color: '#6B7280',

    fontWeight: '600',
  },

});