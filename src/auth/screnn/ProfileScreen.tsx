import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
    );
  };

  const MenuItem = ({ icon, title, onPress, color = '#111827' }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Feather name={icon} size={20} color={color} />
        <Text style={[styles.itemText, { color }]}>{title}</Text>
      </View>

      <Feather name="chevron-right" size={18} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>DG</Text>
        </View>

        <Text style={styles.name}>Dharmendra Gupta</Text>
        <Text style={styles.designation}>Associate System Engineer</Text>
      </View>

      {/* Menu */}
      <View style={styles.card}>
        <MenuItem
          icon="user"
          title="Employee Profile"
          onPress={() => navigation.navigate('EmployeeProfile')}
        />

        <MenuItem
          icon="calendar"
          title="Attendance"
          onPress={() => navigation.navigate('AttendanceManagement')}
        />

        <MenuItem
          icon="clipboard"
          title="Leave Management"
          onPress={() => navigation.navigate('LeaveManagement')}
        />

        <MenuItem
          icon="settings"
          title="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        <MenuItem
          icon="log-out"
          title="Logout"
          color="#EF4444"
          onPress={logout}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    padding: 16,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 12,
    color: '#111827',
  },

  designation: {
    color: '#6B7280',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemText: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '600',
  },
});