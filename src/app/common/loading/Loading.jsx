import styled from 'styled-components/macro';
import { primaryBg, textColor } from '../../../constants';
import { LoadingSpinner } from '../loadingSpinner';
import theme from 'styled-theming';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

//=====================
// DYNAMIC COLORS
export const color = theme('colorMode', {
    light: 'var(--color-gray-600)',
    dark: 'var(--color-white)',
});

//=====================
// STYLED COMPONENTS
const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: ${primaryBg};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-lg);

    h1 {
        color: ${color};
    }
`;

const LogoWrapper = styled.div`
    width: fit-content;
    svg {
        transform: scale(1.4);
    }
    svg path {
        fill: ${textColor};
    }
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
`;

//=====================
// COMPONENTS
const Loading = () => {
    return (
        <Wrapper>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <LoadingWrapper>
                <h1>Loading..</h1>
                <LoadingSpinner loading='true' />
            </LoadingWrapper>
        </Wrapper>
    );
};

export default Loading;
