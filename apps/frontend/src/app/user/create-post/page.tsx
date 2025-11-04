import CreatePostContainer from "./_component/createPostContainer";
import UpsertPostForm from "./_component/upsertPostForm";

const CreatePostPage = () => {
  return (
    <div className="bg-white shadow-md p-6 rounded-md  max-w-2xl w-full">
      <p className="text-xl text-center font-bold text-slate-700">
        Create a New Post
      </p>
      <CreatePostContainer />
    </div>
  );
};

export default CreatePostPage;
