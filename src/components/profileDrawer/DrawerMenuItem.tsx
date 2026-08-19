


// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Ionicons from '@react-native-vector-icons/ionicons';

// import type {
//   DrawerItem,
//   DrawerSubItem,
// } from '../../auth/types/drawer/drawer';

// type DrawerMenuItemProps = {
//   item: DrawerItem;
//   onPress: () => void;
//   onSubItemPress: (subItem: DrawerSubItem) => void;
// };

// const DrawerMenuItem = ({
//   item,
//   onPress,
//   onSubItemPress,
// }: DrawerMenuItemProps) => {
//   const [expanded, setExpanded] = useState(false);

//   const hasSubItems =
//     !!item.subItems &&
//     item.subItems.length > 0;

//   const handlePress = () => {
//     if (hasSubItems) {
//       setExpanded(prev => !prev);
//       return;
//     }

//     onPress();
//   };

//   return (
//     <View>

//       {/* ================================
//           MAIN ITEM
//       ================================= */}

//       <TouchableOpacity
//         activeOpacity={0.7}
//         style={styles.container}
//         onPress={handlePress}
//       >
//         <View style={styles.iconContainer}>
//           <Ionicons
//             name={item.icon}
//             size={25}
//             color="#2F6BFF"
//           />
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             {item.title}
//           </Text>

//           {!!item.subtitle && (
//             <Text
//               numberOfLines={1}
//               style={styles.subtitle}
//             >
//               {item.subtitle}
//             </Text>
//           )}
//         </View>

//         <Ionicons
//           name={
//             hasSubItems
//               ? expanded
//                 ? 'chevron-down'
//                 : 'chevron-forward'
//               : 'chevron-forward'
//           }
//           size={20}
//           color="#A0A8B5"
//         />
//       </TouchableOpacity>

//       {/* ================================
//           SUB ITEMS
//       ================================= */}

//       {hasSubItems && expanded && (
//         <View style={styles.subItemsContainer}>

//           {item.subItems!.map(subItem => (
//             <TouchableOpacity
//               key={subItem.key}
//               activeOpacity={0.7}
//               style={styles.subItem}
//               onPress={() => onSubItemPress(subItem)}
//             >

//               <View style={styles.subIconContainer}>
//                 {subItem.icon ? (
//                   <Ionicons
//                     name={subItem.icon}
//                     size={19}
//                     color="#2563EB"
//                   />
//                 ) : (
//                   <View style={styles.subBullet} />
//                 )}
//               </View>

//               <View style={styles.subTextContainer}>
//                 <Text style={styles.subTitle}>
//                   {subItem.title}
//                 </Text>

//                 {!!subItem.subtitle && (
//                   <Text
//                     numberOfLines={1}
//                     style={styles.subSubtitle}
//                   >
//                     {subItem.subtitle}
//                   </Text>
//                 )}
//               </View>

//               <Ionicons
//                 name="chevron-forward"
//                 size={17}
//                 color="#A0A8B5"
//               />

//             </TouchableOpacity>
//           ))}

//         </View>
//       )}

//     </View>
//   );
// };

// export default DrawerMenuItem;

// const styles = StyleSheet.create({

//   // ==========================================
//   // MAIN ITEM
//   // ==========================================

//   container: {
//     minHeight: 75,

//     flexDirection: 'row',

//     alignItems: 'center',
//   },

//   iconContainer: {
//     width: 50,
//     height: 50,

//     borderRadius: 20,

//     backgroundColor: '#EFF4FF',

//     alignItems: 'center',
//     justifyContent: 'center',

//     marginRight: 20,
//   },

//   textContainer: {
//     flex: 1,
//   },

//   title: {
//     fontSize: 17,

//     fontWeight: '700',

//     color: '#273248',
//   },

//   subtitle: {
//     marginTop: 5,

//     fontSize: 15,

//     color: '#8B97AA',
//   },

//   // ==========================================
//   // SUB ITEMS
//   // ==========================================

//   subItemsContainer: {
//     marginLeft: 25,

//     paddingLeft: 25,

//     borderLeftWidth: 1,

//     borderLeftColor: '#DCE4F2',

//     marginBottom: 8,
//   },

//   subItem: {
//     minHeight: 58,

//     flexDirection: 'row',

//     alignItems: 'center',

//     paddingRight: 4,
//   },

//   subIconContainer: {
//     width: 34,
//     height: 34,

//     borderRadius: 17,

//     backgroundColor: '#F4F7FF',

//     alignItems: 'center',
//     justifyContent: 'center',

//     marginRight: 12,
//   },

//   subBullet: {
//     width: 7,
//     height: 7,

//     borderRadius: 4,

