export type SignUpFormState = {
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
};

export type CreateCommentFormState = {
  data: {
    content: string;
    postId: string;
  };
  errors?: {
    content: string[];
  };
  ok?: boolean;
  open?: boolean;
};
