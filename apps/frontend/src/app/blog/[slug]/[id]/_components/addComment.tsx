import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { CommentEntity } from "@/lib/types/modelTypes";
import { cn } from "@/lib/utils";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
  refetch: (options?: RefetchOptions | undefined) => Promise<
    QueryObserverResult<
      {
        comments: CommentEntity[];
        count: number;
      },
      Error
    >
  >;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);

  useEffect(() => {
    if(state?.message)
    toast(state?.ok ? "Success" : "Error", {
      description: state?.message,
    });
    if (state?.ok) props.refetch();
  },[state]);
  return (
    <div>
      <Dialog open={state?.open}>
        <DialogTrigger asChild>
          <Button>Leave your comment</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Write your comment</DialogTitle>
          <form action={action} className={cn(props.className)}>
            <input defaultValue={props.postId} type="hidden" name="postId" />
            <Label htmlFor="comment">Your Comment</Label>
            <div className="border-t border-x rounded-t-md">
              <Textarea
                name="content"
                className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              />
              {!!state?.errors?.content && (
                <p className="text-red-500 animate-shake">
                  {state.errors.content}
                </p>
              )}
              <p className="border rounded-b-md p-2">
                <span className="text-slate-400">Write as </span>
                <span className="text-slate-700">{props.user.name}</span>
              </p>
            </div>
            <SubmitButton className="mt-2">Submit</SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddComment;
