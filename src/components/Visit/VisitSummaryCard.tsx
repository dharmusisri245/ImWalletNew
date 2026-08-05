// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';

// interface VisitSummaryCardProps {
//   visited: number;
//   remaining: number;
//   interested: number;
//   followUp: number;
// }

// const VisitSummaryCard: React.FC<VisitSummaryCardProps> = ({
//   visited,
//   remaining,
//   interested,
//   followUp,
// }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Ionicons
//           name="stats-chart-outline"
//           size={22}
//           color="#0936B0"
//         />

//         <Text style={styles.title}>
//           Today's Summary
//         </Text>
//       </View>

//       <View style={styles.grid}>
//         <SummaryItem
//           icon="business-outline"
//           label="Visited"
//           value={visited}
//           color="#10B981"
//         />

//         <SummaryItem
//           icon="flag-outline"
//           label="Remaining"
//           value={remaining}
//           color="#F59E0B"
//         />

//         <SummaryItem
//           icon="checkmark-circle-outline"
//           label="Interested"
//           value={interested}
//           color="#2563EB"
//         />

//         <SummaryItem
//           icon="calendar-outline"
//           label="Follow-up"
//           value={followUp}
//           color="#EF4444"
//         />
//       </View>
//     </View>
//   );
// };

// interface SummaryItemProps {
//   icon: string;
//   label: string;
//   value: number;
//   color: string;
// }

// const SummaryItem: React.FC<SummaryItemProps> = ({
//   icon,
//   label,
//   value,
//   color,
// }) => {
//   return (
//     <View style={styles.item}>
//       <View
//         style={[
//           styles.iconContainer,
//           {
//             backgroundColor: `${color}15`,
//           },
//         ]}>
//         <Ionicons
//           name={icon as any}
//           size={22}
//           color={color}
//         />
//       </View>

//       <Text style={styles.value}>
//         {value}
//       </Text>

//       <Text style={styles.label}>
//         {label}
//       </Text>
//     </View>
//   );
// };

// export default React.memo(VisitSummaryCard);

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 18,

//     shadowColor: '#000',
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },

//     elevation: 5,
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 18,
//   },

//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//     marginLeft: 10,
//   },

//   grid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },

//   item: {
//     width: '48%',
//     alignItems: 'center',
//     marginBottom: 18,
//   },

//   iconContainer: {
//     width: 54,
//     height: 54,
//     borderRadius: 27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },

//   value: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#111827',
//   },

//   label: {
//     marginTop: 4,
//     fontSize: 13,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
// });



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface VisitSummaryCardProps {
  visited: number;
  remaining: number;
  interested: number;
  followUp: number;
}

const VisitSummaryCard: React.FC<VisitSummaryCardProps> = ({
  visited,
  remaining,
  interested,
  followUp,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="stats-chart-outline"
          size={20}
          color="#0936B0"
        />

        <Text style={styles.title}>
          Today's Summary
        </Text>
      </View>

      <View style={styles.grid}>
        <SummaryItem
          icon="business-outline"
          label="Visited"
          value={visited}
          color="#10B981"
        />

        <SummaryItem
          icon="flag-outline"
          label="Remaining"
          value={remaining}
          color="#F59E0B"
        />

        <SummaryItem
          icon="checkmark-circle-outline"
          label="Interested"
          value={interested}
          color="#2563EB"
        />

        <SummaryItem
          icon="calendar-outline"
          label="Follow-up"
          value={followUp}
          color="#EF4444"
        />
      </View>
    </View>
  );
};

interface SummaryItemProps {
  icon: string;
  label: string;
  value: number;
  color: string;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  icon,
  label,
  value,
  color,
}) => {
  return (
    <View style={styles.item}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: `${color}18`,
          },
        ]}>
        <Ionicons
          name={icon as any}
          size={18}
          color={color}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
};

export default React.memo(VisitSummaryCard);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginLeft: 8,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  item: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F9FAFB',

    borderRadius: 14,

    paddingVertical: 12,
    paddingHorizontal: 12,

    marginBottom: 10,
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 21,

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  textContainer: {
    flex: 1,
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  label: {
    marginTop: 2,
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});