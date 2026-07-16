// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import Svg, { Circle, G } from 'react-native-svg';

// interface RingProgressProps {
//   percent: number;
//   size?: number;
//   stroke?: number;
//   color?: string;
//   backgroundColor?: string;
//   showLabel?: boolean;
// }

// const RingProgress: React.FC<RingProgressProps> = ({
//   percent,
//   size = 84,
//   stroke = 10,
//   color = '#2563EB',
//   backgroundColor = '#EEF2F7',
//   showLabel = true,
// }) => {
//   const progress = Math.min(100, Math.max(0, percent));

//   const radius = (size - stroke) / 2;
//   const circumference = 2 * Math.PI * radius;

//   const strokeDashoffset =
//     circumference - (progress / 100) * circumference;

//   return (
//     <View style={[styles.container, { width: size, height: size }]}>
//       <Svg
//         width={size}
//         height={size}
//         viewBox={`0 0 ${size} ${size}`}>
        
//         {/* Rotate the complete group instead of Circle */}
//         <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          
//           {/* Background */}
//           <Circle
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             stroke={backgroundColor}
//             strokeWidth={stroke}
//             fill="none"
//           />

//           {/* Progress */}
//           <Circle
//             cx={size / 2}
//             cy={size / 2}
//             r={radius}
//             stroke={color}
//             strokeWidth={stroke}
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray={[circumference, circumference]}
//             strokeDashoffset={strokeDashoffset}
//           />
//         </G>
//       </Svg>

//       {showLabel && (
//         <View style={styles.labelContainer}>
//           <Text style={styles.percentText}>{progress}%</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default RingProgress;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   labelContainer: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   percentText: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#0F172A',
//   },
// });






import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

interface RingProgressProps {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
}

const RingProgress = ({
  percent,
  size = 84,
  stroke = 10,
  color = '#2563EB',
  backgroundColor = '#EEF2F7',
  showLabel = true,
}: RingProgressProps) => {
  const progress = Math.max(0, Math.min(percent, 100));

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size },
      ]}>
      <Svg width={size} height={size}>
        <G
          transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={stroke}
            fill="none"
          />

          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference -
              (progress / 100) * circumference
            }
          />
        </G>
      </Svg>

      {showLabel && (
        <View style={styles.label}>
          <Text style={styles.text}>
            {progress}%
          </Text>
        </View>
      )}
    </View>
  );
};

export default RingProgress;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
});














// import React from 'react';
// import Svg, { Circle } from 'react-native-svg';

// export default function RingProgress() {
//   return (
//     <Svg width={100} height={100}>
//       <Circle
//         cx={50}
//         cy={50}
//         r={40}
//         stroke="red"
//         strokeWidth={5}
//         fill="none"
//       />
//     </Svg>
//   );
// }