import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import BottomSheet from '@gorhom/bottom-sheet';

import Ionicons from '@react-native-vector-icons/ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    launchCamera,
    Asset,
} from 'react-native-image-picker';

import dayjs from 'dayjs';

import ShopInfoCard from '../../components/Visit/ShopInfoCard';

import VisitTimer from '../../components/Visit/VisitTimer';
import OutcomeSelector, {
    VisitOutcome,
} from '../../components/Visit/OutcomeSelector';

import LocationService from '../../services/LocationService';
import AppHeader from '../../components/AppHeader';

const ShopVisitScreen = ({ navigation }: any) => {

    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [mobile, setMobile] = useState('');
    const [category, setCategory] = useState('');

    // DATE PICKER SYSTEM WE HAVE TO APPLY HERE ===================
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Address can still come from GPS

    const [address, setAddress] = useState('');

    const outcomeSheetRef =
        useRef<BottomSheet>(null);

    const visitStartTime =
        useRef(new Date());

    const [loading, setLoading] =
        useState(false);

    const [currentLocation, setCurrentLocation] =
        useState<any>(null);

    const [accuracy, setAccuracy] =
        useState(0);

    const [distance, setDistance] =
        useState(0);

    const [notes, setNotes] =
        useState('');

    const [selectedOutcome, setSelectedOutcome] =
        useState<VisitOutcome>();

    const [followUpDate, setFollowUpDate] =
        useState('');

    const [followUpTime, setFollowUpTime] =
        useState('');

    const [followUpReason, setFollowUpReason] =
        useState('');

    const [shopImages, setShopImages] =
        useState<Asset[]>([]);

    const [shop, setShop] =
        useState({

            id: '1',
            shopName: 'ABC Electronics',
            ownerName: 'Rajesh Kumar',
            mobile: '+91 9876543210',
            address: 'Sector 62 Noida',
            category: 'Electronics',
        });
    useEffect(() => {
        loadCurrentLocation();
    }, []);

    const loadCurrentLocation =
        async () => {

            try {

                const location =
                    await LocationService.getCurrentLocation();

                setCurrentLocation(location);

                setAccuracy(
                    location.accuracy ?? 0,
                );

                // Later calculate from backend shop location
                setDistance(22);

            } catch (error) {

                console.log(error);

            }

        };

    const openOutcomeSheet = () => {

        outcomeSheetRef.current?.expand();

    };

    const onSelectOutcome = (
        value: VisitOutcome,
    ) => {

        setSelectedOutcome(value);

    };

    const openCamera = () => {

        launchCamera(
            {
                mediaType: 'photo',

                cameraType: 'back',

                quality: 0.8,

                saveToPhotos: false,
            },
            response => {

                if (response.didCancel) {
                    return;
                }

                if (response.errorCode) {

                    Alert.alert(
                        'Camera',
                        response.errorMessage ??
                        'Unable to open camera.',
                    );

                    return;
                }

                if (response.assets) {

                    setShopImages(prev => [
                        ...prev,
                        ...response.assets!,
                    ]);

                }

            },
        );

    };

    const completeVisit = () => {

        if (!selectedOutcome) {

            Alert.alert(
                'Visit',
                'Please select visit outcome.',
            );

            return;

        }

        if (
            selectedOutcome ===
            'Follow-up Required'
        ) {

            if (
                !followUpDate ||
                !followUpTime ||
                !followUpReason
            ) {

                Alert.alert(
                    'Follow-up',
                    'Please complete follow-up details.',
                );

                return;

            }

        }

        navigation.navigate('LeadDetailsScreen', {
            shop: {
                shopName,
                ownerName,
                mobile,
                category,
                address,
            },
            notes,
            outcome: selectedOutcome,
        });

    };

    const closeFollowUp = () => {
        setSelectedOutcome(undefined);
        setFollowUpDate('');
        setFollowUpTime('');
        setFollowUpReason('');
    };
    
    return (
        <SafeAreaView
            style={styles.container}
            edges={['top']}>

            <AppHeader
                title="Shop Visit"
                subtitle="Lead Generation"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}>

                <ShopInfoCard
                    shopName={shopName}
                    ownerName={ownerName}
                    mobile={mobile}
                    category={category}
                    address={address}
                    onChangeShopName={setShopName}
                    onChangeOwnerName={setOwnerName}
                    onChangeMobile={setMobile}
                    onChangeCategory={setCategory}
                />

                <View style={styles.space} />

                <VisitTimer
                    startTime={visitStartTime.current}
                />

                <View style={styles.space} />

                {/* Current Location */}

                <View style={styles.card}>

                    <View style={styles.cardHeader}>
                        <Ionicons
                            name="location"
                            size={22}
                            color="#0936B0"
                        />

                        <Text style={styles.cardTitle}>
                            Current Location
                        </Text>

                    </View>

                    <View style={styles.infoRow}>

                        <Text style={styles.label}>
                            Latitude
                        </Text>

                        <Text style={styles.value}>
                            {currentLocation?.latitude ?? '--'}
                        </Text>

                    </View>

                    <View style={styles.infoRow}>

                        <Text style={styles.label}>
                            Longitude
                        </Text>

                        <Text style={styles.value}>
                            {currentLocation?.longitude ?? '--'}
                        </Text>

                    </View>

                    <View style={styles.infoRow}>

                        <Text style={styles.label}>
                            Accuracy
                        </Text>

                        <Text style={styles.value}>
                            {accuracy.toFixed(2)}
                        </Text>

                    </View>

                    <View style={styles.infoRow}>

                        <Text style={styles.label}>
                            Distance
                        </Text>

                        <Text style={styles.value}>
                            {distance} m
                        </Text>

                    </View>

                </View>

                <View style={styles.space} />

                {/* Visit Notes */}

                <View style={styles.card}>

                    <View style={styles.cardHeader}>

                        <Ionicons
                            name="document-text-outline"
                            size={22}
                            color="#0936B0"
                        />

                        <Text style={styles.cardTitle}>
                            Visit Notes
                        </Text>

                    </View>

                    <TextInput
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        textAlignVertical="top"
                        placeholder="Enter customer discussion..."
                        placeholderTextColor="#94A3B8"
                        style={styles.notesInput}
                    />
                </View>

                <View style={styles.space} />

                {/* Shop Images */}

                <View style={styles.card}>

                    <View style={styles.cardHeader}>

                        <Ionicons
                            name="camera-outline"
                            size={22}
                            color="#0936B0"
                        />

                        <Text style={styles.cardTitle}>
                            Shop Images
                        </Text>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.cameraButton}
                        onPress={openCamera}>

                        <Ionicons
                            name="camera"
                            size={24}
                            color="#FFFFFF"
                        />

                        <Text style={styles.cameraText}>
                            Capture Shop Image
                        </Text>

                    </TouchableOpacity>

                    {

                        shopImages.map((image, index) => (

                            <View
                                key={index}
                                style={styles.imageRow}>

                                <Ionicons
                                    name="image-outline"
                                    size={20}
                                    color="#10B981"
                                />
                                <Text
                                    numberOfLines={1}
                                    style={styles.imageName}>

                                    {image.fileName ??
                                        `Image ${index + 1}`}

                                </Text>

                            </View>

                        ))

                    }

                </View>

                <View style={styles.space} />
                {/* Visit Outcome */}

                <View style={styles.card}>

                    <View style={styles.cardHeader}>

                        <Ionicons
                            name="checkmark-done-circle-outline"
                            size={22}
                            color="#0936B0"
                        />

                        <Text style={styles.cardTitle}>
                            Visit Outcome
                        </Text>

                    </View>

                    <TouchableOpacity
                        activeOpacity={0.85}
                        style={styles.outcomeButton}
                        onPress={openOutcomeSheet}>

                        <View style={styles.outcomeLeft}>

                            <Ionicons
                                name="clipboard-outline"
                                size={20}
                                color="#0936B0"
                            />

                            <Text style={styles.outcomeText}>

                                {selectedOutcome ??
                                    'Select Visit Outcome'}

                            </Text>

                        </View>

                        <Ionicons
                            name="chevron-down"
                            size={22}
                            color="#64748B"
                        />

                    </TouchableOpacity>

                </View>

                {

                    selectedOutcome ===
                    'Follow-up Required' && (

                        <View style={styles.card}>

                            <View style={styles.cardHeader}>

                                <Ionicons
                                    name="calendar-outline"
                                    size={22}
                                    color="#0936B0"
                                />

                                <Text style={styles.cardTitle}>
                                    Follow-up Details
                                </Text>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={closeFollowUp}>
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color="#64748B"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(true)}>

                                <Text
                                    style={{
                                        color: followUpDate ? '#111827' : '#94A3B8',
                                        fontSize: 15,
                                    }}>
                                    {followUpDate || 'Select Follow-up Date'}
                                </Text>

                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    minimumDate={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowDatePicker(false);

                                        if (selectedDate) {
                                            setDate(selectedDate);

                                            setFollowUpDate(
                                                selectedDate.toLocaleDateString(),
                                            );
                                        }
                                    }}
                                />
                            )}

                            <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowTimePicker(true)}>

                                <Text
                                    style={{
                                        color: followUpTime ? '#111827' : '#94A3B8',
                                        fontSize: 15,
                                    }}>
                                    {followUpTime || 'Select Follow-up Time'}
                                </Text>

                            </TouchableOpacity>
                            {showTimePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="time"
                                    display="default"
                                    onChange={(event, selectedTime) => {
                                        setShowTimePicker(false);

                                        if (selectedTime) {
                                            setFollowUpTime(
                                                selectedTime.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                }),
                                            );
                                        }
                                    }}
                                />
                            )}

                            <TextInput
                                value={followUpReason}
                                onChangeText={setFollowUpReason}
                                placeholder="Reason for Follow-up"
                                placeholderTextColor="#94A3B8"
                                multiline
                                textAlignVertical="top"
                                style={styles.notesInput}
                            />

                        </View>

                    )

                }

                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.completeButton}
                    onPress={completeVisit}>

                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#FFFFFF"
                    />

                    <Text style={styles.completeText}>
                        Complete Visit
                    </Text>

                </TouchableOpacity>

                <View style={{ height: 80 }} />

            </ScrollView>

            <OutcomeSelector
                ref={outcomeSheetRef}
                onSelect={onSelectOutcome}
            />

        </SafeAreaView>

    );

};

