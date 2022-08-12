import styled from 'styled-components/macro';
import { secondaryBg } from '../../../constants';
import MobileOnly from '../../mobileOnly';
import { AddNewTask } from '../AddNewTask';
import { NavMenuDialog } from './NavMenuDialog';

const Wrapper = styled.header`
    height: var(--height-topbar-mobile);
    width: 100%;
    background-color: ${secondaryBg};
    padding-inline: var(--space-sm);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
`;

const MobileNav = () => {
    return (
        <MobileOnly>
            <Wrapper>
                <NavMenuDialog />
                <AddNewTask mobile />
            </Wrapper>
        </MobileOnly>
    );
};

export default MobileNav;
