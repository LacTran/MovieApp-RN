import React from 'react';
import { useConfig } from '../../../context/useConfig';
import { View, Image, Text } from 'react-native';

const CustomImage = ({ posterPath }) => {
    console.log(baseURL)
    return (
        <>
            <Image
                source={{ uri: `${baseURL}${size}${posterPath}` }}
                width={"100%"}
                height={150}
            />
        </>
    )
}

export default CustomImage;