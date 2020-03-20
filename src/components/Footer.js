import React from 'react';
import { View, Text as NormalText, StyleSheet } from 'react-native';
import { Row } from '../components/Row';
import Text from '../components/Text';
import styled from 'styled-components';
import config from '../../assets/config';
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'

const Container = styled.View`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    padding-horizontal: 20px;
    padding-vertical: 10px;
`

const PageButton = styled(Button)`
    color: ${config.theme.whiteColor};
`

const Footer = ({ pageNumber, totalPage, setPage }) => {
    return (
        <Container>
            {pageNumber !== 1 ?
                (
                    <PageButton
                        type="outline"
                        icon={
                            <MaterialIcons
                                name="arrow-back"
                                size={15}
                                color={'white'}
                            />
                        }
                        title={`Page ${pageNumber - 1}`}
                        titleStyle={{
                            color: `${config.theme.whiteColor}`,
                            marginLeft: 10,
                            fontFamily: `${config.theme.fontFamily}`,
                        }}
                        onPress={() => {
                            setPage(pageNumber -= 1)
                        }}
                    />
                ) : (
                    <View
                        style={{ width: 100 }}
                    ></View>
                )
            }
            <Text
                textColor={config.theme.whiteColor}
                textAlign="center"
                font={config.theme.fontFamilySemiBold}
                size={config.theme.fontSizeNormal}
            >
                {pageNumber}/{totalPage}
            </Text>
            <PageButton
                type="outline"
                iconRight
                icon={
                    <MaterialIcons
                        name="arrow-forward"
                        size={15}
                        color={'white'}
                    />
                }
                title={`Page ${pageNumber + 1}`}
                titleStyle={{
                    color: `${config.theme.whiteColor}`,
                    marginRight: 10,
                    fontFamily: `${config.theme.fontFamily}`
                }}
                onPress={() => {
                    setPage(pageNumber += 1)
                }}
            />
        </Container>
    )
}

export default Footer