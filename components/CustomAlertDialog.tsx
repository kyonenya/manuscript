'use client';

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
import { Button } from '../app/_components/Button';

export const CustomAlertDialog = (props: {
  headerText: string;
  triggerElement: ReactElement;
  onSubmit?: () => void;
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{props.triggerElement}</AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <AlertDialogContent className="z-50 mx-auto my-10 max-w-md rounded-md bg-white p-6 shadow-md dark:bg-gray-700">
            <AlertDialogTitle className="mb-3 text-xl font-bold dark:text-gray-300">
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
                  disabled={!props.onSubmit}
                  variant={{ color: 'danger' }}
                  onClick={props.onSubmit}
                  className="px-4"
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
