import { Box, Button, Modal, Typography } from "@mui/material";

function DeleteModal({
  isOpen,
  onClose,
  onComfirmDelete,
  deleteTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onComfirmDelete: () => void;
  deleteTitle: string;
}) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" id="child-modal-title" mb={2}>
          Delete {deleteTitle}?
        </Typography>
        <Typography variant="body2" id="child-modal-description" mb={3}>
          This action cannot be undone.
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={onClose} sx={{ width: "45%" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onComfirmDelete}
            sx={{ width: "45%" }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
