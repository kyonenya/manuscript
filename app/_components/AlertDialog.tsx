'use client';

import {
  Root,
  Content,
  Title,
  Description,
  Action,
  Overlay,
  Portal,
  Trigger,
  Cancel,
} from '@radix-ui/react-alert-dialog';
import { ReactElement } from 'react';
import { Button } from './Button';

/**
 * Alert Dialog
 *
 * @see https://www.radix-ui.com/docs/primitives/components/alert-dialog
 */
export const AlertDialog = (props: {
  headerText: string;
  triggerButton: ReactElement;
  onSubmit?: () => void;
}) => {
  return (
    <Root>
      <Trigger asChild>{props.triggerButton}</Trigger>
      <Portal>
        <Overlay className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <Content className="z-50 mx-auto my-10 max-w-md rounded-md bg-white p-6 shadow-md dark:bg-gray-700">
            <Title className="mb-3 text-xl font-bold dark:text-gray-300">
              {props.headerText}
            </Title>
            <Description className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure? You cannot undo this action afterwards.
            </Description>
            <div className="mt-4 flex justify-end space-x-4">
              <Cancel asChild>
                <Button className="w-auto px-4 dark:bg-gray-600 dark:hover:bg-gray-500">
                  Cancel
                </Button>
              </Cancel>
              <Action asChild>
                <Button
                  variant={{ color: 'danger' }}
                  className="w-auto px-4"
                  disabled={!props.onSubmit}
                  onClick={props.onSubmit}
                >
                  Delete
                </Button>
              </Action>
            </div>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  );
};
