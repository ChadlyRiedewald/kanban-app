import styled from 'styled-components/macro';
import { borderColor, secondaryBg, textColor } from '../../../constants';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../app/common/button';
import { openDialog, openMenu } from '../../../app/ui';
import { OpenMenuButton } from '../../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';

const Wrapper = styled.header`
    height: var(--height-topbar);
    width: 100%;
    background-color: ${secondaryBg};
    border-bottom: 1px solid ${borderColor};
    position: fixed;
    display: flex;
    align-items: center;
    padding-inline-start: var(--width-sidebar);

    svg path {
        fill: ${textColor};
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding-inline: var(--space-md);
`;

const LogoWrapper = styled.div`
    height: var(--height-topbar);
    padding-inline: var(--space-md);
    display: flex;
    align-items: center;
    border-right: 1px solid ${borderColor};
    min-width: fit-content;
    svg path {
        fill: ${textColor};
    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: var(--space-md);
    align-items: center;
`;

export const DesktopTopbar = () => {
    const { open } = useSelector(state => state.ui.sidebar);
    const { selectedBoard } = useSelector(state => state.board);
    const dispatch = useDispatch();
    const portalId = nanoid();

    return (
        <Wrapper>
            {!open && (
                <LogoWrapper>
                    <Logo />
                </LogoWrapper>
            )}
            <ContentWrapper>
                <h1>{selectedBoard?.title}</h1>
                <ButtonsWrapper>
                    <Button
                        disabled={
                            !selectedBoard || !selectedBoard.columns.length
                        }
                        onClick={() =>
                            dispatch(openDialog({ dialogType: 'createTask' }))
                        }
                        size='large'
                    >
                        + Add New Task
                    </Button>
                    <OpenMenuButton
                        portalId={portalId}
                        disabled={
                            !selectedBoard || !selectedBoard.columns.length
                        }
                        onClick={() => {
                            selectedBoard &&
                                dispatch(
                                    openMenu({
                                        menuType: 'boardMenu',
                                        portalId: portalId,
                                    })
                                );
                        }}
                    />
                </ButtonsWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};
