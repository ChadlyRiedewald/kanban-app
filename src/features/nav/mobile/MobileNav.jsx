import styled from 'styled-components/macro';
import { secondaryBg } from '../../../constants';
import MobileOnly from '../../../app/common/mobileOnly';
import { ReactComponent as Add } from '../../../assets/icon-add.svg';
import Button from '../../../app/common/button';
import { MobileNavDropdown } from './MobileNavDropdown';
import { openDialog, openMenu } from '../../../app/ui';
import { useDispatch } from 'react-redux';
import { OpenMenuButton } from '../../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';

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
    const dispatch = useDispatch();
    const portalId = nanoid();

    return (
        <MobileOnly>
            <Wrapper>
                <MobileNavDropdown />
                <ButtonsWrapper>
                    <AddButton
                        onClick={() =>
                            dispatch(openDialog({ dialogType: 'addNewTask' }))
                        }
                    >
                        <Add style={{ fill: 'var(--color-white)' }} />
                    </AddButton>
                    <OpenMenuButton
                        portalId={portalId}
                        onClick={() =>
                            dispatch(
                                openMenu({
                                    menuType: 'boardMenu',
                                    portalId: portalId,
                                })
                            )
                        }
                    />
                </ButtonsWrapper>
            </Wrapper>
        </MobileOnly>
    );
};
