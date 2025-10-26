"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PostFormState } from "@/lib/types/formState";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  state: PostFormState;
  formAction: (payload: FormData) => void;
};
const UpsertPostForm = ({ state, formAction }: Props) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (state?.message)
      toast(state?.ok ? "Success" : "Error", {
        description: state?.message,
      });
  }, [state]);
  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 max-w-lg mx-auto [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <input name="postId" defaultValue={state?.data?.postId} hidden />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title Of You Post"
          defaultValue={state?.data?.title}
        />
      </div>
      {!!state?.errors?.title && (
        <p className="text-sm text-red-500">{state.errors.title}</p>
      )}
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={state?.data?.content}
        />
      </div>
      {!!state?.errors?.content && (
        <p className="text-sm text-red-500">{state.errors.content}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
            else setImageUrl("");
          }}
        />
        {(!!imageUrl || !!state?.data?.previousPostThumbnail) && (
          <Image
            src={(imageUrl || state?.data?.previousPostThumbnail) ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      {!!state?.errors?.thumbnail && (
        <p className="text-sm text-red-500">{state.errors.thumbnail}</p>
      )}
      <div>
        <Label htmlFor="tags">Tags (comma-seperated)</Label>
        <Input
          name="tags"
          placeholder="Write Your Tags Here"
          defaultValue={state?.data?.tags}
        />
      </div>
      {!!state?.errors?.tags && (
        <p className="text-sm text-red-500">{state.errors.tags}</p>
      )}
      <div className="flex items-center">
        <input
          className="mx-2 w-4"
          type="checkbox"
          name="published"
          defaultChecked={state?.data?.published === "on" ? true : false}
        />
        <Label htmlFor="published">Published</Label>
      </div>
      {!!state?.errors?.published && (
        <p className="text-sm text-red-500">{state.errors.published}</p>
      )}
      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
