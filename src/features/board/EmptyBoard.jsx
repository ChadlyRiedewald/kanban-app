import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';
import styled from 'styled-components/macro';
import Button from '../../app/common/button';

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-md);
`;

export const EmptyBoard = () => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <h2 style={{ color: 'var(--color-gray-600)' }}>
                This board is empty. Create a new column to get started.
            </h2>
            <Button
                variant='primary'
                size='large'
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'createNewBoard' }))
                }
            >
                + Add New Column
            </Button>
        </Wrapper>
    );
};
