import { useSelector } from 'react-redux';
import { ChangePasswordDialog, SignOutDialog } from '../../../features/account';
import { CreateNewBoardDialog } from '../../../features/board';
import { AddNewTaskDialog, OpenTaskDialog } from '../../../features/task';
import { DeleteBoardDialog } from '../../../features/board/DeleteBoardDialog';
import { DeleteTaskDialog } from '../../../features/task/DeleteTaskDialog';

export const DialogManager = () => {
    const dialogLookup = {
        signOut: SignOutDialog,
        changePassword: ChangePasswordDialog,
        createNewBoard: CreateNewBoardDialog,
        deleteBoard: DeleteBoardDialog,
        openTask: OpenTaskDialog,
        addNewTask: AddNewTaskDialog,
        deleteTask: DeleteTaskDialog,
    };
    const { dialogType, dialogProps } = useSelector(state => state.ui.dialog);
    let renderedDialog;
    if (dialogType) {
        const DialogComponent = dialogLookup[dialogType];
        renderedDialog = <DialogComponent {...dialogProps} />;
    }

    return <span>{renderedDialog}</span>;
};
