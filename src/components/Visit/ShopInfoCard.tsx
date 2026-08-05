// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';

// interface ShopInfoCardProps {
//   shopName: string;
//   ownerName: string;
//   mobile: string;
//   address: string;
//   category: string;
// }

// const ShopInfoCard: React.FC<ShopInfoCardProps> = ({
//   shopName,
//   ownerName,
//   mobile,
//   address,
//   category,
// }) => {
//   return (
//     <View style={styles.container}>

//       <View style={styles.header}>

//         <View style={styles.iconContainer}>
//           <Ionicons
//             name="storefront-outline"
//             size={28}
//             color="#0936B0"
//           />
//         </View>

//         <View style={styles.headerText}>
//           <Text
//             numberOfLines={1}
//             style={styles.shopName}>
//             {shopName}
//           </Text>

//           <Text style={styles.owner}>
//             {ownerName}
//           </Text>
//         </View>

//       </View>

//       <View style={styles.divider} />

//       <InfoRow
//         icon="call-outline"
//         value={mobile}
//       />

//       <InfoRow
//         icon="location-outline"
//         value={address}
//       />

//       <InfoRow
//         icon="grid-outline"
//         value={category}
//       />

//     </View>
//   );
// };

// interface InfoRowProps {
//   icon: string;
//   value: string;
// }

// const InfoRow: React.FC<InfoRowProps> = ({
//   icon,
//   value,
// }) => (
//   <View style={styles.infoRow}>

//     <Ionicons
//       name={icon as any}
//       size={18}
//       color="#6B7280"
//     />

//     <Text
//       numberOfLines={2}
//       style={styles.infoText}>
//       {value}
//     </Text>

//   </View>
// );

// export default React.memo(ShopInfoCard);

// const styles = StyleSheet.create({

//   container: {
//     backgroundColor: '#FFFFFF',

//     borderRadius: 20,

//     padding: 18,

//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 8,

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },

//     elevation: 5,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   iconContainer: {
//     width: 58,
//     height: 58,

//     borderRadius: 29,

//     backgroundColor: '#EEF4FF',

//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   headerText: {
//     flex: 1,
//     marginLeft: 14,
//   },

//   shopName: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   owner: {
//     marginTop: 4,
//     fontSize: 14,
//     color: '#6B7280',
//   },

//   divider: {
//     marginVertical: 16,
//     height: 1,
//     backgroundColor: '#E5E7EB',
//   },

//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 14,
//   },

//   infoText: {
//     flex: 1,
//     marginLeft: 10,
//     color: '#374151',
//     fontSize: 15,
//   },

// });








import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface ShopInfoCardProps {
  shopName: string;
  ownerName: string;
  mobile: string;
  category: string;
  address: string;

  onChangeShopName: (text: string) => void;
  onChangeOwnerName: (text: string) => void;
  onChangeMobile: (text: string) => void;
  onChangeCategory: (text: string) => void;
}

const ShopInfoCard: React.FC<ShopInfoCardProps> = ({
  shopName,
  ownerName,
  mobile,
  category,
  address,
  onChangeShopName,
  onChangeOwnerName,
  onChangeMobile,
  onChangeCategory,
}) => {

  return (

    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <View style={styles.headerIcon}>

          <Ionicons
            name="storefront-outline"
            size={28}
            color="#0936B0"
          />

        </View>

        <View style={{ flex: 1 }}>

          <Text style={styles.title}>
            Shop Information
          </Text>

          <Text style={styles.subtitle}>
            Enter basic details of the vendor.
          </Text>

        </View>

      </View>

      {/* Shop Name */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Shop Name *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Shop Name"
          placeholderTextColor="#94A3B8"
          value={shopName}
          onChangeText={onChangeShopName}
        />

      </View>

      {/* Owner Name */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Owner Name *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Owner Name"
          placeholderTextColor="#94A3B8"
          value={ownerName}
          onChangeText={onChangeOwnerName}
        />

      </View>

      {/* Mobile */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Mobile Number *
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Mobile Number"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          maxLength={10}
          value={mobile}
          onChangeText={onChangeMobile}
        />

      </View>

      {/* Business Category */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Business Category *
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryButton}
          onPress={() =>
            onChangeCategory('Electronics')
          }>

          <Text
            style={[
              styles.categoryText,
              !category && {
                color: '#94A3B8',
              },
            ]}>

            {category || 'Select Business Category'}

          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#64748B"
          />

        </TouchableOpacity>

      </View>

      {/* Current Address */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Current Address
        </Text>

        <View style={styles.addressContainer}>

          <Ionicons
            name="location-outline"
            size={20}
            color="#EF4444"
          />

          <Text style={styles.addressText}>

            {address || 'Fetching current location...'}

          </Text>

        </View>

      </View>

    </View>

  );

};

export default React.memo(ShopInfoCard);

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#FFFFFF',

    borderRadius: 20,

    padding: 20,

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

    marginBottom: 24,
  },

  headerIcon: {
    width: 56,

    height: 56,

    borderRadius: 28,

    backgroundColor: '#EEF4FF',

    justifyContent: 'center',

    alignItems: 'center',

    marginRight: 14,
  },

  title: {
    fontSize: 18,

    fontWeight: '700',

    color: '#111827',
  },

  subtitle: {
    marginTop: 4,

    fontSize: 13,

    color: '#6B7280',

    lineHeight: 20,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,

    fontWeight: '600',

    color: '#374151',

    marginBottom: 8,
  },

  input: {
    height: 52,

    borderWidth: 1,

    borderColor: '#E5E7EB',

    borderRadius: 14,

    paddingHorizontal: 15,

    backgroundColor: '#FFFFFF',

    color: '#111827',

    fontSize: 15,
  },

  categoryButton: {
    height: 52,

    borderWidth: 1,

    borderColor: '#E5E7EB',

    borderRadius: 14,

    paddingHorizontal: 15,

    backgroundColor: '#FFFFFF',

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  categoryText: {
    fontSize: 15,

    color: '#111827',

    flex: 1,
  },

  addressContainer: {
    flexDirection: 'row',

    alignItems: 'flex-start',

    backgroundColor: '#F8FAFC',

    borderRadius: 14,

    padding: 14,

    borderWidth: 1,

    borderColor: '#E5E7EB',
  },

  addressText: {
    flex: 1,

    marginLeft: 10,

    color: '#374151',

    fontSize: 14,

    lineHeight: 22,
  },

});