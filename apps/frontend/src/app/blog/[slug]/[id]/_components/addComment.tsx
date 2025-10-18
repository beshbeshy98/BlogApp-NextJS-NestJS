import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveComment } from "@/lib/actions/commentActions";
import { SessionUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useActionState } from "react";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
};

const AddComment = (props: Props) => {
  const [state, action] = useActionState(saveComment, undefined);
  return (
    <div>
      <Dialog open={state?.open}>
        <DialogTrigger asChild>
          <Button>Leave your comment</Button>
        </DialogTrigger>
        <DialogContent>
          <form action={action} className={cn(props.className)}>
            <Label htmlFor="comment">Your Comment</Label>
            <div className="border-t border-x rounded-t-md">
              <Textarea
                name="comment"
                className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              />
              {!!state?.errors?.content && <p className="text-red-500 animate-shake">{state.errors.content}</p>}
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
