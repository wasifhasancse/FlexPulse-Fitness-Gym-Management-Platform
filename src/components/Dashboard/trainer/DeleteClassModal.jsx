"use client";

import { deleteClassById } from "@/lib/actions/deleteClass";
import { AlertDialog, Button, toast } from "@heroui/react";

import { FaTrash } from "react-icons/fa";

export function DeleteClassModal({ classes, onDelete }) {
  const classId = classes._id;
  const handleDelete = async (classId) => {
    try {
      const result = await deleteClassById(classId);

      if (result.deletedCount > 0) {
        toast.success("Delete Successfully!");

        onDelete?.();
      }
    } catch (error) {
      toast.error("Delete Failed!");
    }
  };
  return (
    <AlertDialog>
      <Button
        className="bg-transparent p-1.5 text-[#535C91] dark:text-[#9290C3] hover:text-rose-500 transition-colors cursor-pointer"
        title="Delete"
      >
        <FaTrash className="w-4 h-4" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete class permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{classes.className}</strong> and all of its data. This
                action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(classes._id)}
                slot="close"
                variant="danger"
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
