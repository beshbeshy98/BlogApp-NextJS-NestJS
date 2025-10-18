"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { print } from "graphql";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFormSchema";

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

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data)
    return {
      message: "Comment Saved Successfully!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong",
    data: Object.fromEntries(formData.entries()),
    ok: false,
    open: true,
  };
}
