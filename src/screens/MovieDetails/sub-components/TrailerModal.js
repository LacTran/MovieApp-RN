import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import config from '../../../../assets/config';
import { MaterialIcons } from '@expo/vector-icons';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';

const WebviewContainer = styled.View`
    height: 500px;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0,0,0,0.8);
    margin-top: 200px;
`;

const CloseButton = styled.TouchableOpacity`
    border-color: ${config.theme.whiteColor};
    border-width: 1px;
    padding: 10px;
    border-radius: 12.5px;
    margin-vertical: 10px;
`

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
            <WebviewContainer>
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
                    <CloseButton
                        onPress={() => {
                            setModalOpen(false)
                        }}
                    >
                        <MaterialIcons
                            name="close"
                            size={30}
                            color={config.theme.whiteColor}
                        />
                    </CloseButton>
                </View>
            </WebviewContainer>
        </Modal>
    )
}

export default TrailerModal;