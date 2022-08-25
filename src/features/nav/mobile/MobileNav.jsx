import styled from 'styled-components/macro';
import { secondaryBg } from '../../../constants';
import MobileOnly from '../../../app/common/mobileOnly';
import { ReactComponent as Add } from '../../../assets/icon-add.svg';
import Button from '../../../app/common/button';
import { openDialog, openMenu } from '../../../app/ui';
import { useDispatch, useSelector } from 'react-redux';
import { MenuTrigger } from '../../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';
import { ReactComponent as Logo } from '../../../assets/logo-mobile.svg';
import { ReactComponent as Down } from '../../../assets/icon-arrow-down.svg';

/* This component renders the complete mobile navigation */

//=====================
// STYLED COMPONENTS
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
    flex-shrink: 0;
`;

const AddButton = styled(Button)`
    height: 32px;
    width: 48px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LogoWrapper = styled.div`
    all: unset;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-shrink: 0;

    h2 {
        margin-right: -8px;
    }
`;

//=====================
// STYLED COMPONENTS
export const MobileNav = () => {
    const dispatch = useDispatch();
    const currentBoard = useSelector(state => state.data.selectedBoard);
    const portalId = nanoid();

    return (
        <MobileOnly>
            <Wrapper>
                <LogoWrapper
                    onClick={() =>
                        dispatch(openDialog({ dialogType: 'mobileNav' }))
                    }
                >
                    <Logo />
                    <h1>{currentBoard?.title}</h1>
                    <Down />
                </LogoWrapper>
                <ButtonsWrapper>
                    <AddButton
                        disabled={
                            !currentBoard || !currentBoard?.columnIds?.length
                        }
                        onClick={() =>
                            dispatch(openDialog({ dialogType: 'addTask' }))
                        }
                    >
                        <Add style={{ fill: 'var(--color-white)' }} />
                    </AddButton>
                    <MenuTrigger
                        portalId={portalId}
                        onClick={() => {
                            if (currentBoard) {
                                dispatch(
                                    openMenu({
                                        menuType: 'boardMenu',
                                        menuProps: { portalId: portalId },
                                    })
                                );
                            }
                        }}
                    />
                </ButtonsWrapper>
            </Wrapper>
        </MobileOnly>
    );
};
