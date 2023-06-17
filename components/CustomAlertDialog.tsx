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
        <AlertDialogOverlay className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <AlertDialogContent className="z-50 mx-auto my-10 max-w-md rounded-md bg-white p-6 shadow-md dark:bg-gray-700">
            <AlertDialogTitle className="mb-4 text-xl font-bold dark:text-gray-300">
              {props.headerText}
            </AlertDialogTitle>
            <AlertDialogDescription className="mb-6 text-gray-600 dark:text-gray-300">
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
                  className="bg-red-500 px-4 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
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
