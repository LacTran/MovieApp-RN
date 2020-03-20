import React from 'react';
import { View,TouchableOpacity } from 'react-native';
import config from '../../../../assets/config';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';


const TrailerModal = ({
    modalOpen,
    videoKey,
    setModalOpen
}) => {
    return (
        <Modal
            visible={modalOpen}
            animationType="slide"
            transparent
        >
            <View
                style={{
                    height: 500,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    marginTop: 200,
                }}
            >
                <View
                    style={{
                        flexGrow: 2,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                    }}
                >
                    <WebView
                        javaScriptEnabled
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        source={{
                            html:
                                `<iframe width="100%" height="100%"  src="https://www.youtube.com/embed/${videoKey}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
                        }}
                    />
                </View>
                <View
                    style={{
                        alignSelf: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            setModalOpen(false)
                        }}
                        style={{
                            borderColor: `${config.theme.whiteColor}`,
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 12.5,
                            marginVertical: 10
                        }}
                    >
                        <MaterialIcons
                            name="close"
                            size={30}
                            color={config.theme.whiteColor}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default TrailerModal;