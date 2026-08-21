// import React from 'react';
// import RootNavigator from './src/rootNavigator/RootNavigator';
// import Toast from 'react-native-toast-message';
// export default function App() {
//   return (
//     <>
//     {/* <RootNavigator/> */}
//     {/* <Toast/> */}
//     </>
//   );
// }



// import React from 'react';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// import RootNavigator from './src/rootNavigator/RootNavigator';
// import Toast from 'react-native-toast-message';
// import { ChatProvider } from './src/context/Chatcontext';

// export default function App() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <BottomSheetModalProvider>
//         <ChatProvider>
//            <RootNavigator />
//         </ChatProvider>
//         <Toast />
//       </BottomSheetModalProvider>
//     </GestureHandlerRootView>
//   );
// }




import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigator from './src/rootNavigator/RootNavigator';
import Toast from 'react-native-toast-message';
import { ChatProvider } from './src/context/Chatcontext';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <ChatProvider>
            <RootNavigator />
          </ChatProvider>
          <Toast />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}