import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SessionUser } from "@/lib/session";
import { cn } from "@/lib/utils";

type Props = {
  postId: number;
  user: SessionUser;
  className?: string;
};

const AddComment = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Leave your comment</Button>
        </DialogTrigger>
        <DialogContent>
          <form className={cn(props.className)}>
            <Label htmlFor="comment">Your Comment</Label>
            <div className="border-t border-x rounded-t-md">
              <Textarea name="comment" className="border-none active:outline-none focus-visible:ring-0 shadow-none"/>
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
