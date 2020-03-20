import styled from "styled-components";
import React from "react";

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CustomRow = styled(Row)`
  justify-content: ${props => props.justifyContent};
`;

export const RowWithIconText = ({
    icon,
    content
}) => {
    return (
        <Row>
            {icon}
            {content}
        </Row>
    );
};
