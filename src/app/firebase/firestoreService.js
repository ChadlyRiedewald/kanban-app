import {
    doc,
    setDoc,
    serverTimestamp,
    updateDoc,
    collection,
    writeBatch,
    arrayRemove,
    arrayUnion,
} from 'firebase/firestore';
import { auth, db } from './config';

//=====================
// USER
/* Set User Profile Data in Firestore */
export function addUserToFirestore(user) {
    return setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
    });
}

//=====================
// BOARDS / COLUMNS
/* Add Board to Firestore */
export function addBoardToFirestore(values) {
    const user = auth.currentUser;
    const boardRef = doc(collection(db, 'users', user.uid, 'boards'));
    let columnIds = [];

    // Set Column(s)
    values.columns.map(column => {
        const columnRef = doc(collection(db, 'users', user.uid, 'columns'));
        columnIds.push(columnRef.id);
        const columnData = {
            ...column,
            id: columnRef.id,
            boardId: boardRef.id,
            createdAt: serverTimestamp(),
        };
        return setDoc(columnRef, columnData);
    });

    // Set Board
    const boardData = {
        id: boardRef.id,
        title: values.title,
        createdAt: serverTimestamp(),
        columnIds: columnIds,
    };
    return setDoc(boardRef, boardData);
}

// Update Board
export function updateBoardFromFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const boardRef = doc(db, 'users', user.uid, 'boards', values.board.id);
    const columnIds = values.columns.map(({ id }) => id);

    // Removing Columns
    const columnIdsToRemove = values.board.columnIds.filter(
        columnId => !columnIds.includes(columnId)
    );
    columnIdsToRemove.map(columnId => {
        const columnRef = doc(db, 'users', user.uid, 'columns', columnId);
        return batch.delete(columnRef);
    });

    // Removing Tasks
    const taskIdsToRemove = values.prevTasks
        .filter(task => columnIdsToRemove.includes(task.columnId))
        .reduce((prev, curr) => [...prev, curr.id], []);

    taskIdsToRemove.map(taskId => {
        const taskRef = doc(db, 'users', user.uid, 'tasks', taskId);
        return batch.delete(taskRef);
    });

    // Removing Subtasks
    const subtaskIdsToRemove = values.prevSubtasks
        .filter(subtask => taskIdsToRemove.includes(subtask.taskId))
        .reduce((prev, curr) => [...prev, curr.id], []);

    subtaskIdsToRemove.map(subtaskId => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtaskId);
        return batch.delete(subtaskRef);
    });

    // Updating Columns
    const columnsToUpdate = values.columns.filter(column =>
        values.board.columnIds.includes(column.id)
    );
    columnsToUpdate.map(column => {
        const columnRef = doc(db, 'users', user.uid, 'columns', column.id);
        return batch.update(columnRef, column);
    });

    // Adding Columns
    const columnsToAdd = values.columns.filter(
        column => !values.board.columnIds.includes(column.id)
    );
    columnsToAdd.map(column => {
        const columnRef = doc(db, 'users', user.uid, 'columns', column.id);
        return setDoc(columnRef, {
            ...column,
            createdAt: serverTimestamp(),
        });
    });

    // Updating Board
    let boardData;
    const getBoardData = () => {
        if (values.title) {
            boardData = {
                title: values.title,
                columnIds: columnIds,
            };
            return boardData;
        } else {
            boardData = {
                columnIds: columnIds,
            };
            return boardData;
        }
    };
    getBoardData();

    batch.update(boardRef, boardData);

    return batch.commit();
}

// Remove Board from Firestore
export function removeBoardFromFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const boardRef = doc(db, 'users', user.uid, 'boards', values.board.id);

    // Remove Board
    batch.delete(boardRef);

    // Remove Columns
    values.columns.map(column => {
        const columnRef = doc(db, 'users', user.uid, 'columns', column.id);
        return batch.delete(columnRef);
    });

    // Remove Tasks
    values.tasks.map(task => {
        const taskRef = doc(db, 'users', user.uid, 'tasks', task.id);
        return batch.delete(taskRef);
    });

    // Remove Subtasks
    values.subtasks.map(subtask => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtask.id);
        return batch.delete(subtaskRef);
    });

    return batch.commit();
}

// Add Column
export function addColumnToFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const boardRef = doc(db, 'users', user.uid, 'boards', values.board.id);

    // Set Column
    const columnRef = doc(collection(db, 'users', user.uid, 'columns'));
    batch.set(columnRef, {
        ...values.column,
        id: columnRef.id,
        createdAt: serverTimestamp(),
    });

    // Update Board
    batch.update(boardRef, {
        columnIds: arrayUnion(columnRef.id),
    });

    return batch.commit();
}

