import styled from 'styled-components/macro';

export const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;

    &::after {
        content: '';
        width: 20px;
        height: 20px;
        border: 3px solid ${p => (p.color ? p.color : 'var(--color-white)')};
        border-top-color: transparent;
        border-radius: 100%;
        animation: loading 0.8s linear infinite;
    }

    @keyframes loading {
        to {
            transform: rotate(1turn);
        }
    }
`;
