import React, { useState, useEffect } from 'react';
import { View, Text as NormalText, StyleSheet, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import config from '../../../assets/config';
import styled from 'styled-components';
import Text from '../../components/Text';
import { useConfig } from '../../context/useConfig';
import { MaterialIcons } from '@expo/vector-icons';
import { discoverMovies } from '../../services/services';
import RecommendedList from '../MovieDetails/sub-components/RecommendedList';
import moment from 'moment';
import Footer from '../../components/Footer';

const Container = styled.ScrollView`
    display: flex;
    flex-direction: column;
    background-color: ${config.theme.blueColor1}
`

const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 40px;
    left: 30px;
    height: 40px;
    width: 40px;
    z-index: 1;
`

const ImageContainer = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center
    margin-top: 50px;
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

const Spacer = styled.View`
    margin-vertical: 10px;
`

const ActorDetailsScreen = ({ navigation }) => {
    const data = navigation.getParam('data')
    const { baseURL, profileSize } = useConfig();
    const [isLoading, setIsLoading] = useState(false);
    const profileURL = `${baseURL}${profileSize}${data.profile_path}`;
    const [joinedMovies, setJoinedMovies] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    useEffect(() => {
        async function fetchJoinedMoviesData() {
            setIsLoading(true);
            try {
                const res = await discoverMovies(null, null, page, data.id)
                setJoinedMovies(res.data.results);
                setTotalPages(res.data.total_pages)
            } finally {
                setIsLoading(false)
            }
        }
        fetchJoinedMoviesData()
    }, [data,page])

    return (
        <Container>
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
                            <ImageContainer>
                                <Image
                                    source={{ uri: profileURL }}
                                    style={{
                                        height: 400,
                                        width: 300,
                                        resizeMode: 'contain',
                                        marginBottom: 20
                                    }}
                                />
                                <Text
                                    textColor={config.theme.blueColor3}
                                    size={config.theme.fontSizeMidBig}
                                    font={config.theme.fontFamilyBold}
                                    textAlign="center"
                                >
                                    {data.name}
                                </Text>
                                <Text
                                    textColor={config.theme.blueColor4}
                                    size={config.theme.fontSizeMid}
                                    font={config.theme.fontFamilyBold}
                                    textAlign="center"
                                >
                                    {moment(data.birthday).format('DD-MM-YYYY')}
                                </Text>
                            </ImageContainer>
                            <ContentContainer>
                                <Text
                                    textColor={config.theme.blueColor3}
                                    size={config.theme.fontSizeBig}
                                    font={config.theme.fontFamilyBold}
                                    textAlign="left"
                                >
                                    BIOGRAPHY
                                </Text>
                                <Spacer />
                                <Text
                                    textColor={config.theme.blueColor4}
                                    size={config.theme.fontSizeSmall}
                                    font={config.theme.fontFamilyMedium}
                                    textAlign="left"
                                >
                                    {data.biography}
                                </Text>
                                <Spacer />
                                <Text
                                    textColor={config.theme.blueColor3}
                                    size={config.theme.fontSizeBig}
                                    font={config.theme.fontFamilyBold}
                                    textAlign="left"
                                >
                                    FILMOGRAPHY
                                    </Text>
                                <View
                                    style={{
                                        paddingVertical: 10
                                    }}
                                >
                                    <RecommendedList
                                        data={joinedMovies}
                                        navigation={navigation}
                                        setIsLoading={setIsLoading}
                                    />
                                    <Footer
                                        pageNumber={page}
                                        totalPage={totalPages}
                                        setPage={setPage}
                                    />
                                </View>
                            </ContentContainer>
                        </>
                    )
            }
        </Container>
    )
}

ActorDetailsScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
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
})

export default ActorDetailsScreen;