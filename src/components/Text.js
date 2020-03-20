import React from 'react';
import styled from 'styled-components';
import config from '../../assets/config';

const Text = styled.Text`
    color: ${props => props.textColor ? props.textColor : config.theme.darkColor}
    font-size: ${props => (props.size ? props.size : config.theme.fontSizeMid)};
    font-family: ${props => (props.font ? props.font : config.theme.fontFamily)};
    text-align: ${props => (props.textAlign ? props.textAlign : "left")};
`

export default function Title({
    textColor,
    size,
    font,
    children,
    textAlign
}) {
    return (
        <Text
            textColor={textColor}
            textAlign={textAlign}
            size={size}
            font={font}
        >
            {children}
        </Text>
    )
}