"use server";

import { authFetchGraphQL } from "../fetchGraphQL";
import {
  LIKE_POST_MUTATION,
  POST_LIKES,
  UNLIKE_POST_MUTATION,
} from "../gqlQueries";
import { print } from "graphql";
export async function getPostLikeData(postId: number) {
  const data = await authFetchGraphQL(print(POST_LIKES), {
    postId,
  });
  return {
    likeCount: data.postLikesCount as number,
    userLikedPost: data.userLikedPost as boolean,
  };
}

export async function likePost(postId: number) {
  const data = await authFetchGraphQL(print(LIKE_POST_MUTATION), {
    postId,
  });
}

export async function unlikePost(postId: number) {
  const data = await authFetchGraphQL(print(UNLIKE_POST_MUTATION), {
    postId,
  });
}
