import { CommentEntity } from "./modelTypes.d";
export type SignUpFormState =
  | {
      data: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CreateCommentFormState =
  | {
      data?: {
        content?: string;
        postId?: string;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      ok?: boolean;
      open?: boolean;
    }
  | undefined;

export type PostFormState =
  | {
      data?: {
        title?: string;
        content?: string;
        thumbnail?: string;
        tags?: string;
        published?: string;
      };
      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        published?: string[];
      };
      message?: string;
      ok?: boolean;
    }
  | undefined;
