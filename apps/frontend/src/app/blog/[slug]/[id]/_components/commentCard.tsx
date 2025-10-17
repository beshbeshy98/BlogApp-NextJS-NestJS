import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentEntity } from "@/lib/types/modelTypes";
import { UserIcon } from "@heroicons/react/24/outline";

type Props = {
  comment: CommentEntity;
};

const CommentCard = ({ comment }: Props) => {
  return (
    <div className="p-2 rounded shadow">
      <div className="flex gap-2 items-center text-slate-500">
        <Avatar>
          <AvatarImage src={comment.author.avatar} />
          <AvatarFallback>
            <UserIcon className="w-8" />
          </AvatarFallback>
        </Avatar>
        <p>{comment.author.name}</p>
        <p>| {new Date(comment.createdAt).toLocaleDateString()}</p>
      </div>
      <p className="mt-4">{comment.content}</p>
    </div>
  );
};

export default CommentCard;