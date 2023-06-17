import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';
import { ReactElement } from 'react';
import { Button } from './Button';

export const CustomAlertDialog = (props: {
  headerText: string;
  triggerButton: ReactElement;
  onSubmit: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.triggerButton}</AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <AlertDialogContent className="z-50 mx-auto my-10 p-6 rounded-md shadow-md bg-white dark:bg-gray-700 max-w-md">
            <AlertDialogTitle className="text-xl font-bold mb-4 dark:text-gray-300">
              {props.headerText}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogDescription>
            <div className="mt-4 flex justify-end space-x-4">
              <AlertDialogCancel>
                <Button className="px-4 dark:bg-gray-600 dark:hover:bg-gray-500">
                  Cancel
                </Button>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Button
                  onClick={props.onSubmit}
                  className="px-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white"
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialogPortal>
    </AlertDialog>
  );
};
