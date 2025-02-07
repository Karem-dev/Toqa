import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";

export function Modal({ message, body, doing }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {message}
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Typography color="red" variant="h4">
            {message}
          </Typography>
          <Typography className="text-center font-normal">
            {body}
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            Close
          </Button>
          <Button
            variant="gradient"
            onClick={() => {
              doing();  // Trigger the delete action
              handleOpen(); // Close the modal
            }}
          >
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
