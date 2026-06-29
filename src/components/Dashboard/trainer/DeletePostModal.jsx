"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast} from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { deletePostById } from "@/lib/actions/deleteClass";
import { authClient } from "@/lib/auth-client";

export function DeletePostModal({ post }) {
  const postId = post._id;
  const router = useRouter();
  const handleDelete = async (postId) => {

// const result = await deleteClassById(classId);
      const { data: token } = await authClient.token();
      const tokenData = token?.token;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(tokenData && { authorization: `Bearer ${tokenData}` }),
          },
        },
      );
      const response = await res.json();

      if (response.deletedCount > 0) {
        toast.success("Delete Successfully!");
        router.refresh("/dashboard/trainer/my-posts");

      }
  };
  return (
    <AlertDialog>
      <Button
        className="absolute top-3 right-3 z-10 p-2 bg-black/60 text-white rounded-full hover:bg-rose-600 transition-colors cursor-pointer"
        title="Delete Post"
      >
        <FaTrash className="w-3.5 h-3.5" />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete post permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{post.title}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(postId)}
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
