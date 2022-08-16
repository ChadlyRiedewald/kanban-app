import styled from 'styled-components/macro';
import { NewColumn } from '../column';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../app/ui';

const Wrapper = styled.div`
    display: flex;
    gap: var(--space-md);
`;

export const Board = ({ children }) => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            {children}
            <NewColumn
                onClick={() =>
                    dispatch(openDialog({ dialogType: 'createNewBoard' }))
                }
            >
                <h1>+ New Column</h1>
            </NewColumn>
        </Wrapper>
    );
};
