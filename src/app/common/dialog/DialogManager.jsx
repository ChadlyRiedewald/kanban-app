import { useSelector } from 'react-redux';
import {
    UpdatePasswordDialog,
    SignOutDialog,
    ResetPasswordDialog,
} from '../../../features/auth';
import { AddBoardDialog, UpdateBoardDialog } from '../../../features/boards';
import { AddTaskDialog, TaskDialog } from '../../../features/tasks';
import { RemoveBoardDialog } from '../../../features/boards/';
import { RemoveTaskDialog } from '../../../features/tasks/RemoveTaskDialog';
import { UpdateTaskDialog } from '../../../features/tasks/UpdateTaskDialog';
import { AddColumnDialog } from '../../../features/columns/AddColumnDialog';
import { AnimatePresence } from 'framer-motion';

export const DialogManager = () => {
    const dialogLookup = {
        signOut: SignOutDialog,
        updatePassword: UpdatePasswordDialog,
        resetPassword: ResetPasswordDialog,
        addBoard: AddBoardDialog,
        updateBoard: UpdateBoardDialog,
        removeBoard: RemoveBoardDialog,
        addColumn: AddColumnDialog,
        openTask: TaskDialog,
        addTask: AddTaskDialog,
        updateTask: UpdateTaskDialog,
        removeTask: RemoveTaskDialog,
    };
    const { dialogType, dialogProps } = useSelector(state => state.ui.dialog);
    let renderedDialog;
    if (dialogType) {
        const DialogComponent = dialogLookup[dialogType];
        renderedDialog = <DialogComponent {...dialogProps} />;
    }

    return <AnimatePresence>{renderedDialog}</AnimatePresence>;
};
