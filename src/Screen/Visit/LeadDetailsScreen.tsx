import React, {
  useState,
} from 'react';

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Ionicons from '@react-native-vector-icons/ionicons';
import AppHeader from '../../components/AppHeader';


const PRODUCTS = [
  'UPI QR',
  'POS Machine',
  'Sound Box',
  'Payment Gateway',
  'Business Loan',
  'Current Account',
  'Insurance',
];

const BUSINESS_CATEGORIES = [
  'Electronics',
  'Medical',
  'Restaurant',
  'Fashion',
  'Grocery',
  'Jewellery',
  'Hardware',
  'Mobile',
  'Other',
];

const BUSINESS_TYPES = [
  'Retail',
  'Wholesale',
  'Distributor',
  'Manufacturer',
  'Service Provider',
];

const TRANSACTIONS = [
  '< 50K',
  '50K - 2L',
  '2L - 5L',
  '5L - 10L',
  '10L+',
];

const PRIORITIES = [
  'High',
  'Medium',
  'Low',
];

const LEAD_STATUS = [
  'Interested',
  'Follow-up Required',
  'Decision Pending',
  'Not Interested',
];

const LeadDetailsScreen = ({
  navigation,
  route,
}: any) => {

  const shop =
    route?.params?.shop ?? {

      shopName: 'ABC Electronics',

      ownerName: 'Rajesh Kumar',

      mobile: '+91 9876543210',

      address: 'Sector 62, Noida',

    };

  const [businessName, setBusinessName] =
    useState(shop.shopName);

  const [ownerName, setOwnerName] =
    useState(shop.ownerName);

  const [mobile, setMobile] =
    useState(shop.mobile);

  const [alternateMobile, setAlternateMobile] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [gstNumber, setGstNumber] =
    useState('');

  const [panNumber, setPanNumber] =
    useState('');

  const [businessCategory, setBusinessCategory] =
    useState('');

  const [businessType, setBusinessType] =
    useState('');

  const [transactionRange, setTransactionRange] =
    useState('');

  const [priority, setPriority] =
    useState('Medium');

  const [leadStatus, setLeadStatus] =
    useState('Interested');

  const [selectedProducts, setSelectedProducts] =
    useState<string[]>([]);

  const [remarks, setRemarks] =
    useState('');

  const toggleProduct = (
    product: string,
  ) => {

    if (
      selectedProducts.includes(product)
    ) {

      setSelectedProducts(
        selectedProducts.filter(
          item => item !== product,
        ),
      );

    } else {

      setSelectedProducts([
        ...selectedProducts,
        product,
      ]);

    }

  };

  const saveLead = () => {

    if (!businessName.trim()) {

      Alert.alert(
        'Validation',
        'Business Name is required.',
      );

      return;

    }

    if (!ownerName.trim()) {

      Alert.alert(
        'Validation',
        'Owner Name is required.',
      );

      return;

    }

    console.log({
      businessName,
      ownerName,
      mobile,
      alternateMobile,
      email,
      gstNumber,
      panNumber,
      businessCategory,
      businessType,
      transactionRange,
      priority,
      leadStatus,
      selectedProducts,
      remarks,
    });

    Alert.alert(
      'Success',
      'Lead Saved Successfully.',
    );

    navigation.navigate('VisitDashboard')

  };

  return (

    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <AppHeader
        title="Lead Details"
        subtitle="Create New Lead"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

        {/* Shop Information */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="storefront-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Shop Information
            </Text>

          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shop Name</Text>
            <Text style={styles.infoValue}>
              {shop.shopName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Owner</Text>
            <Text style={styles.infoValue}>
              {shop.ownerName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mobile</Text>
            <Text style={styles.infoValue}>
              {shop.mobile}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Address</Text>
            <Text style={styles.infoValue}>
              {shop.address}
            </Text>
          </View>

        </View>

        <View style={styles.space} />

        {/* Lead Information */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="person-circle-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Lead Information
            </Text>

          </View>

          <TextInput
            value={businessName}
            onChangeText={setBusinessName}
            placeholder="Business Name *"
            style={styles.input}
          />

          <TextInput
            value={ownerName}
            onChangeText={setOwnerName}
            placeholder="Owner Name *"
            style={styles.input}
          />

          <TextInput
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            placeholder="Mobile Number *"
            style={styles.input}
          />

          <TextInput
            value={alternateMobile}
            onChangeText={setAlternateMobile}
            keyboardType="phone-pad"
            placeholder="Alternate Mobile"
            style={styles.input}
          />

          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email Address"
            style={styles.input}
          />

        </View>

        <View style={styles.space} />

        {/* Business Details */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="business-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Business Details
            </Text>

          </View>

          <TextInput
            value={gstNumber}
            onChangeText={setGstNumber}
            placeholder="GST Number"
            autoCapitalize="characters"
            style={styles.input}
          />

          <TextInput
            value={panNumber}
            onChangeText={setPanNumber}
            placeholder="PAN Number"
            autoCapitalize="characters"
            style={styles.input}
          />

          <Text style={styles.sectionLabel}>
            Business Category
          </Text>

          <View style={styles.chipContainer}>

            {BUSINESS_CATEGORIES.map(item => (

              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setBusinessCategory(item)}
                style={[
                  styles.chip,
                  businessCategory === item &&
                  styles.activeChip,
                ]}>

                <Text
                  style={[
                    styles.chipText,
                    businessCategory === item &&
                    styles.activeChipText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

          <Text style={styles.sectionLabel}>
            Business Type
          </Text>

          <View style={styles.chipContainer}>

            {BUSINESS_TYPES.map(item => (

              <TouchableOpacity
                key={item}
                activeOpacity={0.8}
                onPress={() => setBusinessType(item)}
                style={[
                  styles.chip,
                  businessType === item &&
                  styles.activeChip,
                ]}>

                <Text
                  style={[
                    styles.chipText,
                    businessType === item &&
                    styles.activeChipText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

        <View style={styles.space} />
        {/* Interested Products */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="cube-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Interested Products
            </Text>

          </View>

          <View style={styles.chipContainer}>

            {PRODUCTS.map(product => (

              <TouchableOpacity
                key={product}
                activeOpacity={0.85}
                onPress={() => toggleProduct(product)}
                style={[
                  styles.chip,
                  selectedProducts.includes(product) &&
                  styles.activeChip,
                ]}>

                <Ionicons
                  name={
                    selectedProducts.includes(product)
                      ? 'checkmark-circle'
                      : 'ellipse-outline'
                  }
                  size={18}
                  color={
                    selectedProducts.includes(product)
                      ? '#FFFFFF'
                      : '#64748B'
                  }
                  style={{ marginRight: 6 }}
                />

                <Text
                  style={[
                    styles.chipText,
                    selectedProducts.includes(product) &&
                    styles.activeChipText,
                  ]}>

                  {product}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

        <View style={styles.space} />

        {/* Monthly Transaction */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="cash-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Monthly Transaction
            </Text>

          </View>

          <View style={styles.chipContainer}>

            {TRANSACTIONS.map(item => (

              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                onPress={() => setTransactionRange(item)}
                style={[
                  styles.chip,
                  transactionRange === item &&
                  styles.activeChip,
                ]}>

                <Text
                  style={[
                    styles.chipText,
                    transactionRange === item &&
                    styles.activeChipText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

        <View style={styles.space} />

        {/* Lead Priority */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="flag-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Lead Priority
            </Text>

          </View>

          <View style={styles.chipContainer}>

            {PRIORITIES.map(item => (

              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                onPress={() => setPriority(item)}
                style={[
                  styles.chip,
                  priority === item &&
                  styles.activeChip,
                ]}>

                <Text
                  style={[
                    styles.chipText,
                    priority === item &&
                    styles.activeChipText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

        <View style={styles.space} />

        {/* Lead Status */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="analytics-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Lead Status
            </Text>

          </View>

          <View style={styles.chipContainer}>

            {LEAD_STATUS.map(item => (

              <TouchableOpacity
                key={item}
                activeOpacity={0.85}
                onPress={() => setLeadStatus(item)}
                style={[
                  styles.chip,
                  leadStatus === item &&
                  styles.activeChip,
                ]}>

                <Text
                  style={[
                    styles.chipText,
                    leadStatus === item &&
                    styles.activeChipText,
                  ]}>

                  {item}

                </Text>

              </TouchableOpacity>

            ))}

          </View>

        </View>

        <View style={styles.space} />

        {/* Remarks */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="document-text-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Employee Remarks
            </Text>

          </View>

          <TextInput
            value={remarks}
            onChangeText={setRemarks}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            placeholder="Write customer discussion, requirements, objections and additional notes..."
            style={styles.remarksInput}
          />

        </View>

        <View style={styles.space} />
        {/* Document Upload */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Ionicons
              name="cloud-upload-outline"
              size={22}
              color="#0936B0"
            />

            <Text style={styles.cardTitle}>
              Documents
            </Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.uploadButton}>

            <Ionicons
              name="camera-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.uploadText}>
              Upload Shop Photo
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.uploadButton}>

            <Ionicons
              name="person-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.uploadText}>
              Upload Owner Photo
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.uploadButton}>

            <Ionicons
              name="document-text-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.uploadText}>
              Upload GST Document
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.uploadButton}>

            <Ionicons
              name="card-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text style={styles.uploadText}>
              Upload PAN Document 
            </Text>

          </TouchableOpacity>

        </View>

        <View style={styles.space} />

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveButton}
          onPress={saveLead}>

          <Ionicons
            name="save-outline"
            size={24}
            color="#FFFFFF"
          />

          <Text style={styles.saveButtonText}>
            Save Lead
          </Text>

        </TouchableOpacity>

        <View style={{ height: 80 }} />

      </ScrollView>

    </SafeAreaView>

  );

};

export default LeadDetailsScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
  },

  content: {
    padding: 16,
    paddingBottom: 100,
  },

  space: {
    height: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  cardTitle: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F7',
  },

  infoLabel: {
    color: '#64748B',
    fontSize: 15,
    fontWeight: '600',
  },

  infoValue: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 14,
    backgroundColor: '#FAFAFA',
    fontSize: 15,
    color: '#111827',
  },

  sectionLabel: {
    marginBottom: 10,
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#374151',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },

  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  activeChip: {
    backgroundColor: '#0936B0',
  },

  chipText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },

  activeChipText: {
    color: '#FFFFFF',
  },

  remarksInput: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 15,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#111827',
  },

  uploadButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#0936B0',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 12,
  },

  uploadText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    marginLeft: 10,
  },

  saveButton: {
    height: 58,
    borderRadius: 18,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 6,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 10,
  },

});