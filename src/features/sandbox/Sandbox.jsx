import { Board } from '../board';
import { Column, ColumnTitle } from '../column';
import { Task } from '../task';

const Sandbox = () => {
    return (
        <Board>
            <Column>
                <ColumnTitle title='Todo' color='var(--color-1)' />
                <Task title='Build UI for onboarding flow' num1='0' num2='6' />
                <Task title='Build UI for search' num1='0' num2='1' />
                <Task title='Build settings UI' num1='0' num2='2' />
                <Task
                    title='QA and test all major user journeys'
                    num1='0'
                    num2='2'
                />
            </Column>
            <Column>
                <ColumnTitle title='Doing' color='var(--color-purple-100)' />
                <Task
                    title='Design settings and search pages'
                    num1='1'
                    num2='3'
                />
                <Task
                    title='Add account management endpoints'
                    num1='2'
                    num2='3'
                />
                <Task title='Design onboarding flow' num1='1' num2='3' />
                <Task title='Add search endpoints' num1='1' num2='2' />
                <Task title='Add authentication endpoints' num1='1' num2='2' />
            </Column>
            <Column>
                <ColumnTitle title='Done' color='var(--color-2)' />
                <Task title='Conduct 5 wireframe tests' num1='1' num2='1' />
                <Task title='Create wireframe prototype' num1='1' num2='1' />
                <Task
                    title='Review results of usability tests and iterate'
                    num1='3'
                    num2='3'
                />
                <Task
                    title='Create paper prototypes and conduct 10 usability tests
   with potential customers'
                    num1='2'
                    num2='2'
                />
                <Task title='Market discovery' num1='1' num2='1' />
                <Task title='Competitor analysis' num1='2' num2='2' />
                <Task title='Research the market' num1='2' num2='2' />
            </Column>
        </Board>
    );
};

export default Sandbox;
