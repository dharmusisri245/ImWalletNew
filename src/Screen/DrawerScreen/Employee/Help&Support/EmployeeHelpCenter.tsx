// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   SafeAreaView,
//   LayoutAnimation,
//   Platform,
//   UIManager,
//   Dimensions,
//   StatusBar,
// } from 'react-native'
// import Ionicons from '@react-native-vector-icons/ionicons';
// import LinearGradient from 'react-native-linear-gradient';
// import { useNavigation } from '@react-navigation/native'

// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true)
// }

// const { width: SCREEN_WIDTH } = Dimensions.get('window')
// const GRID_PADDING = 20
// const GRID_GAP = 12
// const CARD_WIDTH = (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * 2) / 3

// const COLORS = {
//   primary: '#5B4FE8',
//   primaryDark: '#3D33B8',
//   bg: '#F5F6FA',
//   card: '#FFFFFF',
//   text: '#161A2E',
//   subtext: '#8A8FA3',
//   border: '#EFF1F7',
//   success: '#22C55E',
// }

// const CATEGORIES = [
//   { id: '1', label: 'Account', icon: 'person-circle-outline', tint: '#5B4FE8', tintBg: '#EEEBFF' },
//   { id: '2', label: 'Payments', icon: 'card-outline', tint: '#0EA5A5', tintBg: '#E3F8F8' },
//   { id: '3', label: 'Cards', icon: 'wallet-outline', tint: '#F59E0B', tintBg: '#FEF3DD' },
//   { id: '4', label: 'Security', icon: 'shield-checkmark-outline', tint: '#22C55E', tintBg: '#E7F9EE' },
//   { id: '5', label: 'Transactions', icon: 'swap-horizontal-outline', tint: '#EC4899', tintBg: '#FDE9F3' },
//   { id: '6', label: 'Settings', icon: 'settings-outline', tint: '#64748B', tintBg: '#EEF1F5' },
// ]

// const FAQS = [
//   {
//     id: 'f1',
//     q: 'How do I reset my transaction PIN?',
//     a: 'Go to Settings > Security > Reset PIN. You’ll need to verify your identity via OTP before setting a new one.',
//   },
//   {
//     id: 'f2',
//     q: 'Why is my payout delayed?',
//     a: 'Payouts can take 1-2 business days depending on your bank. If it’s been longer, contact support with your transaction ID.',
//   },
//   {
//     id: 'f3',
//     q: 'How do I update my KYC documents?',
//     a: 'Navigate to Profile > Documents > Update KYC and upload a clear photo of your ID. Approval usually takes under 24 hours.',
//   },
//   {
//     id: 'f4',
//     q: 'Is my data encrypted?',
//     a: 'Yes, all sensitive data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
//   },
// ]

// const EmployeeHelpCenter = () => {
//   const navigation = useNavigation<any>()
//   const [search, setSearch] = useState('')
//   const [expandedId, setExpandedId] = useState<string | null>(null)

//   const toggleFaq = (id: string) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
//     setExpandedId(expandedId === id ? null : id)
//   }

//   const filteredFaqs = FAQS.filter((f) =>
//     f.q.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" />
//       <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
//         {/* Header */}
//         <LinearGradient
//           colors={[COLORS.primary, COLORS.primaryDark]}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={styles.header}
//         >
//           <SafeAreaView>
//             <View style={styles.headerTopRow}>
//               <TouchableOpacity
//                 onPress={() => navigation.goBack()}
//                 style={styles.iconBtn}
//                 hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
//               >
//                 <Ionicons name="chevron-back" size={22} color="#fff" />
//               </TouchableOpacity>
//               <View style={styles.badgePill}>
//                 <Ionicons name="shield-checkmark" size={13} color="#fff" />
//                 <Text style={styles.badgePillText}>24/7 Support</Text>
//               </View>
//             </View>

//             <Text style={styles.headerTitle}>Help Center</Text>
//             <Text style={styles.headerSubtitle}>
//               We're here to help — how can we{'\n'}assist you today?
//             </Text>
//           </SafeAreaView>

//           <View style={styles.searchBar}>
//             <Ionicons name="search" size={18} color={COLORS.subtext} />
//             <TextInput
//               placeholder="Search for help topics"
//               placeholderTextColor={COLORS.subtext}
//               value={search}
//               onChangeText={setSearch}
//               style={styles.searchInput}
//             />
//           </View>
//         </LinearGradient>

