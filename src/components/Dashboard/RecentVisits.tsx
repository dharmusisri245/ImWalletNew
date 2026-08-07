



import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// import Feather from '@react-native-vector-icons/feather';
// import MaterialCommunityIcons from '@react-native-vector-icons/material-design-icons';

export interface Visit {
  id: string;
  shopName: string;
  owner: string;
  time: string;
  status: 'Registered' | 'KYC Pending';
}

interface Props {
  data?: Visit[];
  onViewAll?: () => void;
}

const defaultData: Visit[] = [
  {
    id: '1',
    shopName: 'Sharma Ticket Centre',
    owner: 'Ramesh Sharma',
    time: '11:20 AM',
    status: 'Registered',
  },
  {
    id: '2',
    shopName: 'New Kirana Shop',
    owner: 'Suresh Yadav',
    time: '10:05 AM',
    status: 'KYC Pending',
  },
  {
    id: '3',
    shopName: 'City Mobile Point',
    owner: 'Vikas Chaudhary',
    time: '09:40 AM',
    status: 'Registered',
  },
];

const RecentVisits = ({
  data = defaultData,
  onViewAll,
}: Props) => {

  const renderItem = ({ item }: { item: Visit }) => {

    const isRegistered = item.status === 'Registered';

    return (
      <View style={styles.item}>

        <View style={styles.iconContainer}>
          {/* <MaterialCommunityIcons
            name="store"
            size={22}
            color="#2563EB"
          /> */}
          <Text>🏪</Text>
        </View>

        <View style={styles.info}>
          <Text
            numberOfLines={1}
            style={styles.shop}>
            {item.shopName}
          </Text>

          <Text style={styles.owner}>
            {item.owner}
          </Text>
        </View>

        <View style={styles.right}>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: isRegistered
                  ? '#DCFCE7'
                  : '#FEF3C7',
              },
            ]}>
            <Text
              style={[
                styles.badgeText,
                {
                  color: isRegistered
                    ? '#16A34A'
                    : '#D97706',
                },
              ]}>
              {item.status}
            </Text>
          </View>

          <View style={styles.timeRow}>
            {/* <Feather
              name="clock"
              size={11}
              color="#94A3B8"
            /> */}

              <Text>🏪</Text>
            <Text style={styles.time}>
              {item.time}
            </Text>
          </View>

        </View>

      </View>
    );
  };

  return (
    <View style={styles.card}>

      <View style={styles.header}>

        <Text style={styles.title}>
          Recent Shop Visits
        </Text>

        <TouchableOpacity
          onPress={onViewAll}
          style={styles.viewAll}>

          <Text style={styles.viewText}>
            View All
          </Text>

          {/* <Feather
            name="chevron-right"
            size={14}
            color="#2563EB"
          /> */}
          <Text>🕒</Text>

        </TouchableOpacity>

      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        scrollEnabled={false}
      />

    </View>
  );
};

export default RecentVisits;

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },

  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  viewText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 13,
    marginRight: 2,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EEF4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  shop: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },

  owner: {
    marginTop: 2,
    fontSize: 12,
    color: '#6B7280',
  },

  right: {
    alignItems: 'flex-end',
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },

  time: {
    marginLeft: 4,
    fontSize: 11,
    color: '#94A3B8',
  },

  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },

});







// import { View, Text } from 'react-native'
// import React from 'react'

// const RecentVisits = () => {
//   return (
//     <View>
//       <Text>RecentVisits</Text>
//     </View>
//   )
// }

// export default RecentVisits