import { ReactComponent as Icon } from '../../../assets/icon-menu-trigger.svg';
import styled from 'styled-components/macro';
import VisuallyHidden from '../visuallyHidden';

/* This component is used to trigger a menu */

//=====================
// STYLED COMPONENTS
const Wrapper = styled.button`
    all: unset;
    position: relative;
    width: 16px;
    margin-right: -5.69px;
    margin-left: -5.69px;
    height: 28px;
    cursor: ${p => (p.disabled ? 'auto' : 'pointer')};
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
`;

//=====================
// COMPONENTS
export const MenuTrigger = ({ children, portalId, ...props }) => {
    return (
        <Wrapper {...props} id={portalId} type='button'>
            <VisuallyHidden>Open Menu</VisuallyHidden>
            <Icon />
            {children}
        </Wrapper>
    );
};
