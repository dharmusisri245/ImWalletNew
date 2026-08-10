import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

interface ShopInfoCardProps {
  shopName: string;
  ownerName: string;
  mobile: string;
  category: string;

  address: string;
  state: string;
  district: string;
  block: string;
  manualAddress: string;

  loadingLocation: boolean;

  onChangeShopName: (text: string) => void;
  onChangeOwnerName: (text: string) => void;
  onChangeMobile: (text: string) => void;
  onChangeCategory: (text: string) => void;

  onChangeState: (text: string) => void;
  onChangeDistrict: (text: string) => void;
  onChangeBlock: (text: string) => void;
  onChangeManualAddress: (text: string) => void;

  ongetCurrentLocation: () => void;
}

const ShopInfoCard: React.FC<ShopInfoCardProps> = ({
  shopName,
  ownerName,
  mobile,
  category,
  address,
  state,
  district,
  block,
  manualAddress,
  loadingLocation,

  onChangeShopName,
  onChangeOwnerName,
  onChangeMobile,
  onChangeCategory,

  onChangeState,
  onChangeDistrict,
  onChangeBlock,
  onChangeManualAddress,

  ongetCurrentLocation,
}) => {
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [currentAddress, setCurrentAddress] = useState("");
  const [loadingloading, setLoadingLocation] = useState(true)


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

      {/* State */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          State *
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryButton}
          onPress={() => onChangeState('Uttar Pradesh')}>

          <Text
            style={[
              styles.categoryText,
              !state && {
                color: '#94A3B8',
              },
            ]}>
            {state || 'Select State'}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#64748B"
          />

        </TouchableOpacity>

      </View>


      {/* District */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          District *
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryButton}
          onPress={() => onChangeDistrict('Gautam Buddha Nagar')}>

          <Text
            style={[
              styles.categoryText,
              !district && {
                color: '#94A3B8',
              },
            ]}>
            {district || 'Select District'}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#64748B"
          />

        </TouchableOpacity>

      </View>


      {/* Block */}

      <View style={styles.fieldContainer}>

        <Text style={styles.label}>
          Block *
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.categoryButton}
          onPress={() => onChangeBlock('Bisrakh')}>

          <Text
            style={[
              styles.categoryText,
              !block && {
                color: '#94A3B8',
              },
            ]}>
            {block || 'Select Block'}
          </Text>

          <Ionicons
            name="chevron-down"
            size={20}
            color="#64748B"
          />

        </TouchableOpacity>

      </View>


      {/* Current GPS Address */}

      <View style={styles.fieldContainer}>

        <View style={styles.addressHeader}>

          <Text style={styles.label}>
            Current Address
          </Text>

          <Text style={styles.locationHint}>
            Tap to refresh
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.75}
          disabled={loadingLocation}
          style={styles.addressContainer}
          onPress={ongetCurrentLocation}>

          <View style={styles.locationIconContainer}>
            <Ionicons
              name="location"
              size={20}
              color="#2563EB"
            />
          </View>

          <Text
            style={styles.addressText}
            numberOfLines={2}>

            {loadingLocation
              ? 'Fetching current location...'
              : address || 'Tap to get current location'}

          </Text>

          <View style={styles.refreshContainer}>

            {loadingLocation ? (
              <ActivityIndicator
                size="small"
                color="#2563EB"
              />
            ) : (
              <Ionicons
                name="refresh-outline"
                size={21}
                color="#2563EB"
              />
            )}

          </View>

        </TouchableOpacity>

      </View>


      {/* Manual Address */}

      <View style={styles.fieldContainer}>

        <Text style={{marginBottom:5, fontSize:14, fontWeight:500}}>
          Enter Address Manually
        </Text>

        <TextInput
          style={styles.manualAddressInput}
          placeholder="Enter complete address"
          placeholderTextColor="#94A3B8"
          value={manualAddress}
          onChangeText={onChangeManualAddress}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

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


  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  label: {
    fontSize: 14,
    // columnGap:2,
    fontWeight: '600',
    color: '#374151',
  },

  locationHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
  },

  addressContainer: {
    minHeight: 64,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F8FAFC',

    borderWidth: 1,
    borderColor: '#DBEAFE',

    borderRadius: 14,

    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,

    backgroundColor: '#EFF6FF',

    justifyContent: 'center',
    alignItems: 'center',

    flexShrink: 0,
  },

  addressText: {
    flex: 1,

    marginLeft: 10,
    marginRight: 8,

    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,

    color: '#374151',
  },

  refreshContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: '#EFF6FF',

    justifyContent: 'center',
    alignItems: 'center',

    flexShrink: 0,
  },



  manualAddressInput: {
    minHeight: 100,

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 14,

    paddingHorizontal: 15,
    paddingVertical: 14,

    backgroundColor: '#FFFFFF',

    color: '#111827',
    fontSize: 15,

    textAlignVertical: 'top',
  },
});