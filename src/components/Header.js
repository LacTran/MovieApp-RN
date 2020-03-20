import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native';
import Text from '../components/Text';
import styled from 'styled-components';
import { Row } from './Row';
import { MaterialIcons } from '@expo/vector-icons';
import config from '../../assets/config';
import { useType } from '../context/useType';

const Container = styled.View`
    margin-top:40px;
    padding: 10px 25px 10px 25px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background-color: ${config.theme.blueColor1}
`

const Header = ({ toggleDrawer, term, onTermChange, onTermSubmit }) => {

    const [isFocused, setIsFocused] = useState(false);
    const barWidth = new Animated.Value(50);
    const { isOnSearch, setIsOnSearch } = useType()

    return (
        <Container>
            <Row style={{ justifyContent: "space-between", width: "100%" }}>
                <TouchableOpacity
                    onPress={toggleDrawer}>
                    <MaterialIcons name="menu" size={40} color={config.theme.whiteColor} />
                </TouchableOpacity>
                <Animated.View style={{ width: barWidth }}>
                    {
                        !isFocused ? (
                            <TouchableOpacity
                                onPress={() => {
                                    Animated.timing(barWidth, {
                                        toValue: 200,
                                        duration: 300
                                    }).start(() => setIsFocused(true))
                                }}
                            >
                                <MaterialIcons name="search" size={40} color={config.theme.whiteColor} />
                            </TouchableOpacity>
                        ) : (
                                <Row
                                    style={{
                                        justifyContent: "space-between",
                                        width: "100%",
                                        backgroundColor: `${config.theme.whiteColor}`,
                                        height: 30,
                                        padding: 5,
                                        borderRadius: 12.5
                                    }}
                                >
                                    <TextInput
                                        placeholder="Search movies"
                                        placeholderTextColor={config.theme.blueColor1}
                                        value={term}
                                        onChangeText={onTermChange}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onEndEditing={onTermSubmit}
                                        style={styles.inputStyle}
                                        autoFocus
                                        onFocus={() => {
                                            setIsFocused(true)
                                            setIsOnSearch(true)
                                        }}
                                        onBlur={() => {
                                            setIsFocused(false)
                                            setIsOnSearch(false)
                                        }}
                                    />
                                    {term
                                        ?
                                        <TouchableOpacity
                                            onPress={() => {
                                                onTermChange('')
                                            }}
                                        >
                                            <MaterialIcons name="cancel" size={20} color={config.theme.blueColor1} />
                                        </TouchableOpacity>
                                        : <MaterialIcons name="search" size={20} color={config.theme.blueColor1} />
                                    }
                                </Row>
                            )
                    }
                </Animated.View>
            </Row>
        </Container>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        fontSize: parseInt(config.theme.fontSizeMid),
        fontFamily: `${config.theme.fontFamilyLight}`,
        flex: 1,
        marginLeft: 5
    }
})

export default Header;