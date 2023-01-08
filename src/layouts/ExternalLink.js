import styled from 'styled-components';

export default function ExternalLink( { url, children } ) {
  return(
    <ExternalLinkStyle>
      <a href={ url }> { children } </a>
    </ExternalLinkStyle>
  );
}

const ExternalLinkStyle = styled.div`
  & > * {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  & > * > * {
    margin-right: 6px;
  }
  & > * :hover{
    text-decoration: underline;
  }
`;