//=====================
// TASKS / SUBTASKS
/* Add Task in Column */
export function addTaskToFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const taskRef = doc(collection(db, 'users', user.uid, 'tasks'));
    let subtaskIds = [];

    // Add Subtask(s)
    values.subtasks.map(subtask => {
        const subtaskRef = doc(collection(db, 'users', user.uid, 'subtasks'));
        subtaskIds.push(subtaskRef.id);
        const subtaskData = {
            ...subtask,
            id: subtaskRef.id,
            taskId: taskRef.id,
            createdAt: serverTimestamp(),
        };
        return setDoc(subtaskRef, subtaskData);
    });

    // Add Task
    const taskData = {
        id: taskRef.id,
        title: values.title,
        description: values.description,
        columnId: values.columnId,
        createdAt: serverTimestamp(),
        subtaskIds: subtaskIds,
    };

    batch.set(taskRef, taskData);

    // Update Column
    const columnRef = doc(db, 'users', user.uid, 'columns', values.columnId);
    batch.update(columnRef, {
        taskIds: arrayUnion(taskRef.id),
    });

    return batch.commit();
}

// Update Task
export function updateTaskFromFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const taskRef = doc(db, 'users', user.uid, 'tasks', values.task.id);
    const prevSubtaskIds = values.prevSubtasks.map(subtask => subtask.id);
    let subtaskIds = values.subtasks.map(({ id }) => id);

    // Remove Subtasks
    const subtaskIdsToRemove = prevSubtaskIds.filter(
        subtaskId => !subtaskIds.includes(subtaskId)
    );

    subtaskIdsToRemove.map(subtaskId => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtaskId);
        return batch.delete(subtaskRef);
    });

    // Update Subtasks
    const subtasksToUpdate = values.subtasks.filter(subtask =>
        prevSubtaskIds.includes(subtask.id)
    );

    subtasksToUpdate.map(subtask => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtask.id);
        return batch.update(subtaskRef, subtask);
    });

    // Add Subtasks
    const subtasksToAdd = values.subtasks.filter(
        subtask => !prevSubtaskIds.includes(subtask.id)
    );

    subtasksToAdd.map(subtask => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtask.id);
        return setDoc(subtaskRef, {
            ...subtask,
            taskId: taskRef.id,
            createdAt: serverTimestamp(),
        });
    });

    // Update Column
    if (values.columnId !== values.task.columnId) {
        const prevColumnRef = doc(
            db,
            'users',
            user.uid,
            'columns',
            values.task.columnId
        );
        const columnRef = doc(
            db,
            'users',
            user.uid,
            'columns',
            values.columnId
        );

        batch.update(prevColumnRef, {
            taskIds: arrayRemove(values.task.id),
        });

        batch.update(columnRef, {
            taskIds: arrayUnion(values.task.id),
        });

        batch.update(taskRef, {
            columnId: values.columnId,
            title: values.title,
            description: values.description,
            subtaskIds: subtaskIds,
            createdAt: serverTimestamp(),
        });
    } else {
        batch.update(taskRef, {
            title: values.title,
            description: values.description,
            subtaskIds: subtaskIds,
            createdAt: serverTimestamp(),
        });
    }

    return batch.commit();
}

// Remove Task
export function removeTaskFromFirestore(values) {
    const batch = writeBatch(db);
    const user = auth.currentUser;
    const taskRef = doc(db, 'users', user.uid, 'tasks', values.task.id);
    const columnRef = doc(
        db,
        'users',
        user.uid,
        'columns',
        values.task.columnId
    );

    // Remove Task
    batch.delete(taskRef);

    // Remove Subtasks
    const subtaskIdsToRemove = values.subtasks.map(({ id }) => id);

    subtaskIdsToRemove.map(subtaskId => {
        const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtaskId);
        return batch.delete(subtaskRef);
    });

    // Update Column, taskIds
    batch.update(columnRef, {
        taskIds: arrayRemove(values.task.id),
    });

    return batch.commit();
}

// Update task column
export function updateTaskColumn(values) {
    const user = auth.currentUser;
    const taskRef = doc(db, 'users', user.uid, 'tasks', values.id);
    const batch = writeBatch(db);
    const prevColumnRef = doc(
        db,
        'users',
        user.uid,
        'columns',
        values.prevColumn.id
    );
    const prevColumnTaskIds = values.prevColumn.taskIds;
    const columnRef = doc(db, 'users', user.uid, 'columns', values.column.id);
    const columnTaskIds = values.column.taskIds;

    batch.update(prevColumnRef, {
        taskIds: prevColumnTaskIds.filter(id => id !== values.id),
    });

    batch.update(columnRef, {
        taskIds: [...columnTaskIds, values.id],
    });

    batch.update(taskRef, {
        columnId: values.column.id,
        createdAt: serverTimestamp(),
    });

    return batch.commit();
}

// Toggle Subtask Completed
export function toggleSubtaskCompleted(subtask) {
    const user = auth.currentUser;
    const subtaskRef = doc(db, 'users', user.uid, 'subtasks', subtask.id);

    return updateDoc(subtaskRef, {
        completed: !subtask.completed,
    });
}