export default ShopVisitScreen;

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

        shadowColor: '#000',

        shadowOpacity: 0.08,

        shadowRadius: 8,

        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 4,
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

        alignItems: 'center',

        paddingVertical: 10,

        borderBottomWidth: 1,

        borderBottomColor: '#EEF2F7',
    },

    label: {

        fontSize: 15,

        color: '#64748B',

        fontWeight: '600',
    },

    value: {

        fontSize: 15,

        color: '#111827',

        fontWeight: '700',
    },

    notesInput: {

        minHeight: 130,

        borderWidth: 1,

        borderColor: '#E5E7EB',

        borderRadius: 14,

        padding: 14,

        fontSize: 15,

        color: '#111827',

        backgroundColor: '#FAFAFA',
    },

    input: {

        height: 50,

        borderWidth: 1,

        borderColor: '#E5E7EB',

        borderRadius: 14,

        paddingHorizontal: 15,

        marginBottom: 14,

        fontSize: 15,

        color: '#111827',

        backgroundColor: '#FAFAFA',
    },

    cameraButton: {

        height: 52,

        borderRadius: 14,

        backgroundColor: '#0936B0',

        flexDirection: 'row',

        justifyContent: 'center',

        alignItems: 'center',
    },

    cameraText: {

        marginLeft: 10,

        color: '#FFFFFF',

        fontWeight: '700',

        fontSize: 16,
    },

    imageRow: {

        flexDirection: 'row',

        alignItems: 'center',

        marginTop: 14,

        padding: 12,

        backgroundColor: '#F8FAFC',

        borderRadius: 12,
    },

    imageName: {

        marginLeft: 10,

        flex: 1,

        fontSize: 14,

        color: '#334155',
    },

    outcomeButton: {

        height: 56,

        borderWidth: 1,

        borderColor: '#CBD5E1',

        borderRadius: 14,

        paddingHorizontal: 16,

        flexDirection: 'row',

        justifyContent: 'space-between',

        alignItems: 'center',

        backgroundColor: '#FAFAFA',
    },

    outcomeLeft: {

        flexDirection: 'row',

        alignItems: 'center',
    },
    closeButton: {
        height: 50,
        justifyContent: 'space-around',
        paddingLeft: 120
    },

    outcomeText: {

        marginLeft: 10,

        fontSize: 15,

        color: '#111827',

        fontWeight: '600',
    },

    completeButton: {

        marginTop: 22,

        height: 58,

        borderRadius: 18,

        backgroundColor: '#16A34A',

        justifyContent: 'center',

        alignItems: 'center',

        flexDirection: 'row',

        shadowColor: '#16A34A',

        shadowOpacity: 0.30,

        shadowRadius: 8,

        shadowOffset: {
            width: 0,
            height: 5,
        },

        elevation: 6,
    },

    completeText: {

        marginLeft: 10,

        color: '#FFFFFF',

        fontSize: 17,

        fontWeight: '700',
    },

});