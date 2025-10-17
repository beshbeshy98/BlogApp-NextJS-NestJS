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
            <Textarea name="comment" />
            <p>
              <span>Write as</span>
              <span>{props.user.name}</span>
            </p>
            <SubmitButton>Submit</SubmitButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddComment;
