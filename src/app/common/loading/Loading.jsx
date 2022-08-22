import styled from 'styled-components/macro';
import { primaryBg } from '../../../constants';
import { LoadingSpinner } from '../loadingSpinner';
import theme from 'styled-theming';

//=====================
// DYNAMIC COLORS
const color = theme('colorMode', {
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
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);

    h1 {
        color: ${color};
    }
`;

//=====================
// COMPONENTS
const Loading = () => {
    return (
        <Wrapper>
            <h1>Loading..</h1>
            <LoadingSpinner color={color} />
        </Wrapper>
    );
};

export default Loading;
