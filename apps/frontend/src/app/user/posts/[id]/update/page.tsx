import { fetchPostById } from "@/lib/actions/postActions";
import UpdatePostContainer from "../_components/updatePostContainer";

type Props = {
  params: {
    id: string;
  };
};
const UpdatePostPage = async (props: Props) => {
  const params = await props.params;
  const post = await fetchPostById(parseInt(params.id));
  return (
    <div className="bg-white shadow-md p-6 rounded-md  max-w-2xl w-full">
      <p className="text-xl text-center font-bold text-slate-700">
        Update Post
      </p>
      <UpdatePostContainer post={post} />
    </div>
  );
};

export default UpdatePostPage;
