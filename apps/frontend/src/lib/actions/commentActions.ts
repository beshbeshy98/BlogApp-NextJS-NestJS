"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { GET_POST_COMMENTS } from "../gqlQueries";
import { print } from "graphql";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";

export async function getPostComments({
  postId,
  take,
  skip,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });

  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.commentPostCount as number,
  };
}