//         {/* Quick actions */}
//         <View style={styles.quickActionsRow}>
//           <TouchableOpacity
//             style={[styles.quickAction, styles.quickActionPrimary]}
//             onPress={() => navigation.navigate('ChatScreen')}
//             activeOpacity={0.85}
//           >
//             <View style={[styles.quickActionIconWrap, { backgroundColor: 'rgba(255,255,255,0.22)' }]}>
//               <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
//             </View>
//             <Text style={styles.quickActionPrimaryText}>Chat with AI</Text>
//             <Text style={styles.quickActionSubTextLight}>Instant answers</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.quickAction} activeOpacity={0.85}>
//             <View style={[styles.quickActionIconWrap, { backgroundColor: '#EEEBFF' }]}>
//               <Ionicons name="call" size={20} color={COLORS.primary} />
//             </View>
//             <Text style={styles.quickActionText}>Call Support</Text>
//             <Text style={styles.quickActionSubText}>Mon-Sat, 9-6</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.quickAction} activeOpacity={0.85}>
//             <View style={[styles.quickActionIconWrap, { backgroundColor: '#EEEBFF' }]}>
//               <Ionicons name="mail" size={20} color={COLORS.primary} />
//             </View>
//             <Text style={styles.quickActionText}>Email Us</Text>
//             <Text style={styles.quickActionSubText}>Reply in 24h</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Categories */}
//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>Browse by Category</Text>
//         </View>
//         <View style={styles.categoryGrid}>
//           {CATEGORIES.map((cat) => (
//             <TouchableOpacity
//               key={cat.id}
//               style={[styles.categoryCard, { width: CARD_WIDTH }]}
//               activeOpacity={0.8}
//             >
//               <View style={[styles.categoryIconWrap, { backgroundColor: cat.tintBg }]}>
//                 <Ionicons name={cat.icon as any} size={22} color={cat.tint} />
//               </View>
//               <Text style={styles.categoryLabel}>{cat.label}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* FAQs */}
//         <View style={styles.sectionHeaderRow}>
//           <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
//         </View>
//         <View style={styles.faqContainer}>
//           {filteredFaqs.map((faq) => {
//             const isOpen = expandedId === faq.id
//             return (
//               <TouchableOpacity
//                 key={faq.id}
//                 style={[styles.faqItem, isOpen && styles.faqItemOpen]}
//                 activeOpacity={0.85}
//                 onPress={() => toggleFaq(faq.id)}
//               >
//                 <View style={styles.faqQuestionRow}>
//                   <Text style={styles.faqQuestion}>{faq.q}</Text>
//                   <View style={[styles.faqChevronWrap, isOpen && styles.faqChevronWrapOpen]}>
//                     <Ionicons
//                       name={isOpen ? 'chevron-up' : 'chevron-down'}
//                       size={16}
//                       color={isOpen ? '#fff' : COLORS.subtext}
//                     />
//                   </View>
//                 </View>
//                 {isOpen && <Text style={styles.faqAnswer}>{faq.a}</Text>}
//               </TouchableOpacity>
//             )
//           })}
//           {filteredFaqs.length === 0 && (
//             <View style={styles.noResultBox}>
//               <Ionicons name="search-outline" size={28} color={COLORS.subtext} />
//               <Text style={styles.noResultText}>No results found for "{search}"</Text>
//             </View>
//           )}
//         </View>

//         {/* Bottom CTA */}
//         <LinearGradient
//           colors={['#EEEBFF', '#F5F6FA']}
//           style={styles.ctaCard}
//         >
//           <View style={styles.ctaIconWrap}>
//             <Ionicons name="headset-outline" size={24} color={COLORS.primary} />
//           </View>
//           <Text style={styles.ctaTitle}>Still need help?</Text>
//           <Text style={styles.ctaSubtitle}>
//             Our AI assistant is available 24/7 to answer your questions instantly.
//           </Text>
//           <TouchableOpacity
//             style={styles.ctaButton}
//             onPress={() => navigation.navigate('ChatScreen')}
//             activeOpacity={0.85}
//           >
//             <Text style={styles.ctaButtonText}>Start a Chat</Text>
//             <Ionicons name="arrow-forward" size={16} color="#fff" />
//           </TouchableOpacity>
//         </LinearGradient>

