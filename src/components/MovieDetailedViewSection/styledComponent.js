import styled from "styled-components"


export const MovieContainer = styled.div`
    background-image: linear-gradient(to right, #181818, rgba(24, 24, 24, 0.8) 57%, rgba(24, 24, 24, 0) 100%), url(${props => props.bgImage});
    height: 100vh;
    padding-top: 250px;
    padding-left: 140px;
    padding-bottom: 110px;
    background-size: cover;
`;

