import { nanoid } from '@reduxjs/toolkit';

const board1 = nanoid();
const board2 = nanoid();
const board3 = nanoid();

export const sampleData = [
    {
        id: board1,
        title: 'Platform Launch',
        columns: [
            {
                color: 1,
                title: 'Todo',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board1,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Todo',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: '2',
                title: 'Doing',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board1,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Doing',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: '3',
                title: 'Done',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board1,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Done',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: board2,
        title: 'Marketing Plan',
        columns: [
            {
                color: 1,
                title: 'Todo',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board2,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Todo',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: 2,
                title: 'Doing',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board2,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Doing',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: 3,
                title: 'Done',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board2,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Done',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: board3,
        title: 'Roadmap',
        columns: [
            {
                color: 1,
                title: 'Todo',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board3,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Todo',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: 2,
                title: 'Doing',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board3,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Doing',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
            {
                color: 3,
                title: 'Done',
                tasks: [
                    {
                        taskId: nanoid(),
                        boardId: board3,
                        title: 'Build UI for onboarding flow',
                        description:
                            "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
                        column: 'Done',
                        subtasks: [
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Research competitor pricing and business models',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'utline a business model that works for our solution',
                            },
                            {
                                subtaskId: nanoid(),
                                completed: false,
                                title: 'Talk to potential customers about our proposed solution and ask for fair price expectancy',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