//         <View style={{ height: 32 }} />
//       </ScrollView>
//     </View>
//   )
// }

// export default EmployeeHelpCenter

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.bg,
//   },
//   header: {
//     paddingHorizontal: 10,
//     paddingBottom: 30,
//     borderBottomLeftRadius: 28,
//     borderBottomRightRadius: 28,
//   },
//   headerTopRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 2,
//     marginBottom: 9,
//   },
//   iconBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255,255,255,0.16)',
//   },
//   badgePill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//     backgroundColor: 'rgba(255,255,255,0.16)',
//     paddingHorizontal: 10,
//     height: 28,
//     borderRadius: 14,
//   },
//   badgePillText: {
//     color: '#fff',
//     fontSize: 11,
//     fontWeight: '600',
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#fff',
//     letterSpacing: -0.5,
//   },
//   headerSubtitle: {
//     fontSize: 14,
//     color: 'rgba(255,255,255,0.82)',
//     marginTop: 6,
//     lineHeight: 20,
//   },
//   searchBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     paddingHorizontal: 2,
//     height: 50,
//     marginTop: 22,
//     gap: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 14,
//     elevation: 4,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 14,
//     color: COLORS.text,
//   },
//   quickActionsRow: {
//     flexDirection: 'row',
//     paddingHorizontal: 20,
//     marginTop: -16,
//     gap: 10,
//   },
//   quickAction: {
//     flex: 1,
//     backgroundColor: COLORS.card,
//     borderRadius: 18,
//     padding: 14,
//     shadowColor: '#1A1A2E',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//     elevation: 2,
//   },
//   quickActionPrimary: {
//     backgroundColor: COLORS.primary,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.3,
//   },
//   quickActionIconWrap: {
//     width: 34,
//     height: 34,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   quickActionText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: COLORS.text,
//   },
//   quickActionPrimaryText: {
//     fontSize: 13,
//     fontWeight: '700',
//     color: '#fff',
//   },
//   quickActionSubText: {
//     fontSize: 11,
//     color: COLORS.subtext,
//     marginTop: 2,
//   },
//   quickActionSubTextLight: {
//     fontSize: 11,
//     color: 'rgba(255,255,255,0.75)',
//     marginTop: 2,
//   },
//   sectionHeaderRow: {
//     paddingHorizontal: 20,
//     marginTop: 28,
//     marginBottom: 14,
//   },
//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: '800',
//     color: COLORS.text,
//     letterSpacing: -0.3,
//   },
//   categoryGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: GRID_PADDING,
//     justifyContent: 'space-between',
//     rowGap: GRID_GAP,
//   },
//   categoryCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: 16,
//     paddingVertical: 16,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.border,
//   },
//   categoryIconWrap: {
//     width: 42,
//     height: 42,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//   },
//   categoryLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: COLORS.text,
//   },
//   faqContainer: {
//     paddingHorizontal: 20,
//   },
//   faqItem: {
//     backgroundColor: COLORS.card,
//     borderRadius: 16,
//     padding: 16,
//     borderWidth: 1,
//     borderColor: COLORS.border,
//     marginBottom: 10,
//   },
//   faqItemOpen: {
//     borderColor: COLORS.primary,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.12,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 12,
//     elevation: 2,
//   },
//   faqQuestionRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     gap: 10,
//   },
//   faqQuestion: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: '600',
//     color: COLORS.text,
//   },
//   faqChevronWrap: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: COLORS.bg,
//   },
//   faqChevronWrapOpen: {
//     backgroundColor: COLORS.primary,
//   },
//   faqAnswer: {
//     fontSize: 13,
//     color: COLORS.subtext,
//     marginTop: 12,
//     lineHeight: 20,
//   },
//   noResultBox: {
//     alignItems: 'center',
//     paddingVertical: 30,
//     gap: 8,
//   },
//   noResultText: {
//     color: COLORS.subtext,
//     fontSize: 13,
//   },
//   ctaCard: {
//     marginHorizontal: 20,
//     marginTop: 28,
//     borderRadius: 22,
//     padding: 24,
//     alignItems: 'center',
//   },
//   ctaIconWrap: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#1A1A2E',
//     shadowOpacity: 0.06,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   ctaTitle: {
//     fontSize: 16,
//     fontWeight: '800',
//     color: COLORS.text,
//     marginTop: 12,
//   },
//   ctaSubtitle: {
//     fontSize: 13,
//     color: COLORS.subtext,
//     textAlign: 'center',
//     marginTop: 6,
//     lineHeight: 18,
//   },
//   ctaButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 22,
//     paddingVertical: 12,
//     borderRadius: 14,
//     marginTop: 18,
//     shadowColor: COLORS.primary,
//     shadowOpacity: 0.3,
//     shadowOffset: { width: 0, height: 6 },
//     shadowRadius: 10,
//     elevation: 3,
//   },
//   ctaButtonText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 14,
//   },
// })






