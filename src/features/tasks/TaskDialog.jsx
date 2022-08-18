import { DialogWrapper } from '../../app/common/dialog';
import { Field, FieldArray, Formik, useFormikContext } from 'formik';
import { Checkbox, Form, FormikControl, Label } from '../../app/common/form';
import styled from 'styled-components/macro';
import { OpenMenuButton } from '../../app/common/menu';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { openMenu } from '../../app/ui';
import { toggleSubtask, updateTask } from '../boards';
import { secondaryBg } from '../../constants';

const StyledCheckbox = styled.input`
    &[type='checkbox'] {
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: var(--radii-xs);
        flex-shrink: 0;
        background-color: ${p =>
            p.checked ? 'var(--color-purple-100)' : secondaryBg};
        border: ${p =>
            !p.checked
                ? `1px var(--color-gray-400) solid`
                : `1px solid transparent`};

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-purple-shadow);
        }

        &:focus:not(:focus-visible) {
            box-shadow: none;
        }
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-lg);
`;

const options = [
    { key: 'Research competitor pricing and business models', value: '1' },
    { key: 'Outline a business model that works for our solution', value: '2' },
    {
        key: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
        value: '3',
    },
];

export const TaskDialog = ({ task }) => {
    const dispatch = useDispatch();
    const portalId = nanoid();
    const currentBoard = useSelector(state => state.board.selectedBoard);

    const initialValues = {
        subtasks: task.subtasks,
        column: task.column,
    };

    const columns = currentBoard.columns.map(column => {
        return column.title;
    });

    return (
        <DialogWrapper>
            <TitleWrapper>
                <h2>{task?.title}</h2>
                <OpenMenuButton
                    onClick={() =>
                        dispatch(
                            openMenu({
                                menuType: 'taskMenu',
                                menuProps: {
                                    variant: 'tasks',
                                    portalId: portalId,
                                },
                            })
                        )
                    }
                    portalId={portalId}
                />
            </TitleWrapper>
            <p>{task?.description}</p>

            <Label variant='input'>
                Subtasks (0 of 3)
                {task.subtasks.map((subtask, index) => (
                    <Label
                        variant='checkbox'
                        htmlFor={subtask.title}
                        key={index}
                        checked={true}
                        onClick={() => {
                            dispatch(
                                toggleSubtask({
                                    completed: true,
                                })
                            );
                        }}
                    >
                        <StyledCheckbox
                            type='checkbox'
                            id={subtask.title}
                            checked={true}
                            // value={subtask.completed}
                            // checked={subtask.completed}
                        />
                        <svg
                            aria-hidden='true'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='-3 -4.5 16 16'
                        >
                            <path
                                stroke='var(--color-white)'
                                strokeWidth='2'
                                fill='none'
                                d='m1.276 3.066 2.756 2.756 5-5'
                            />
                        </svg>
                        {subtask?.title}
                    </Label>
                ))}
            </Label>
        </DialogWrapper>
    );
};
