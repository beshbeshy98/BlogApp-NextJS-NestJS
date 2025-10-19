"use client";
import {
  getPostLikeData,
  likePost,
  unlikePost,
} from "@/lib/actions/likeActions";
import { SessionUser } from "@/lib/session";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  user: SessionUser;
  postId: number;
};
const Like = (props: Props) => {
  const { data, refetch: refetchPostLikeData } = useQuery({
    queryKey: ["GET_POST_LIKE_DATA", props.postId],
    queryFn: async () => await getPostLikeData(props.postId),
  });

  const likeMutation = useMutation({
    mutationFn: () => likePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });

  const unlikeMutation = useMutation({
    mutationFn: () => unlikePost(props.postId),
    onSuccess: () => refetchPostLikeData(),
  });
  return (
    <div className="mt-3 flex justify-start items-center gap-2">
      {data?.userLikedPost ? (
        <button
          onClick={() => unlikeMutation.mutate()}
          className="cursor-pointer"
        >
          <SolidHeartIcon className="w-6 text-rose-600" />
        </button>
      ) : (
        <button
          onClick={() => likeMutation.mutate()}
          className="cursor-pointer"
        >
          <HeartIcon className="w-6" />
        </button>
      )}
      <p className="text-slate-600">{data?.likeCount}</p>
    </div>
  );
};

export default Like;
