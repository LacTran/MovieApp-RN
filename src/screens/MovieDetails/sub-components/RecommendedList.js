import React from 'react';
import { View, Image, FlatList } from 'react-native';
import config from '../../../../assets/config';
import styled from 'styled-components';
import Text from '../../../components/Text';
import { useConfig } from '../../../context/useConfig';
import { getMovieDetails } from '../../../services/services';

const Container = styled.View`
    flex-direction: column;
`

const Card = styled.TouchableOpacity`
    flex-direction: column;
    width: 45%;
    height: 250px;
    margin-bottom: 25px;
    border-radius: 12.5px;
    background-color: ${config.theme.blueColor1}
    shadow-color: ${config.theme.blueColor2};
    shadow-offset: {width: 3px; height:8px};
    shadow-opacity: 0.8;
    shadow-radius: 8px;
`

const RecommendedList = ({
    data,
    navigation,
    setIsLoading
}) => {
    const { baseURL, size } = useConfig();
    return (
        <Container>
            <FlatList
                contentContainerStyle={{
                    alignItems: 'center',
                    marginBottom: 15,
                    marginTop: 20
                }}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                style={{ flex: 1 }}
                data={data}
                scrollEnabled={false}
                keyExtractor={(item, index) => index}
                numColumns={2}
                renderItem={({ item }) => {
                    const URL = `${baseURL}${size}${item.poster_path}`;
                    return (
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
                            <Image
                                source={{ uri: URL }}
                                style={{
                                    minHeight: 150,
                                    height: 180,
                                    width: "100%",
                                    resizeMode: 'stretch',
                                    flex: 1
                                }}
                            />
                            <View
                                style={{
                                    flex: 1,
                                    maxHeight: 60,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 5
                                }}
                            >
                                <Text
                                    textColor={config.theme.blueColor4}
                                    size={config.theme.fontSizeSmall}
                                    textAlign="center"
                                >
                                    {item.title}
                                </Text>
                            </View>
                        </Card>
                    )
                }}
            />
        </Container>
    )
}

export default RecommendedList;