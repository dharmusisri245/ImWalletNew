import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
} from 'react-native'

// ---- Types ----
interface EmployeeData {
  id: string
  name: string
  designation: string
  department: string
  email: string
  phone: string
  employeeCode: string
  walletBalance: string
  joinDate: string
}

// ---- Mock data (replace with API response later) ----
const MOCK_EMPLOYEE: EmployeeData = {
  id: 'EMP-2024-0091',
  name: 'Aarav Sharma',
  designation: 'Senior Product Manager',
  department: 'Digital Wallet & Payments',
  email: 'aarav.sharma@finpay.com',
  phone: '+91 98765 43210',
  employeeCode: 'FP-091',
  walletBalance: '₹1,24,560.00',
  joinDate: '14 Mar 2022',
}

const COLORS = {
  bg: '#FAFAFB',
  card: '#FFFFFF',
  cardSoft: '#F5F6F8',
  navy: '#0B1A33',
  gold: '#C9A24B',
  goldLight: '#F4EBD6',
  text: '#141A24',
  subtext: '#8A93A3',
  border: '#ECEEF2',
  danger: '#E5484D',
  dangerBg: '#FDEEEE',
  success: '#1F9D6C',
  successBg: '#E9F8F1',
}

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState<EmployeeData>(MOCK_EMPLOYEE)
  const [draft, setDraft] = useState<EmployeeData>(MOCK_EMPLOYEE)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  const initials = employee.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleEdit = () => {
    setDraft(employee)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setDraft(employee)
    setIsEditing(false)
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: integrate real API
      // const res = await fetch(`${API_BASE_URL}/employees/${employee.id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      //   body: JSON.stringify(draft),
      // })
      // const updated = await res.json()
      // setEmployee(updated)

      await new Promise((r) => setTimeout(r, 600)) // fake latency
      setEmployee(draft)
      setIsEditing(false)
    } catch (err) {
      Alert.alert('Update failed', 'Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Profile',
      'This action cannot be undone. Are you sure you want to delete this employee profile?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            // TODO: integrate real API
            // await fetch(`${API_BASE_URL}/employees/${employee.id}`, { method: 'DELETE' })
            Alert.alert('Deleted', 'Employee profile removed.')
          },
        },
      ]
    )
  }

  const updateField = (key: keyof EmployeeData, value: string) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const Field = ({
    label,
    keyName,
    editable = true,
  }: {
    label: string
    keyName: keyof EmployeeData
    editable?: boolean
  }) => (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.fieldInput}
          value={draft[keyName]}
          onChangeText={(t) => updateField(keyName, t)}
          placeholderTextColor={COLORS.subtext}
        />
      ) : (
        <Text style={styles.fieldValue}>{employee[keyName]}</Text>
      )}
    </View>
  )

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerEyebrow}>FinPay Wallet</Text>
            <Text style={styles.headerTitle}>Employee Profile</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{employee.employeeCode}</Text>
          </View>
        </View>

        {/* Avatar + name card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
          </View>

          {isEditing ? (
            <TextInput
              style={styles.nameInput}
              value={draft.name}
              onChangeText={(t) => updateField('name', t)}
              placeholder="Full name"
              placeholderTextColor={COLORS.subtext}
            />
          ) : (
            <Text style={styles.name}>{employee.name}</Text>
          )}

          {isEditing ? (
            <TextInput
              style={styles.designationInput}
              value={draft.designation}
              onChangeText={(t) => updateField('designation', t)}
              placeholder="Designation"
              placeholderTextColor={COLORS.subtext}
            />
          ) : (
            <Text style={styles.designation}>{employee.designation}</Text>
          )}

          <View style={styles.statusPill}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Employee</Text>
          </View>
        </View>

        {/* Wallet balance card */}
        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>{employee.walletBalance}</Text>
          </View>
          <View style={styles.walletIconWrap}>
            <Text style={styles.walletIcon}>₹</Text>
          </View>
        </View>

        {/* Details section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Details</Text>
          {!isEditing && (
            <TouchableOpacity onPress={handleEdit} style={styles.editBtn}>
              <Text style={styles.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.detailsCard}>
          <Field label="Employee ID" keyName="id" editable={false} />
          <View style={styles.divider} />
          <Field label="Department" keyName="department" />
          <View style={styles.divider} />
          <Field label="Email" keyName="email" />
          <View style={styles.divider} />
          <Field label="Phone" keyName="phone" />
          <View style={styles.divider} />
          <Field label="Joined" keyName="joinDate" editable={false} />
        </View>

        {/* Action buttons */}
        {isEditing ? (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, styles.cancelBtn]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, styles.saveBtn]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveBtnText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>Delete Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  )
}

export default EmployeeProfile

const shadow = {
  shadowColor: '#0B1A33',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.06,
  shadowRadius: 20,
  elevation: 3,
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 32,
    paddingBottom: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 22,
  },
  headerEyebrow: {
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerTitle: {
    color: COLORS.navy,
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  headerBadge: {
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },
  headerBadgeText: {
    color: '#8A6D1F',
    fontSize: 12,
    fontWeight: '700',
  },
  profileCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 16,
    ...shadow,
  },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: COLORS.gold,
    padding: 4,
    marginBottom: 16,
  },
  avatar: {
    flex: 1,
    borderRadius: 46,
    backgroundColor: COLORS.navy,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.gold,
    fontSize: 32,
    fontWeight: '700',
  },
  name: {
    color: COLORS.navy,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 4,
  },
  nameInput: {
    color: COLORS.navy,
    fontSize: 21,
    fontWeight: '800',
    marginBottom: 4,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.gold,
    textAlign: 'center',
    minWidth: 220,
    paddingVertical: 3,
  },
  designation: {
    color: COLORS.subtext,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  designationInput: {
    color: COLORS.subtext,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    textAlign: 'center',
    minWidth: 220,
    paddingVertical: 3,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 7,
  },
  statusText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  walletCard: {
    backgroundColor: COLORS.navy,
    borderRadius: 22,
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 26,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
  },
  walletLabel: {
    color: '#B8C2D6',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  walletAmount: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  walletIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.navy,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    color: COLORS.navy,
    fontSize: 16,
    fontWeight: '800',
  },
  editBtn: {
    backgroundColor: COLORS.goldLight,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 16,
  },
  editBtnText: {
    color: '#8A6D1F',
    fontSize: 13,
    fontWeight: '700',
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 4,
    marginBottom: 26,
    ...shadow,
  },
  fieldRow: {
    paddingVertical: 15,
  },
  fieldLabel: {
    color: COLORS.subtext,
    fontSize: 11.5,
    marginBottom: 6,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  fieldValue: {
    color: COLORS.text,
    fontSize: 15.5,
    fontWeight: '600',
  },
  fieldInput: {
    color: COLORS.text,
    fontSize: 15.5,
    fontWeight: '600',
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.gold,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: COLORS.cardSoft,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cancelBtnText: {
    color: COLORS.subtext,
    fontWeight: '700',
    fontSize: 14.5,
  },
  saveBtn: {
    backgroundColor: COLORS.navy,
    shadowColor: COLORS.navy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14.5,
  },
  deleteBtn: {
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    backgroundColor: COLORS.dangerBg,
  },
  deleteBtnText: {
    color: COLORS.danger,
    fontWeight: '700',
    fontSize: 14.5,
  },
})