import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  LayoutAnimation,
  Platform,
  UIManager,
  Dimensions,
  StatusBar,
} from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const GRID_PADDING = 20
const GRID_GAP = 12
const CARD_WIDTH = (SCREEN_WIDTH - GRID_PADDING * 2 - GRID_GAP * 2) / 3

const COLORS = {
  primary: '#5B4FE8',
  primaryDark: '#3D33B8',
  // primaryDark:'#F5F6FA',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#161A2E',
  subtext: '#8A8FA3',
  border: '#EFF1F7',
  success: '#22C55E',
}

const CATEGORIES = [
  { id: '1', label: 'Account', icon: 'person-circle-outline', tint: '#5B4FE8', tintBg: '#EEEBFF' },
  { id: '2', label: 'Payments', icon: 'card-outline', tint: '#0EA5A5', tintBg: '#E3F8F8' },
  { id: '3', label: 'Cards', icon: 'wallet-outline', tint: '#F59E0B', tintBg: '#FEF3DD' },
  { id: '4', label: 'Security', icon: 'shield-checkmark-outline', tint: '#22C55E', tintBg: '#E7F9EE' },
  { id: '5', label: 'Transactions', icon: 'swap-horizontal-outline', tint: '#EC4899', tintBg: '#FDE9F3' },
  { id: '6', label: 'Settings', icon: 'settings-outline', tint: '#64748B', tintBg: '#EEF1F5' },
]

const FAQS = [
  {
    id: 'f1',
    q: 'How do I reset my transaction PIN?',
    a: 'Go to Settings > Security > Reset PIN. You’ll need to verify your identity via OTP before setting a new one.',
  },
  {
    id: 'f2',
    q: 'Why is my payout delayed?',
    a: 'Payouts can take 1-2 business days depending on your bank. If it’s been longer, contact support with your transaction ID.',
  },
  {
    id: 'f3',
    q: 'How do I update my KYC documents?',
    a: 'Navigate to Profile > Documents > Update KYC and upload a clear photo of your ID. Approval usually takes under 24 hours.',
  },
  {
    id: 'f4',
    q: 'Is my data encrypted?',
    a: 'Yes, all sensitive data is encrypted in transit and at rest using industry-standard AES-256 encryption.',
  },
]

