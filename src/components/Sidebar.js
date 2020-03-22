import React from 'react';
import { View, StyleSheet, Text as NormalText, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import config from '../../assets/config';
import styled from 'styled-components';
import { useGenres } from '../context/useGenre';
import { useType } from '../context/useType';


const Container = styled.ScrollView`
    background-color: ${config.theme.blueColor1};
    padding: 80px 20px 60px 20px;
`


const Sidebar = ({ navigation }) => {
    const { type, setType, page, setPage, isOnSearch, setIsOnSearch } = useType();
    const { genres, setGenre } = useGenres();
    const renderMenuItem = (title, route, passedData) => {
        const filteredGenre = genres.filter(g => g.name === passedData)[0]
        return (
            <TouchableOpacity
                style={{ paddingLeft: 15, marginTop: 10 }}
                onPress={() => {
                    if (filteredGenre) {
                        setIsOnSearch(false)
                        setType('')
                        setGenre(filteredGenre.id);
                        setPage(1);
                    } else {
                        (false)
                        setGenre(null)
                        setType(passedData)
                        setPage(1);
                    }
                    navigation.navigate(route)
                }}
            >
                <Text
                    font={config.theme.fontFamilyMedium}
                    size={config.theme.fontSizeBig}
                    textAlign="left"
                    textColor={config.theme.blueColor4}
                >
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
    return (
        <Container
            contentContainerStyle={{
                alignItems: 'left'
            }}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                <Text
                    font={config.theme.fontFamilyBold}
                    size={config.theme.fontSizeMidBig}
                    textColor={config.theme.blueColor3}
                >
                    Discover
                </Text>
                {renderMenuItem('Popular', 'Main', 'popular')}
                {renderMenuItem('Now Playing', 'Main', 'now_playing')}
                {renderMenuItem('Upcoming', 'Main', 'upcoming')}
                {renderMenuItem('Top Rating', 'Main', 'top_rated')}
                <View
                    style={{ marginTop: 10 }}
                >
                    <Text
                        font={config.theme.fontFamilyBold}
                        size={config.theme.fontSizeMidBig}
                        textColor={config.theme.blueColor3}
                    >
                        Genres
                </Text>
                </View>
                <View
                    style={{
                        marginBottom: 100
                    }}>
                    {genres.map((genre, index) => (
                        <React.Fragment key={index}>
                            {renderMenuItem(genre.name, 'Main', genre.name)}
                        </React.Fragment>
                    ))}
                </View>
            </SafeAreaView>
        </Container>
    )
}

export default Sidebar;