//     backgroundColor: '#2563EB',
//   },

//   subTextContainer: {
//     flex: 1,
//   },

//   subTitle: {
//     fontSize: 15,

//     fontWeight: '600',

//     color: '#334155',
//   },

//   subSubtitle: {
//     marginTop: 3,

//     fontSize: 12,

//     color: '#94A3B8',
//   },
// });




import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from '@react-native-vector-icons/ionicons';

import type {
  DrawerItem,
  DrawerSubItem,
} from '../../auth/types/drawer/drawer';

type DrawerMenuItemProps = {
  item: DrawerItem;
  onPress: () => void;
  onSubItemPress: (subItem: DrawerSubItem) => void;
};

const DrawerMenuItem = ({
  item,
  onPress,
  onSubItemPress,
}: DrawerMenuItemProps) => {

  const [expanded, setExpanded] =
    useState(false);

  const hasSubItems =
    !!item.subItems &&
    item.subItems.length > 0;

  const handlePress = () => {

    if (hasSubItems) {
      setExpanded(prev => !prev);
      return;
    }

    onPress();
  };

  return (
    <View>

      {/* Main Item */}

      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={handlePress}>

        {/* Icon */}

        <View style={styles.iconContainer}>
          <Ionicons
            name={item.icon}
            size={25}
            color="#2F6BFF"
          />
        </View>

        {/* Text */}

        <View style={styles.textContainer}>

          <Text
            numberOfLines={1}
            style={styles.title}>
            {item.title}
          </Text>

          {!!item.subtitle && (
            <Text
              numberOfLines={1}
              style={styles.subtitle}>
              {item.subtitle}
            </Text>
          )}

        </View>

        {/* Arrow */}

        <Ionicons
          name={
            hasSubItems
              ? expanded
                ? 'chevron-down'
                : 'chevron-forward'
              : 'chevron-forward'
          }
          size={21}
          color="#A0A8B5"
        />

      </TouchableOpacity>

      {/* Sub Items */}

      {hasSubItems && expanded && (
        <View style={styles.subItemsContainer}>

          {item.subItems!.map(subItem => (

            <TouchableOpacity
              key={subItem.key}
              activeOpacity={0.7}
              style={styles.subItem}
              onPress={() =>
                onSubItemPress(subItem)
              }>

              <View
                style={styles.subIconContainer}>

                {subItem.icon ? (
                  <Ionicons
                    name={subItem.icon}
                    size={18}
                    color="#2563EB"
                  />
                ) : (
                  <View
                    style={styles.subBullet}
                  />
                )}

              </View>

              <View
                style={styles.subTextContainer}>

                <Text
                  numberOfLines={1}
                  style={styles.subTitle}>
                  {subItem.title}
                </Text>

                {!!subItem.subtitle && (
                  <Text
                    numberOfLines={1}
                    style={styles.subSubtitle}>
                    {subItem.subtitle}
                  </Text>
                )}

              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#A0A8B5"
              />

            </TouchableOpacity>

          ))}

        </View>
      )}

    </View>
  );
};

export default DrawerMenuItem;

const styles = StyleSheet.create({

  // ==========================================
  // MAIN ITEM
  // ==========================================

  container: {
    minHeight: 70,

    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 52,
    height: 52,

    borderRadius: 20,

    backgroundColor: '#EFF4FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 18,
  },

  textContainer: {
    flex: 1,
    minWidth: 0,
  },

  title: {
    fontSize: 17,
    lineHeight: 23,

    fontWeight: '600',

    color: '#273248',
  },

  subtitle: {
    marginTop: 3,

    fontSize: 15,
    lineHeight: 20,

    fontWeight: '500',

    color: '#8B97AA',
  },

  // ==========================================
  // SUB ITEMS
  // ==========================================

  subItemsContainer: {
    marginLeft: 25,

    paddingLeft: 20,

    borderLeftWidth: 1,
    borderLeftColor: '#DCE4F2',

    marginBottom: 5,
  },

  subItem: {
    minHeight: 54,

    flexDirection: 'row',
    alignItems: 'center',

    paddingRight: 4,
  },

  subIconContainer: {
    width: 32,
    height: 32,

    borderRadius: 16,

    backgroundColor: '#F4F7FF',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 11,
  },

  subBullet: {
    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: '#2563EB',
  },

  subTextContainer: {
    flex: 1,
    minWidth: 0,
  },

  subTitle: {
    fontSize: 15,
    lineHeight: 19,

    fontWeight: '600',

    color: '#334155',
  },

  subSubtitle: {
    marginTop: 2,

    fontSize: 12,
    lineHeight: 16,

    color: '#94A3B8',
  },

});