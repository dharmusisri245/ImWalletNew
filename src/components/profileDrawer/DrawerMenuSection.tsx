


// import React from 'react';

// import {
//   ScrollView,
//   StyleSheet,
//   View,
// } from 'react-native';

// import type {
//   DrawerItem,
//   DrawerSubItem,
// } from '../../auth/types/drawer/drawer';

// import DrawerMenuItem from './DrawerMenuItem';

// type DrawerMenuSectionProps = {
//   items: DrawerItem[];
//   onNavigate: (route: string) => void;
// };

// const DrawerMenuSection = ({
//   items,
//   onNavigate,
// }: DrawerMenuSectionProps) => {

//   const handleSubItemPress = (
//     subItem: DrawerSubItem,
//   ) => {
//     onNavigate(subItem.route);
//   };

//   return (
//     <View style={styles.wrapper}>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={
//           styles.contentContainer
//         }
//         showsVerticalScrollIndicator={true}
//         nestedScrollEnabled={true}
//         keyboardShouldPersistTaps="handled"
//       >

//         {items.map(item => (
//           <DrawerMenuItem
//             key={item.key}
//             item={item}

//             onPress={() => {
//               if (item.route) {
//                 onNavigate(item.route);
//               }
//             }}

//             onSubItemPress={
//               handleSubItemPress
//             }
//           />
//         ))}

//       </ScrollView>

//     </View>
//   );
// };

// export default DrawerMenuSection;

// const styles = StyleSheet.create({

//   wrapper: {
//     flex: 1,
//     marginTop: 10,
//   },

//   scrollView: {
//     flex: 1,
//   },

//   contentContainer: {
//     paddingBottom: 10,
//   },

// });




import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import type {
  DrawerItem,
  DrawerSubItem,
} from '../../auth/types/drawer/drawer';

import DrawerMenuItem from './DrawerMenuItem';

type DrawerMenuSectionProps = {
  items: DrawerItem[];
  onNavigate: (route: string) => void;
};

const DrawerMenuSection = ({
  items,
  onNavigate,
}: DrawerMenuSectionProps) => {

  const handleSubItemPress = (
    subItem: DrawerSubItem,
  ) => {
    onNavigate(subItem.route);
  };

  return (
    <View style={styles.wrapper}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={
          styles.contentContainer
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled">

        {items.map(item => (
          <DrawerMenuItem
            key={item.key}
            item={item}
            onPress={() => {
              if (item.route) {
                onNavigate(item.route);
              }
            }}
            onSubItemPress={
              handleSubItemPress
            }
          />
        ))}

      </ScrollView>

    </View>
  );
};

export default DrawerMenuSection;

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    marginTop: 8,
  },

  scrollView: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: 8,
  },

});