const EmployeeHelpCenter = () => {
  const navigation = useNavigation<any>()
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpandedId(expandedId === id ? null : id)
  }

  const filteredFaqs = FAQS.filter((f) =>
    f.q.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Header */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <SafeAreaView>
            <View style={styles.headerTopRow}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="chevron-back" size={22} color="#fff" />
              </TouchableOpacity>

              <View style={styles.badgePill}>
                <Ionicons name="shield-checkmark" size={13} color="#fff" />
              </View>
            </View>

            <Text style={styles.headerTitle}>Help Center</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.headerSubtitle}>
                We're here to help, how can we assist you today?
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
        {/* search bar  */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.subtext} />
          <TextInput
            placeholder="Search for help topics"
            placeholderTextColor={COLORS.subtext}
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>
        {/* Quick actions */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={[styles.quickAction, styles.quickActionPrimary]}
            onPress={() => navigation.navigate('ChatScreen')}
            activeOpacity={0.85}
          >
            <View style={[styles.quickActionIconWrap, { backgroundColor: 'rgba(255,255,255,0.22)' }]}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#fff" />
            </View>
            <Text style={styles.quickActionPrimaryText}>Chat with AI</Text>
            <Text style={styles.quickActionSubTextLight}>Instant answers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction} activeOpacity={0.85}>
            <View style={[styles.quickActionIconWrap, { backgroundColor: '#EEEBFF' }]}>
              <Ionicons name="call" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>Call Support</Text>
            <Text style={styles.quickActionSubText}>Mon-Sat, 9-6</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAction} activeOpacity={0.85}>
            <View style={[styles.quickActionIconWrap, { backgroundColor: '#EEEBFF' }]}>
              <Ionicons name="mail" size={20} color={COLORS.primary} />
            </View>
            <Text style={styles.quickActionText}>Email Us</Text>
            <Text style={styles.quickActionSubText}>Reply in 24h</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryCard, { width: CARD_WIDTH }]}
              activeOpacity={0.8}
            >
              <View style={[styles.categoryIconWrap, { backgroundColor: cat.tintBg }]}>
                <Ionicons name={cat.icon as any} size={22} color={cat.tint} />
              </View>
              <Text style={styles.categoryLabel}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        </View>
        <View style={styles.faqContainer}>
          {filteredFaqs.map((faq) => {
            const isOpen = expandedId === faq.id
            return (
              <TouchableOpacity
                key={faq.id}
                style={[styles.faqItem, isOpen && styles.faqItemOpen]}
                activeOpacity={0.85}
                onPress={() => toggleFaq(faq.id)}
              >
                <View style={styles.faqQuestionRow}>
                  <Text style={styles.faqQuestion}>{faq.q}</Text>
                  <View style={[styles.faqChevronWrap, isOpen && styles.faqChevronWrapOpen]}>
                    <Ionicons
                      name={isOpen ? 'chevron-up' : 'chevron-down'}
                      size={16}
                      color={isOpen ? '#fff' : COLORS.subtext}
                    />
                  </View>
                </View>
                {isOpen && <Text style={styles.faqAnswer}>{faq.a}</Text>}
              </TouchableOpacity>
            )
          })}
          {filteredFaqs.length === 0 && (
            <View style={styles.noResultBox}>
              <Ionicons name="search-outline" size={28} color={COLORS.subtext} />
              <Text style={styles.noResultText}>No results found for "{search}"</Text>
            </View>
          )}
        </View>

        {/* Bottom CTA */}
        <LinearGradient
          colors={['#EEEBFF', '#F5F6FA']}
          style={styles.ctaCard}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons name="headset-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.ctaTitle}>Still need help?</Text>
          <Text style={styles.ctaSubtitle}>
            Our AI assistant is available 24/7 to answer your questions instantly.
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('ChatScreen')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaButtonText}>Start a Chat</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>
        </LinearGradient>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  )
}

export default EmployeeHelpCenter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    // paddingHorizontal: 15,
    paddingBottom: 26,
    borderBottomEndRadius:20,
    borderBottomStartRadius:20,
    height:175,
    justifyContent:'space-around',
    paddingVertical:10
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
    // marginBottom: 30,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginLeft:10,
    marginTop:7
  },
  badgePill: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
    textAlign:'center',
  },
  subtitleRow: {
    marginTop: 6,
    paddingRight: 10,
    textAlign:'center',
    paddingLeft:40

  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.82)',
    // lineHeight: 30,
    marginBottom:20,

  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 50,
    marginTop: -8,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 30
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  quickActionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: -16,
    gap: 10,
  },
  quickAction: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#1A1A2E',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  quickActionPrimary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
  },
  quickActionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },
  quickActionPrimaryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
  },
  quickActionSubText: {
    fontSize: 11,
    color: COLORS.subtext,
    marginTop: 2,
  },
  quickActionSubTextLight: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  sectionHeaderRow: {
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: GRID_PADDING,
    justifyContent: 'space-between',
    rowGap: GRID_GAP,
  },
  categoryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  faqContainer: {
    paddingHorizontal: 20,
  },
  faqItem: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  faqItemOpen: {
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  faqChevronWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bg,
  },
  faqChevronWrapOpen: {
    backgroundColor: COLORS.primary,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.subtext,
    marginTop: 12,
    lineHeight: 20,
  },
  noResultBox: {
    alignItems: 'center',
    paddingVertical: 30,
    gap: 8,
  },
  noResultText: {
    color: COLORS.subtext,
    fontSize: 13,
  },
  ctaCard: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 22,
    padding: 10,
    alignItems: 'center',
    paddingBottom:10
  },
  ctaIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1A1A2E',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 12,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: COLORS.subtext,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 14,
    marginTop: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 3,
    marginBottom:25
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
})