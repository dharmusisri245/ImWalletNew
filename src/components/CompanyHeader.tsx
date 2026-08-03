import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    ViewStyle,
    StyleProp,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Ionicons from '@react-native-vector-icons/ionicons';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CompanyHeaderProps {
    title: string;
    subtitle?: string;

    showBack?: boolean;

    onBackPress?: () => void;

    showNotification?: boolean;

    notificationCount?: number;

    showProfile?: boolean;

    profileInitial?: string;

    style?: StyleProp<ViewStyle>;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({
    title,
    subtitle = 'Attendance Management',

    showBack = true,

    onBackPress,

    showNotification = true,

    notificationCount = 0,

    showProfile = true,

    profileInitial = 'DG',

    style,
}) => {

    const navigation = useNavigation();

    const handleBack = () => {

        if (onBackPress) {
            onBackPress();
            return;
        }

        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    return (

         <SafeAreaView edges={['top'] }style={styles.safeArea}>
            <StatusBar
                backgroundColor="#0936b0"
                barStyle="light-content"
            />
            <LinearGradient
                // colors={['#06308c', '#062c93']}
                colors={['#ffff', '#ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.container, style]}>

                {/* Back Button */}
                
                {showBack ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleBack}
                        style={styles.backButton}>

                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color="#e6c8c8"
                        />

                    </TouchableOpacity>

                ) : (

                    <View style={styles.emptySpace} />

                )}

                {/* Title Section */}

                <View style={styles.titleContainer}>

                    <Text
                        numberOfLines={1}
                        style={styles.title}>
                        {title}
                    </Text>

                    <Text
                        numberOfLines={1}
                        style={styles.subtitle}>
                        {subtitle}
                    </Text>

                </View>

                {/* Right Section Starts */}
                {/* Notification Button */}

                {showNotification ? (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.notificationButton}>

                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#FFFFFF"
                        />

                        {notificationCount > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>
                                    {notificationCount > 99
                                        ? '99+'
                                        : notificationCount}
                                </Text>
                            </View>
                        )}

                    </TouchableOpacity>
                ) : (
                    <View style={styles.emptySpace} />
                )}

                {/* Profile */}

                {showProfile && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.profileButton}>

                        <Text style={styles.profileInitial}>
                            {profileInitial}
                        </Text>

                    </TouchableOpacity>
                )}

            </LinearGradient>

        </SafeAreaView>

    );
};

export default CompanyHeader;

const styles = StyleSheet.create({
    safeArea: {
        // backgroundColor: '#1D4ED8',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: Platform.OS === 'android' ? 16 : 0,
        paddingBottom: 25,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.18,
        shadowRadius: 8,
        ...Platform.select({
            ios: {
                // backgroundColor: '#0936b0',
                 paddingHorizontal: -2,
                 paddingVertical: -2,
                 height: 120,
                 borderBottomLeftRadius: 28,
                 borderBottomRightRadius: 28,
                 elevation: 10,
                 shadowColor: '#000',
                 shadowOffset: {
                     width: 0,
                     height: 5,
                 },
                 shadowOpacity: 0.18,
                 shadowRadius: 8,
                // padding: 20,
                 
            },
            android: {
                // backgroundColor: '#0936b0',
            },
        }),
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: 'rgba(124, 51, 118, 0.87)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptySpace: {
        width: 46,
        height: 46,
    },

    titleContainer: {
        flex: 1,
        marginHorizontal: 16,
        fontWeight:700
    },

    title: {
        color: '#011311',
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    subtitle: {
        color: '#100bb1',
        fontSize: 15,
        marginTop: 4,
        fontWeight: '700',
    },

    notificationButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        justifyContent: 'center',
        alignItems: 'center',

        marginRight: 12,

        backgroundColor: 'rgba(60, 3, 3, 0.7)',
    },

    badge: {
        position: 'absolute',

        top: 8,
        right: 8,

        minWidth: 18,
        height: 18,

        borderRadius: 9,

        backgroundColor: '#eb574f',

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 4,

        borderWidth: 2,
        borderColor: '#264078',
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },

    profileButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        backgroundColor: '#0926b7',

        justifyContent: 'center',
        alignItems: 'center',
    },

    profileInitial: {
        color: '#9eb2dd',
        fontSize: 18,
        fontWeight: '700',
    },
});