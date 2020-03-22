import React, { useState, useEffect } from 'react';
import { View, Text as NormalText, StyleSheet, ActivityIndicator, Image, FlatList, TouchableOpacity } from 'react-native';
import config from '../../../assets/config';
import { Row } from '../../components/Row';
import Text from '../../components/Text';
import styled from 'styled-components';
import { useConfig } from '../../context/useConfig';
import { useGenres } from '../../context/useGenre';
import { MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import { getCast, getRecommendedMovies, getPersonData } from '../../services/services';
import TrailerModal from './sub-components/TrailerModal';
import RecommendedList from './sub-components/RecommendedList';



const Container = styled.ScrollView`
    display: flex;
    flex-direction: column;
    background-color: ${config.theme.blueColor1}
`

const ContentContainer = styled.View`
    margin-vertical: auto;
    padding-horizontal: 20px;
    margin-top: 30px;
    height: 100%;
    width: 100%;
    max-height: 100%;
    min-height: 50px;
    background-color: ${config.theme.blueColor1};
`

const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    left: 30px;
    height: 40px;
    width: 40px;
    z-index: 1;
`
const Badge = styled.View`
    padding: 10px;
    height: 35px;
    margin-vertical: 10px;
    border-radius: 12.5px;
    background-color: ${config.theme.blueColor1}
    shadow-color: ${config.theme.blueColor2};
    shadow-offset: {width: 3px; height:8px};
    shadow-opacity: 0.8;
    shadow-radius: 5px;
    margin-right: 15px;
`

const TrailerButton = styled.TouchableOpacity`
    align-self: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 35px;
    min-width: 50px;
    padding: 10px;
    border-radius: 12.5px;
    background-color: ${config.theme.blueColor1}
    shadow-color: ${config.theme.blueColor2};
    shadow-offset: {width: 3px; height:8px};
    shadow-opacity: 0.8;
    shadow-radius: 5px;
`

const MovieDetailsScreen = ({ navigation }) => {
    const data = navigation.getParam('data');
    const [isLoading, setIsLoading] = useState(false);
    const { baseURL, backDropSize, profileSize } = useConfig();
    const { genres } = useGenres();
    const posterURL = `${baseURL}${backDropSize}${data.poster_path}`;
    const videoKey = data.videos.results.length !== 0 ? data.videos.results[0].key : null;
    const genArr = genres.filter(gen => {
        return data.genres.some(g => g.id === gen.id)
    })
    const columnNum = 3;
    const [castData, setCastData] = useState([]);
    const [recommendedMovies, setRecommendedMovies] = useState([]);
    const [page, setPage] = useState(1)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        async function fetchMainData() {
            setIsLoading(true)
            try {
                const castResponse = await getCast(data.id);
                const recommendedResponse = await getRecommendedMovies(data.id, page)
                setCastData(castResponse.data.cast);
                setRecommendedMovies(recommendedResponse.data.results)
            } finally {
                setIsLoading(false)
            }
        }
        fetchMainData();
    }, [data])

    return (
        <Container
            contentContainerStyle={{
                alignItems: 'center'
            }}
        >
            {
                isLoading ? (
                    <View style={styles.container}>
                        <ActivityIndicator
                            animating={true}
                            color={`${config.theme.blueColor3}`}
                            size="large"
                            style={styles.activityIndicator}
                        />
                    </View>
                ) : (
                        <>
                            <BackButton
                                onPress={() => { navigation.goBack() }}
                            >
                                <MaterialIcons name="keyboard-backspace" size={40} color={config.theme.whiteColor} />
                            </BackButton>
                            <View
                                style={{
                                    width: '100%',
                                    height: 480,
                                    borderBottomLeftRadius: '25px',
                                    borderBottomRightRadius: '25px',
                                    backgroundColor: `${config.theme.blueColor1}`,
                                    overflow: 'hidden'
                                }}
                            >
                                <Image
                                    source={{ uri: posterURL }}
                                    style={styles.background}
                                />
                            </View>
                            <ContentContainer>
                                <Text
                                    textColor={config.theme.blueColor3}
                                    size={config.theme.fontSizeMidBig}
                                    font={config.theme.fontFamilyBold}
                                    textAlign="center"
                                >
                                    {data.title.toUpperCase()} ({moment(data.release_date).format('YYYY')})
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        alignItems: 'center',
                                        marginVertical: 10
                                    }}
                                >
                                    {
                                        videoKey ? (
                                            <TrailerButton
                                                onPress={() => {
                                                    setModalOpen(true)
                                                }}
                                            >
                                                <MaterialIcons
                                                    name="play-circle-outline"
                                                    size={15}
                                                    color={config.theme.whiteColor}
                                                />
                                                <Text
                                                    textColor={config.theme.blueColor3}
                                                    size={config.theme.fontSizeSmall}
                                                    font={config.theme.fontFamilySemiBold}
                                                    textAlign="center"
                                                >
                                                    Trailer
                                                </Text>
                                            </TrailerButton>
                                        ) : (
                                                null
                                            )
                                    }
                                    <Text
                                        textColor={config.theme.blueColor4}
                                        size={config.theme.fontSizeBig}
                                        textAlign="center"
                                    >
                                        {data.vote_average} / 10
                                    </Text>
                                </View>
                                <Row
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'space-around',
                                    }}
                                >
                                    <FlatList
                                        contentContainerStyle={{
                                            alignItems: 'center',
                                            marginBottom: 15
                                        }}
                                        data={genArr}
                                        numColumns={columnNum}
                                        keyExtractor={((item, index) => index)}
                                        renderItem={({ item }) => {
                                            return (
                                                <Badge
                                                    onPress={() => { }}
                                                >
                                                    <Text
                                                        size={config.theme.fontSizeSmall}
                                                        font={config.theme.fontFamilySemiBold}
                                                        textColor={config.theme.blueColor3}
                                                        textAlign="center"
                                                    >
                                                        {item.name}
                                                    </Text>
                                                </Badge>
                                            )
                                        }}
                                    />
                                </Row>
                                <View
                                    style={styles.headerContainer}
                                >
                                    <Text
                                        textColor={config.theme.blueColor3}
                                        size={config.theme.fontSizeBig}
                                        font={config.theme.fontFamilyBold}
                                        textAlign="left"
                                    >
                                        SYNOPSIS
                                    </Text>
                                </View>
                                <Text
                                    textColor={config.theme.blueColor4}
                                    size={config.theme.fontSizeSmall}
                                    font={config.theme.fontFamilyMedium}
                                >
                                    {data.overview}
                                </Text>
                                <View
                                    style={styles.headerContainer}
                                >
                                    <Text
                                        textColor={config.theme.blueColor3}
                                        size={config.theme.fontSizeBig}
                                        font={config.theme.fontFamilyBold}
                                        textAlign="left"
                                    >
                                        CAST
                                    </Text>
                                    <View
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <FlatList
                                            style={{
                                                marginBottom: 0
                                            }}
                                            horizontal={true}
                                            keyExtractor={(item, index) => index}
                                            data={castData}
                                            renderItem={({ item, index }) => {
                                                const profileURL = `${baseURL}${profileSize}${item.profile_path}`;
                                                return (
                                                    <TouchableOpacity
                                                        style={{
                                                            width: 100,
                                                            maxHeight: '100%',
                                                        }}
                                                        onPress={async () => {
                                                            setIsLoading(true)
                                                            try {
                                                                const res = await getPersonData(item.id)
                                                                navigation.navigate('ActorDetails', { data: res.data })
                                                            } finally {
                                                                setIsLoading(false)
                                                            }
                                                        }}
                                                    >
                                                        {
                                                            /null/.test(profileURL) ? (
                                                                <Image
                                                                    source={require('../../static/error.png')}
                                                                    style={{
                                                                        height: 70,
                                                                        width: 100,
                                                                        resizeMode: 'contain',
                                                                        borderRadius: 12.5,
                                                                    }}
                                                                />
                                                            ) : (
                                                                    <Image
                                                                        source={{ uri: profileURL }}
                                                                        style={{
                                                                            minHeight: 70,
                                                                            width: "100%",
                                                                            resizeMode: 'contain',
                                                                            borderRadius: 12.5,
                                                                        }}
                                                                    />
                                                                )
                                                        }
                                                        <Text
                                                            textColor={config.theme.blueColor4}
                                                            size={config.theme.fontSizeSmall}
                                                            textAlign="center"
                                                        >
                                                            {item.name}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            }}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={styles.headerContainer}
                                >
                                    <Text
                                        textColor={config.theme.blueColor3}
                                        size={config.theme.fontSizeBig}
                                        font={config.theme.fontFamilyBold}
                                        textAlign="left"
                                    >
                                        RECOMMENDED MOVIES
                                    </Text>
                                    {
                                        recommendedMovies.length ? (
                                            <RecommendedList
                                                data={recommendedMovies}
                                                navigation={navigation}
                                                setIsLoading={setIsLoading}
                                            />
                                        ) : (
                                                <View
                                                    style={{
                                                        marginBottom: 20
                                                    }}
                                                >
                                                    <Text
                                                        font={config.theme.fontFamilySemiBold}
                                                        size={config.theme.fontSizeMid}
                                                        textColor={config.theme.blueColor4}
                                                        textAlign="center"
                                                    >
                                                        NO RECOMMENDED MOVIES AVAILABLE!
                                                    </Text>
                                                </View>
                                            )
                                    }

                                </View>
                            </ContentContainer>
                            {/* TRAILER MODAL */}
                            <TrailerModal
                                modalOpen={modalOpen}
                                videoKey={videoKey}
                                setModalOpen={setModalOpen}
                            />
                        </>
                    )
            }
        </Container >
    )
}

// MovieDetailsScreen.navigationOptions = ({ navigation }) => ({
//     headerLeft: function () {
//         return (
//             <TouchableOpacity
//                 style={{ padding: 5, marginLeft: 10 }}
//                 onPress={() => { navigation.goBack() }}
//             >
//                 <MaterialIcons name="keyboard-backspace" size={40} color={config.theme.whiteColor} />
//             </TouchableOpacity>
//         )
//     },
//     headerStyle: {
//         backgroundColor: `${config.theme.blueColor1}`
//     }
// })

MovieDetailsScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: 480,
        resizeMode: 'stretch',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '100%'
    },
    headerContainer: {
        paddingVertical: 10
    }
})

export default MovieDetailsScreen;