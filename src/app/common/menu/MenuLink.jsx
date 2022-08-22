import styled from 'styled-components/macro';

//=====================
/* These are the Links/Buttons used inside a menu */
export const MenuLink = styled.button`
    background: none;
    border: none;
    width: fit-content;
    padding: 2px 4px;
    font-size: var(--font-sm);
    color: ${p =>
        p.variant === 'destructive'
            ? 'var(--color-destructive-100)'
            : 'var(--color-gray-600)'};
    border-radius: var(--radii-sm);

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px
            ${p =>
                p.variant === 'destructive'
                    ? 'var(--color-destructive-shadow)'
                    : 'var(--color-purple-shadow)'};
    }

    &:hover {
        text-decoration: underline;
    }
`;
