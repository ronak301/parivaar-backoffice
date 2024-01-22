import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

export const SidePane = ({ heading, children, footer, isOpen, onClose }) => {
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} size="md">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{heading}</DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>
            {footer}
            {/* <Button type="submit" form="my-form">
              Save
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
