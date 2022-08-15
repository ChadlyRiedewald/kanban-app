import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import styled from 'styled-components/macro';
import Portal from '../portal';
import theme from 'styled-theming';
import { BREAKPOINTS } from '../../../constants';

//////////////////// DYNAMIC COLORS  ////////////////////
export const backgroundColor = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-100)',
});

export const backgroundColorMobile = theme('colorMode', {
    light: 'var(--color-white)',
    dark: 'var(--color-gray-200)',
});

//////////////////// STYLED COMPONENTS  ////////////////////
const StyledRoot = styled(DropdownMenuPrimitive.Root)`
    position: relative;
`;
const StyledContent = styled(DropdownMenuPrimitive.Content)`
    position: absolute;
    background-color: ${backgroundColorMobile};
    right: -8px;
    top: 34px;
    width: 200px;
    border-radius: var(--radii-lg);
    padding: var(--space-sm);
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    @media screen and ${BREAKPOINTS.tablet} {
        background-color: ${backgroundColor};
        right: 0;
        top: 28px;
    }
`;

const StyledTrigger = styled(DropdownMenuPrimitive.Trigger)`
    all: unset;

    @media screen and ${BREAKPOINTS.tablet} {
        width: 16px;
        margin-right: -5.69px;
        margin-left: -5.69px;
        height: 28px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--radii-sm);

        &:focus {
            outline: none;
            box-shadow: 0 0 0 3px var(--color-purple-shadow);
        }

        &:focus:not(:focus-visible) {
            box-shadow: none;
        }
    }
`;

const StyledItem = styled(DropdownMenuPrimitive.Item)`
    font-size: var(--font-sm);
    width: fit-content;
    padding: 4px;
    border-radius: var(--radii-sm);
    cursor: pointer;

    &:first-child {
        color: var(--color-gray-600);
        &[data-highlighted] {
            box-shadow: 0 0 0 2px var(--color-purple-shadow);

            &:focus {
                outline: 0;
            }
        }
    }

    &:last-child {
        color: var(--color-destructive-100);
        &[data-highlighted] {
            box-shadow: 0 0 0 2px var(--color-destructive-shadow);

            &:focus {
                outline: 0;
            }
        }
    }
`;

//////////////////// EXPORTS  ////////////////////
const DropdownMenuRoot = StyledRoot;
export const DropdownMenuTrigger = StyledTrigger;
export const DropdownMenuItem = StyledItem;

//////////////////// COMPONENTS  ////////////////////
export const DropdownMenuContent = ({ children, ...props }) => {
    return (
        <Portal>
            <StyledContent {...props}>{children}</StyledContent>
        </Portal>
    );
};

export const DropdownMenu = ({ children }) => {
    return <DropdownMenuRoot>{children}</DropdownMenuRoot>;
};
