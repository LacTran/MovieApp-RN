import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text as NormalText, ActivityIndicator, SafeAreaView } from 'react-native';
import Text from '../../components/Text';
import Header from '../../components/Header';
import styled from 'styled-components';
import { fetchMoviesByType, discoverMovies, getMovieDetails, searchKeyWord } from '../../services/services';
import config from '../../../assets/config';
import { useConfig } from '../../context/useConfig';
import FilmCard from '../../components/FilmCard';
import { ScrollView } from 'react-native-gesture-handler';
import Footer from '../../components/Footer';
import { useType } from '../../context/useType';
import { useGenres } from '../../context/useGenre';

const Container = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${config.theme.blueColor1};
    height: 100%;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    height: 35px;
    margin-right: 15px;
    background-color: ${config.theme.blueColor1}
    shadow-color: ${config.theme.blueColor2};
    text-shadow-offset: 3px 5px;
    border-radius: 12.5px;
    shadow-opacity: 0.8;
    shadow-radius: 9px;
    elevation: 20;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 100%;
`

const LoadingCircle = styled(ActivityIndicator)`
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 80px;
`;

const ButtonRow = styled.ScrollView`
    flex-direction: row;
    padding: 10px;
    width: 100%;
    margin-top: 10px;
    margin-horizontal: 15px;
`;

const MessageContainer = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const MainScreen = ({ navigation }) => {
    const { type, setType, page, setPage, isOnSearch, setIsOnSearch } = useType();
    const { genre, genres, setGenre } = useGenres();
    const sortByArr = ['popularity.desc', 'release_date.desc', 'original_title.desc', 'vote_average.desc']
    const [sortBy, setSortBy] = useState(sortByArr[0])
    const [data, setData] = useState({
        page: null,
        results: [],
        total_results: null,
        total_pages: null
    });
    const { baseURL, size } = useConfig();
    const [isLoading, setIsLoading] = useState(false);
    const tabNames = {
        popular: 'popular',
        now_playing: 'now playing',
        upcoming: 'upcoming',
        top_rated: 'top rated'
    }

    const [searchTerm, setSearchTerm] = useState('')
    const [searchPage, setSearchPage] = useState(1);
    console.log(type)

    useEffect(() => {
        // by type (default display)
        async function fetchMoviesDataByType() {
            setIsLoading(true);
            try {
                const res = await fetchMoviesByType(type, page);
                setData(res.data);
            } finally {
                setIsLoading(false)
            }
        }
        // by genre
        async function fetchMoviesDataByGenre() {
            setIsLoading(true);
            try {
                const res = await discoverMovies(sortBy, genre, page, '');
                setData(res.data);
            } finally {
                setIsLoading(false)
            }
        }
        if (type || genre) {
            Object.keys(tabNames).filter(item => item === type)[0] ? fetchMoviesDataByType() : fetchMoviesDataByGenre()
        }

    }, [type, page, sortBy, genre])

    useEffect(() => {
        searchTerm && isOnSearch && searchSubmit()
    }, [searchPage])

    const searchSubmit = async () => {
        if (searchTerm) {
            setIsOnSearch(true)
            setIsLoading(true)
            try {
                const res = await searchKeyWord(searchTerm, searchPage);
                // setSearchTerm('')
                setData(res.data)
            } finally {
                setIsLoading(false)
                // setIsOnSearch(false)
                setType('')
                setGenre(null)
            }
        }
    }

    const renderMoviesByType = (data) => {
        // Object.keys(tabNames).map...
        const genresArr = genres.map(item => { return item.name })
        const tabs = genre ? [...genresArr] : [...Object.keys(tabNames)]
        return (
            <>
                <Header
                    toggleDrawer={navigation.toggleDrawer}
                    term={searchTerm}
                    onTermChange={setSearchTerm}
                    onTermSubmit={searchSubmit}
                />
                <ButtonRow
                    horizontal
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    {tabs.map((item, index) => {
                        const filteredGenre = genres.filter(g => g.name === item)[0]
                        return (
                            <Button
                                key={index}
                                onPress={() => {
                                    if (filteredGenre) {
                                        setIsOnSearch(false)
                                        setGenre(filteredGenre.id)
                                        setPage(1)
                                    } else {
                                        setIsOnSearch(false);
                                        setType(item);
                                        setPage(1)
                                    }
                                }}
                            >
                                <NormalText
                                    style={{
                                        color:
                                            type === item || filteredGenre && genre === filteredGenre.id
                                                ? `${config.theme.whiteColor}`
                                                : `${config.theme.blueColor3}`,
                                        fontSize: parseInt(config.theme.fontSizeSmall),
                                        fontFamily: `${config.theme.fontFamilySemiBold}`
                                    }}
                                >
                                    {tabNames[item] ? tabNames[item].toUpperCase() : item.toUpperCase()}
                                </NormalText>
                            </Button>
                        )
                    })}
                </ButtonRow>
                <FlatList
                    style={{ marginBottom: 0 }}
                    data={data.results}
                    renderItem={({ item }) => {
                        const URL = `${baseURL}${size}${item.poster_path}`
                        // if(/null/.test(URL))  => URL = require...
                        return (
                            <FilmCard
                                imageSrc={URL}
                                title={item.title}
                                rating={item.vote_average}
                                releaseDate={item.release_date}
                                onClick={async () => {
                                    setIsLoading(true)
                                    try {
                                        const movieDetails = await getMovieDetails(item.id)
                                        navigation.navigate('MovieDetails', { data: movieDetails.data })
                                    }
                                    finally {
                                        setIsLoading(false)
                                    }
                                }}
                            />
                        )
                    }}
                    keyExtractor={(item) => item.id.toString()}
                />
            </>
        )
    }

    return (
        <Container>
            {
                isLoading ? (
                    <>
                        <Header />
                        <LoadingContainer>
                            <LoadingCircle
                                animating={true}
                                color={`${config.theme.blueColor3}`}
                                size="large"
                            />
                        </LoadingContainer>
                    </>
                ) : (
                        data.results.length
                            ?
                            <>
                                {renderMoviesByType(data)}
                                <Footer
                                    pageNumber={isOnSearch ? searchPage : page}
                                    totalPage={data.total_pages}
                                    setPage={
                                        isOnSearch ? setSearchPage : setPage
                                    }
                                />
                            </>
                            : (
                                <MessageContainer>
                                    <Text
                                        font={config.theme.fontFamilySemiBold}
                                        size={config.theme.fontSizeBig}
                                        textColor={config.theme.blueColor3}
                                        textAlign="center"
                                    >
                                        No movies found
                                    </Text>
                                    <Button
                                        onPress={() => {
                                            setType('popular')
                                        }}
                                    >
                                        <Text
                                            font={config.theme.fontSizeSmall}
                                            textColor={config.theme.blueColor3}
                                            font={config.theme.fontFamilySemiBold}
                                            textAlign="center"
                                        >
                                            Go Back
                                        </Text>
                                    </Button>
                                </MessageContainer>
                            )
                    )
            }
        </Container>
    )
}

MainScreen.navigationOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
})

export default MainScreen;