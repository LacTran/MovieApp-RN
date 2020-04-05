import React from 'react';
import { View, Image, FlatList } from 'react-native';
import config from '../../../../assets/config';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { useConfig } from '../../../context/useConfig';
import { getMovieDetails } from '../../../services/services';

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    background-color: ${config.theme.blueColor1};
    align-self: center;
`

const Card = styled.TouchableOpacity`
    flex-direction: column;
    width: 45%;
    align-items: center;
    height: 250px;
    margin: 0 auto 25px auto;
    border-radius: 12.5px;
    background-color: ${config.theme.blueColor1}
    shadow-color: ${config.theme.blueColor2};
    text-shadow-offset: 3px 8px;
    shadow-opacity: 0.8;
    shadow-radius: 8px;
`;

const DisplayImage = styled.Image`
    min-height: 150px;
    width: 100%;
    resize-mode: stretch;
    flex: 1;
`;

const TextArea = styled.View`
    flex: 1;
    max-height: 60px;
    align-items: center;
    justify-content: center;
    padding: 5px;
`

const RecommendedList = ({
    data,
    navigation,
    setIsLoading,
    headerComponent,
    footerComponent
}) => {
    const { baseURL, size } = useConfig();
    return (
        <Container>
            <FlatList
                contentContainerStyle={{
                    alignItems: 'center',
                }}
                ListHeaderComponent={headerComponent}
                ListHeaderComponentStyle={{
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: '100%',
                }}
                ListFooterComponent={footerComponent}
                columnWrapperStyle={{
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    width: '100%',
                }}
                style={{
                    marginBottom: 15,
                    width: '100%',
                }}
                data={data}
                keyExtractor={(item, index) => item.title}
                numColumns={2}
                renderItem={({ item, index }) => {
                    const URL = `${baseURL}${size}${item.poster_path}`;
                    return (
                        <>
                            <Card
                                onPress={async () => {
                                    setIsLoading(true)
                                    try {
                                        const movieDetails = await getMovieDetails(item.id)
                                        navigation.navigate('MovieDetails', { data: movieDetails.data })
                                    }
                                    finally {
                                        setIsLoading(false)
                                    }
                                }}
                            >
                                {/null/.test(URL)
                                    ? (
                                        <DisplayImage
                                            source={require('../../../static/error.png')}
                                        />
                                    )
                                    : (
                                        <DisplayImage
                                            source={{ uri: URL }}
                                        />
                                    )}

                                <TextArea>
                                    <Text
                                        textColor={config.theme.blueColor4}
                                        size={config.theme.fontSizeSmall}
                                        textAlign="center"
                                    >
                                        {item.title}
                                    </Text>
                                </TextArea>
                            </Card>
                        </>
                    )
                }}
            />
        </Container>
    )
}

export default RecommendedList;