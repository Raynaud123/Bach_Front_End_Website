import styled, { css } from "styled-components";

export const media = {
    desktop: (...args) => css`
    @media (min-width: 870px) { ${css(...args)}; }
`};

export const FooterBar = styled.footer`
  font-family: nunito-sans, sans-serif;
  text-align: center;
  ${media.desktop`
    text-align: left;
  `}
`;

export const DesktopSocialList = styled.div`
  display: none;
  ${media.desktop`
    display: flex;
    align-items: center;
  `};
`;

export const MobileSocialList = styled.div`
  padding-bottom: 40px;
  width: 100%;
  ${media.desktop`
    display: none;
  `};
`;

export const Twitter = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

export const Facebook = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

export const Instagram = styled.svg`
  border: 1px lightgray solid;
  width: 33px;
  height: 33px;
  margin-left: 5px;
`;

export const HR = styled.div`
  display: none;
  ${media.desktop`
    height: 0;
    padding: 0;
    margin: 0;
    display: block;
    border-bottom: 1px #cacada solid;
  `};
`;

export const BottomBar = styled.div`
  max-width: 1280px;
  margin: auto;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  ${media.desktop`
    flex-wrap: nowrap;
    padding: 40px 80px 60px;
    justify-content: space-between;
  `};
`;