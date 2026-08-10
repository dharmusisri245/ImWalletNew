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
    Platform,
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
import { Calendar } from 'react-native-calendars';
import VisitTimer from '../../components/Visit/VisitTimer';
import OutcomeSelector, {
    VisitOutcome,
} from '../../components/Visit/OutcomeSelector';

import LocationService from '../../services/LocationService';
import AppHeader from '../../components/AppHeader';
import { reverseGeocode$ } from '../../services/GeocodingService';
import FollowUpTimePicker from '../../components/common/FollowUpTimePicker';

const ShopVisitScreen = ({ navigation }: any) => {

    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [mobile, setMobile] = useState('');
    const [category, setCategory] = useState('');



    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [block, setBlock] = useState('');
    const [manualAddress, setManualAddress] = useState('');

    // DATE PICKER SYSTEM WE HAVE TO APPLY HERE ===================
    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    // Address can still come from GPS

    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    // const [currentLocation, setCurrentLocation] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [accuracy, setAccuracy] = useState(0);
    const [distance, setDistance] = useState(0);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const outcomeSheetRef = useRef<BottomSheet>(null);
    const visitStartTime = useRef(new Date());


    const [notes, setNotes] = useState('');

    const [selectedOutcome, setSelectedOutcome] = useState<VisitOutcome>();

    const [followUpDate, setFollowUpDate] = useState('');

    const [followUpTime, setFollowUpTime] = useState('');

    const [followUpReason, setFollowUpReason] = useState('');

    const [shopImages, setShopImages] = useState<Asset[]>([]);

    const [shop, setShop] = useState({

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

                console.log('complete location', location);

                console.log(
                    'latitude of location:',
                    location.latitude,
                );

                console.log(
                    'longitude of location:',
                    location.longitude,
                );

                setCurrentLocation(location);

                setAccuracy(location.accuracy ?? 0);

                setDistance(22);

                const locationAddress = await reverseGeocode$({
                    latitude: location.latitude,
                    longitude: location.longitude,
                });

                setAddress(locationAddress.displayName);

            } catch (error) {

                console.log(error);

                Alert.alert(
                    'Location Error',
                    error?.message ||
                    'Unable to fetch current location.',
                );
            } finally {
                setLoadingLocation(false)
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

        navigation.navigate('LeadDetails', {
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
                    loadingLocation={loadingLocation}
                    onChangeShopName={setShopName}
                    onChangeOwnerName={setOwnerName}
                    onChangeMobile={setMobile}
                    onChangeCategory={setCategory}
                    getCurrentLoacation={loadCurrentLocation}
                    onChangeState={setState}
                    onChangeDistrict={setDistrict}
                    onChangeBlock={setBlock}
                    onChangeManualAddress={setManualAddress}
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



                            {/* date picckrere on google */}
                            {/* <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowDatePicker(true)}>

                                <Text
                                    style={{
                                        color: followUpDate ? '#111827' : '#94A3B8', alignContent: 'center', marginTop: 15,
                                        fontSize: 15,
                                    }}>
                                    {followUpDate || 'Select Follow-up Date'}
                                </Text>

                            </TouchableOpacity>
                            <View style={styles.preview1}>
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

                            </View> */}


                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.input}
                                onPress={() => {
                                    setShowTimePicker(false);
                                    setShowDatePicker(true);
                                }}
                            >
                                <View style={styles.dateInputContent}>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={20}
                                        color="#2563EB"
                                    />

                                    <Text
                                        style={[
                                            styles.dateInputText,
                                            !followUpDate && styles.placeholderText,
                                        ]}
                                    >
                                        {followUpDate || 'Select Follow-up Date'}
                                    </Text>

                                    <Ionicons
                                        name={showDatePicker ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color="#64748B"
                                    />
                                </View>
                            </TouchableOpacity>

                            {showDatePicker && (
                                <View style={styles.inlineCalendar}>
                                    <Calendar
                                        minDate={new Date().toISOString().split('T')[0]}
                                        onDayPress={day => {
                                            const selectedDate = new Date(day.timestamp);

                                            setDate(selectedDate);

                                            setFollowUpDate(
                                                selectedDate.toLocaleDateString(),
                                            );

                                            // Automatically close calendar
                                            setShowDatePicker(false);
                                        }}
                                    />
                                </View>
                            )}

                            {/* time picker */}

                            {/* <TouchableOpacity
                                style={styles.input}
                                onPress={() => setShowTimePicker(true)}>

                                <Text
                                    style={{
                                        color: followUpTime ? '#111827' : '#94A3B8', marginTop: 15,
                                        fontSize: 15,
                                    }}>
                                    {followUpTime || 'Select Follow-up Time'}
                                </Text>

                            </TouchableOpacity>
                            <View style={styles.preview2}>
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
                            </View> */}



                            {/* <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.input}
                                onPress={() => {
                                    setShowDatePicker(false);
                                    setShowTimePicker(prev => !prev);
                                }}
                            >
                                <View style={styles.dateInputContent}>

                                    <Ionicons
                                        name="time-outline"
                                        size={21}
                                        color="#2563EB"
                                    />

                                    <Text
                                        style={[
                                            styles.dateInputText,
                                            !followUpTime && styles.placeholderText,
                                        ]}
                                    >
                                        {followUpTime || 'Select Follow-up Time'}
                                    </Text>

                                    <Ionicons
                                        name={
                                            showTimePicker
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        size={20}
                                        color="#64748B"
                                    />

                                </View>
                            </TouchableOpacity>

                            {showTimePicker && (
                                <View style={styles.inlineTimePicker}>

                                    <View style={styles.timePickerHeader}>
                                        <View style={styles.timeHeaderLeft}>
                                            <Ionicons
                                                name="time-outline"
                                                size={22}
                                                color="#2563EB"
                                            />

                                            <Text style={styles.timePickerTitle}>
                                                Select Time
                                            </Text>
                                        </View>

                                        <Text style={styles.selectedTimeText}>
                                            {followUpTime || 'Select'}
                                        </Text>
                                    </View>

                                    <View style={styles.timeOptions}>

                                        {[
                                            '09:00 AM',
                                            '09:30 AM',
                                            '10:00 AM',
                                            '10:30 AM',
                                            '11:00 AM',
                                            '11:30 AM',
                                            '12:00 PM',
                                            '12:30 PM',
                                            '01:00 PM',
                                            '01:30 PM',
                                            '02:00 PM',
                                            '02:30 PM',
                                            '03:00 PM',
                                            '03:30 PM',
                                            '04:00 PM',
                                            '04:30 PM',
                                            '05:00 PM',
                                            '05:30 PM',
                                            '06:00 PM',
                                            '06:30 PM',
                                            '07:00 PM',
                                            '07:30 PM',
                                            '08:00 PM',
                                        ].map(time => (
                                            <TouchableOpacity
                                                key={time}
                                                activeOpacity={0.75}
                                                style={[
                                                    styles.timeOption,
                                                    followUpTime === time &&
                                                    styles.selectedTimeOption,
                                                ]}
                                                onPress={() => {
                                                    setFollowUpTime(time);
                                                    setShowTimePicker(false);
                                                }}
                                            >
                                                <Text
                                                    style={[
                                                        styles.timeOptionText,
                                                        followUpTime === time &&
                                                        styles.selectedTimeOptionText,
                                                    ]}
                                                >
                                                    {time}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}

                                    </View>

                                </View>
                            )} */}


                            <FollowUpTimePicker
                                value={followUpTime}
                                onChange={setFollowUpTime}
                                startHour={10}
                                endHour={19}
                                intervalMinutes={30}
                            />


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
        flex: 1,
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
    // closeButton: {
    //     height: 60,
    //     justifyContent: 'space-around',
    //     paddingLeft: Platform.OS === 'ios' ? 120 : 90
    // },

    closeButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
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
    preview1: {
        marginBottom: 12
    },
    preview2: {
        marginBottom: 12
    },
    inlineCalendar: {
        marginTop: 10,
        marginBottom: 14,

        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#E5E7EB',

        borderRadius: 18,

        overflow: 'hidden',

        elevation: 3,

        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    dateInputContent: {
        width: '100%',
        height: '100%',

        flexDirection: 'row',
        alignItems: 'center',
    },

    dateInputText: {
        flex: 1,

        marginLeft: 12,

        fontSize: 16,
        fontWeight: '500',

        color: '#111827',

        includeFontPadding: false,
    },

    placeholderText: {
        color: '#94A3B8',
    },
    // time slector 
    inlineTimePicker: {
        marginTop: -4,
        marginBottom: 14,

        backgroundColor: '#FFFFFF',

        borderWidth: 1,
        borderColor: '#E5E7EB',

        borderRadius: 18,

        padding: 14,

        elevation: 3,

        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    },

    timePickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        paddingBottom: 14,

        borderBottomWidth: 1,
        borderBottomColor: '#EEF2F7',

        marginBottom: 14,
    },

    timeHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    timePickerTitle: {
        marginLeft: 9,

        fontSize: 16,
        fontWeight: '700',

        color: '#111827',
    },

    selectedTimeText: {
        fontSize: 14,
        fontWeight: '700',

        color: '#2563EB',

        backgroundColor: '#EFF6FF',

        paddingHorizontal: 10,
        paddingVertical: 6,

        borderRadius: 10,
    },

    timeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        gap: 10,
    },

    timeOption: {
        width: '30%',

        minHeight: 42,

        borderRadius: 12,

        borderWidth: 1,
        borderColor: '#E5E7EB',

        backgroundColor: '#F8FAFC',

        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 5,
    },

    selectedTimeOption: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },

    timeOptionText: {
        fontSize: 13,

        fontWeight: '600',

        color: '#475569',
    },

    selectedTimeOptionText: {
        color: '#FFFFFF',
    },

});
