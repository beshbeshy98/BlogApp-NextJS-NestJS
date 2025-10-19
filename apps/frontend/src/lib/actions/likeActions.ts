"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import { POST_LIKES } from "../gqlQueries";
import { print } from "graphql";
export async function getPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES),{
    postId
  });
  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean
  }
}
