import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';
import Button from '../../app/common/button';
import { openDialog } from '../../app/ui';

const Wrapper = styled.div`
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-md);
`;

export const NoBoards = () => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <h2 style={{ color: 'var(--color-gray-600)' }}>
                You don't have any boards. Create a new board to get started.
            </h2>
            <Button
                variant='primary'
                size='large'
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'createBoard' }))
                }
            >
                + Create New Board
            </Button>
        </Wrapper>
    );
};
