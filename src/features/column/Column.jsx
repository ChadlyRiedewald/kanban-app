import styled from 'styled-components/macro';

const Wrapper = styled.section`
    width: 280px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    gap: var(--space-sm);
`;

export const Column = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};
