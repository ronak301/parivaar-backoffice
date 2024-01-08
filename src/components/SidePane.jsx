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
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{heading}</DrawerHeader>

          <DrawerBody>
            <form
              id="my-form"
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              {children}
            </form>
          </DrawerBody>

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
