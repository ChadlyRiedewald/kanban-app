import styled from 'styled-components/macro';
import theme from 'styled-theming';

export const NewColumnBg = theme('colorMode', {
    light: 'hsl(219 64% 96%)',
    dark: 'hsl(235 15% 16%)',
});

export const NewColumn = styled.div`
    width: 280px;
    display: flex;
    flex-shrink: 0;
    margin-block-start: 31px;
    border-radius: var(--radii-md);
    justify-content: center;
    align-items: center;
    background-color: ${NewColumnBg};
    min-height: 30vh;
    cursor: pointer;

    &:hover {
        h1 {
            color: var(--color-purple-100);
        }
    }

    h1 {
        color: var(--color-gray-600);
    }
`;
