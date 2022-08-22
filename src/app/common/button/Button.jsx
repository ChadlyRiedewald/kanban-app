import styled from 'styled-components/macro';
import theme from 'styled-theming';
import { secondaryButtonBg } from '../../../constants';

//////////////////// DYNAMIC COLORS  ////////////////////
const secondaryBgHover = theme('colorMode', {
    light: 'var(--color-purple-300)',
    dark: 'var(--color-purple-500)',
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

const PrimaryButton = styled(BaseButton)`
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

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;

    &::after {
        content: '';
        width: 20px;
        height: 20px;
        border: 3px solid var(--color-white);
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

    ${LoadingSpinner} {
        &::after {
            border-color: var(--color-purple-100);
            border-top-color: transparent;
        }
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
const Button = ({ children, size, variant, loading, ...props }) => {
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
        <Component style={styles} {...props}>
            {loading ? <LoadingSpinner /> : children}
        </Component>
    );
};

export default Button;
