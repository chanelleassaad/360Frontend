import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
          bgcolor: "background.paper",
          boxShadow: 24,
          minWidth: "30%",
          maxWidth: "90%",
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ bgcolor: "#f0f0f0", p: 1, borderRadius: 2, m: 0 }} // Light gray background for header
        >
          <Typography id="child-modal-title" sx={{ fontWeight: "bold" }}>
            Delete {deleteTitle}?
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography variant="body2" id="child-modal-description" m={2}>
          This can't be undone.
        </Typography>
        <Box sx={{ borderTop: "1px solid #e0e0e0", mt: 2 }} />{" "}
        {/* Line above buttons */}
        <Box display="flex" justifyContent="flex-end" m={1}>
          <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onComfirmDelete}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
