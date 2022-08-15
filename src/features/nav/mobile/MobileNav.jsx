import styled from 'styled-components/macro';
import { secondaryBg } from '../../../constants';
import MobileOnly from '../../../app/common/mobileOnly';
import { AddNewTask } from '../../task';
import { ReactComponent as Add } from '../../../assets/icon-add.svg';
import Button from '../../../app/common/button';
import { BoardOptions } from '../../board';
import VisuallyHidden from '../../../app/common/visuallyHidden';
import { ReactComponent as Icon } from '../../../assets/icon-menu-trigger.svg';
import { MobileNavDropdown } from './MobileNavDropdown';

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

const ButtonsWrapper = styled.div`
    display: flex;
    gap: var(--space-sm);
    align-items: center;
`;

const AddButton = styled(Button)`
    height: 32px;
    width: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MobileNav = () => {
    return (
        <MobileOnly>
            <Wrapper>
                <MobileNavDropdown />
                <ButtonsWrapper>
                    <AddNewTask
                        trigger={
                            <AddButton>
                                <Add style={{ fill: 'var(--color-white)' }} />
                            </AddButton>
                        }
                    />
                    <BoardOptions
                        trigger={
                            <>
                                <VisuallyHidden>Edit board</VisuallyHidden>
                                <Icon />
                            </>
                        }
                    />
                </ButtonsWrapper>
            </Wrapper>
        </MobileOnly>
    );
};
