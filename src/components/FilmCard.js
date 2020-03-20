import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../components/Text';
import styled from 'styled-components';
import config from '../../assets/config';
import { Row } from '../components/Row';

const Container = styled.TouchableOpacity`
  margin-top: 40px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  height: 180px;
  margin-horizontal: 20px;
  padding-left:10px;
  background-color: ${config.theme.blueColor1}
  border-radius: 12.5px;
  shadow-color: ${config.theme.blueColor2};
  shadow-offset: {width: 3px; height:8px};
  shadow-opacity: 0.8;
  shadow-radius: 9px;
`


const ImageArea = styled.View`
  align-items: center;
  width: 30%;
  max-height: 100%;
`;

const TextArea = styled.View`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 18px;
    margin-bottom: 20px;
    padding-left: 10px;
`;

// const EffectIconArea = styled.View`
//   position: absolute;
//   top: 7px;
//   right: -5px;
// `;

const FilmCard = ({
    imageSrc,
    title,
    rating,
    releaseDate,
    onClick,
}) => {
    return (
        <Container onPress={onClick}>
            <ImageArea>
                {/null/.test(imageSrc)
                    ?
                    <Image
                        source={require('../static/error.png')}
                        style={{
                            height: 180,
                            width: "80%",
                            resizeMode: 'contain',
                        }}
                    />
                    : (
                        <Image
                            source={{ uri: imageSrc }}
                            style={{
                                minHeight: 180,
                                width: "80%",
                                resizeMode: 'contain',
                            }}
                        />
                    )}
            </ImageArea>
            <TextArea>
                <View style={{ marginTop: 10, marginBottom: 10 }}>
                    <Text
                        font={config.theme.fontFamilySemiBold}
                        size={config.theme.fontSizeMidNormal}
                        textColor={config.theme.blueColor3}
                        textAlign={"left"}
                    >
                        {title}
                    </Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Text
                        textColor={config.theme.blueColor4}
                        size={config.theme.fontSizeNormal}
                        font={config.theme.fontFamilyMedium}
                    >
                        {rating} / 10
                    </Text>
                    <Text
                        textColor={config.theme.whiteColor}
                        size={config.theme.fontSizeSmall}
                        font={config.theme.fontFamilyMedium}
                    >
                        {releaseDate}
                    </Text>
                </View>
            </TextArea>
        </Container>
    )
}

const styles = StyleSheet.create({

})

export default FilmCard;