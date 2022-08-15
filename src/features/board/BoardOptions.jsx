import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../app/common/dropdownMenu';

export const BoardOptions = ({ trigger }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>Edit Board</DropdownMenuItem>
                <DropdownMenuItem>Delete Board</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
