import { Post } from "@/lib/types/modelTypes";
import PostListItem from "./postListItem";

type Props = {
  posts: Post[];
  curentPage: number;
  totalPages: number;
};
const PostList = ({ posts, currentPage, totalPages }: Props) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md p-3 m-3 text-center">
        <div className="col-span-3"></div>
        <div>Date</div>
        <div>Published</div>
        <div>Likes</div>
        <div>Comments</div>
        <div></div>
      </div>
      {posts.map((post) => (
        <PostListItem post={post} key={post.id}/>
      ))}
    </>
  );
};
export default PostList;
