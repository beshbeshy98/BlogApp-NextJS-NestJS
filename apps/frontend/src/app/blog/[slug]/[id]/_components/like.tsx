"use client";
import { Button } from "@/components/ui/button";
import { getPostLikeData } from "@/lib/actions/likeActions";
import { SessionUser } from "@/lib/session";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useQuery } from "@tanstack/react-query";

type Props = {
  user: SessionUser;
  postId: number;
};
const Like = (props: Props) => {
  const { data } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });
  return (
    <div className="mt-3 flex justify-start items-center gap-2">
      {data?.userLikedPost ? (
        <button>
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button>
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
};

export default Like;
