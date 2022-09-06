import styled from 'styled-components/macro';

const Wrapper = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
`;

const Circle = styled.div`
    width: 15px;
    height: 15px;
    border-radius: var(--radii-round);
    background-color: ${p => p.color};
`;

export const ColumnTitle = ({ color, title, tasks }) => {
    return (
        <Wrapper>
            <Circle color={`var(--color-${color})`} />
            <h4>
                {title} ({tasks})
            </h4>
        </Wrapper>
    );
};
