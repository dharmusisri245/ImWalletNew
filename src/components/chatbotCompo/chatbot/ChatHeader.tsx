import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface ChatHeaderProps {
    title?: string;
    isOnline?: boolean;
    mode?: 'ai' | 'human';
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    title = 'Support Assistant',
    isOnline = true,
    // mode = 'ai',
    mode='human'
}) => {
    const modeLabel =
        mode === 'ai'
            ? 'AI Assistant'
            : 'Support Agent';

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>🤖</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.headerDataContainer}>
                    <View>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </View>
                    <View style={{marginLeft:60}}>
                        <Text style={{color:'red' ,fontSize:20, fontWeight:700}}>ImWallet</Text>
                    </View>
                </View>

                <View style={styles.statusRow}>
                    <View
                        style={[
                            styles.statusDot,
                            {
                                backgroundColor: isOnline
                                    ? '#22C55E'
                                    : '#999',
                            },
                        ]}
                    />

                    <Text style={styles.statusText}>
                        {isOnline ? modeLabel : 'Offline'}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
 
    headerDataContainer:{
        flexDirection:'row',
        // justifyContent:'space-around',
        alignContent:'center'
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        marginRight: 12,
    },

    icon: {
        fontSize: 22,
    },

    infoContainer: {
        flex: 1,
    },

    title: {
        fontSize: 17,
        fontWeight: '700',
        color: '#222',
    },

    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },

    statusText: {
        fontSize: 12,
        color: '#777',
    },
});

export default ChatHeader;