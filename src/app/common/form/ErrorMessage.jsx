import styled from 'styled-components/macro';

export const ErrorMessage = styled.span`
    font-size: var(--font-sm);
    font-weight: var(--font-medium);
    color: var(--color-destructive-100);
    position: absolute;
    right: ${p => (p.inputGroup ? '48px' : '16px')};
    top: ${p => (p.inputGroup ? '14px' : '34px')};
`;
