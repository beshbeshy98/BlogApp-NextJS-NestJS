"use client";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";

const UpsertPostForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  return (
    <form className="flex flex-col gap-5 max-w-lg mx-auto [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input name="title" placeholder="Enter The Title Of You Post" />
      </div>
      <div></div>
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
        />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!imageUrl && (
          <Image
            src={imageUrl}
            alt="Thumbnail Preview"
            width={200}
            height={200}
          />
        )}
      </div>
      <div>
        <Label htmlFor="title">Tags (comma-seperated)</Label>
        <Input name="title" placeholder="Enter The Title Of You Post" />
      </div>
      <div className="flex items-center">
        <input className="mx-2 w-4" type="checkbox" name="published" />
        <Label htmlFor="published">Published</Label>
      </div>
      <SubmitButton>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;
