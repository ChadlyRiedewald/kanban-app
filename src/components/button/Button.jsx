import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { secondaryButtonBg } from '../../constants';

//////////////////// DYNAMIC COLORS  ////////////////////
const secondaryBgHover = theme('colorMode', {
    light: 'var(--color-purple-300)',
    dark: 'var(--color-white)',
});

const secondaryShadow = theme('colorMode', {
    light: 'var(--color-purple-shadow)',
    dark: 'var(--color-white-shadow)',
});

//////////////////// STYLED COMPONENTS  ////////////////////
const BaseButton = styled.button`
    font-weight: var(--font-bold);
    border-radius: var(--radii-round);
    border: none;
    padding-inline: 1.5em;
    width: ${p => (p.fluid ? '100%' : 'fit-content')};
    height: var(--height);
    font-size: var(--fontSize);

    &:disabled,
    &[disabled] {
        opacity: 0.6;
        cursor: auto;
    }

    &:focus:not(:focus-visible) {
        outline: 0;
        box-shadow: none;
    }
`;

export const PrimaryButton = styled(BaseButton)`
    background-color: var(--color-purple-100);
    color: var(--color-white);
    &:hover:not([disabled]) {
        background-color: var(--color-purple-200);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-purple-shadow);
    }
`;
const SecondaryButton = styled(BaseButton)`
    background-color: ${secondaryButtonBg};
    color: var(--color-purple-100);

    &:hover:not([disabled]) {
        background-color: ${secondaryBgHover};
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px ${secondaryShadow};
    }
`;
const DestructiveButton = styled(BaseButton)`
    background-color: var(--color-destructive-100);
    color: var(--color-white);
    &:hover:not([disabled]) {
        background-color: var(--color-destructive-200);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 5px var(--color-destructive-shadow);
    }
`;

//////////////////// CONSTANTS  ////////////////////
const SIZES = {
    medium: {
        '--fontSize': 'var(--font-sm)',
        '--height': '40px',
    },
    large: {
        '--fontSize': 'var(--font-md)',
        '--height': '48px',
    },
};

//////////////////// COMPONENT  ////////////////////
const Button = ({ children, size, variant, ...otherProps }) => {
    const styles = SIZES[size];

    let Component;

    switch (variant) {
        case 'secondary': {
            Component = SecondaryButton;
            break;
        }
        case 'destructive': {
            Component = DestructiveButton;
            break;
        }
        case 'primary':
        default: {
            Component = PrimaryButton;
        }
    }

    return (
        <Component style={styles} {...otherProps}>
            {children}
        </Component>
    );
};

export default Button;
