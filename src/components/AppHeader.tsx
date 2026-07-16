import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
import Ionicons from "@react-native-vector-icons/ionicons";

const AppHeader = ({
  profileImage,
  notificationCount = 0,
  onHelpPress,
  onNotificationPress,
}: any) => {
  return (
    <View style={styles.appHeader}>
      <Image
        source={{
          uri:
            profileImage ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100",
        }}
        style={styles.avatar}
      />

      <View style={styles.logoWrap}>
        <Text style={styles.logo}>ImWallet</Text>
        <Text style={styles.subLogo}>Finanace</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity
          style={styles.helpBtn}
          onPress={onHelpPress}
        >
          <Ionicons name="headset-outline" size={16} />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bellWrap}
          onPress={onNotificationPress}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
          />

          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {notificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  logoWrap: {
    alignItems: "center",
  },

  logo: {
    fontSize: 24,
    fontWeight: "900",
    color: "#6366f1",
  },

  subLogo: {
    fontSize: 11,
    fontWeight: "700",
    color: "#666",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
  },

  helpBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },

  helpText: {
    marginLeft: 4,
    fontWeight: "600",
  },

  bellWrap: {
    position: "relative",
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});