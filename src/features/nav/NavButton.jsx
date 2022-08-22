import styled from 'styled-components/macro';
import { BREAKPOINTS, secondaryButtonBg } from '../../constants';

//=====================
/* This component is used for Buttons in the Nav Menu with the same styling as the NavLink Component */
export const NavButton = styled.button`
    width: 240px;
    border: none;
    background: none;
    text-decoration: none;
    font-size: var(--font-md);
    color: var(--color-gray-600);
    font-weight: var(--font-bold);
    display: flex;
    align-items: center;
    gap: calc(var(--space-xs) * 1.5);
    height: 48px;
    border-radius: 0 var(--radii-round) var(--radii-round) 0;
    margin-inline-start: -24px;
    padding-inline-start: 24px;
    opacity: ${p => p.disabled && '0.5'};
    cursor: ${p => (p.disabled ? 'auto' : 'pointer')};

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-purple-shadow);
        border-radius: 0 var(--radii-round) var(--radii-round) 0;
    }

    &:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
    }

    &:hover {
        color: ${p => !p.disabled && 'var(--color-purple-100)'};
        background-color: ${p => !p.disabled && secondaryButtonBg};

        svg {
            fill: var(--color-purple-100);
        }
    }

    @media screen and ${BREAKPOINTS.tablet} {
        width: 267px;
        margin-inline-start: -32px;
        padding-inline-start: var(--space-lg);
    }
`;
