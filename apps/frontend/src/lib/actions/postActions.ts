"use server";

import { print } from "graphql";
import { authFetchGraphQL, fetchGraphQL } from "../fetchGraphQL";
import {
  CREATE_POST_MUTATION,
  GET_POST_BY_ID,
  GET_POSTS,
  GET_USER_POSTS,
} from "../gqlQueries";
import { transformTakeSkip } from "../helpers";
import { PostFormState } from "../types/formState";
import { Post } from "../types/modelTypes";
import { postFormSchema } from "../zodSchemas/postFormSchema";
import { uploadThumbnail } from "../upload";

export const fetchPosts = async ({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) => {
  const { skip, take } = transformTakeSkip({ page, pageSize });
  const data = await fetchGraphQL(print(GET_POSTS), { skip, take });
  return { posts: data.posts as Post[], totalPosts: data.postCount };
};

export const fetchPostById = async (id: number) => {
  const data = await fetchGraphQL(print(GET_POST_BY_ID), { id });

  return data.getPostById as Post;
};

export async function fetchUserPosts({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  const { take, skip } = transformTakeSkip({ page, pageSize });
  const data = await authFetchGraphQL(print(GET_USER_POSTS), {
    skip,
    take,
  });
  return {
    posts: data.getUserPosts as Post[],
    totalPosts: data.userPostCount as number,
  };
}

export async function savePost(
  state: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const validatedFields = postFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  let thumbnailUrl = "";

  if (validatedFields.data?.thumbnail)
    thumbnailUrl = await uploadThumbnail(validatedFields.data.thumbnail);
  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };
  const data = await authFetchGraphQL(print(CREATE_POST_MUTATION), {
    createPostInput: {
      ...validatedFields.data,
      thumbnail: thumbnailUrl,
    },
  });

  if (data) return { message: "Post created successfully!", ok: true };
  return {
    message: "Failed to create post.",
    ok: false,
    data: Object.fromEntries(formData.entries()),
  };
}
