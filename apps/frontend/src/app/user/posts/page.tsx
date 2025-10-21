import { fetchUserPosts } from "@/lib/actions/postActions";
import NoPost from "./_components/noPost";
import PostList from "./_components/postList";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
const UserPostPage = async ({ searchParams }: Props) => {
  const { page } = await searchParams;
  const { posts, totalPosts } = await fetchUserPosts({
    page: page ? +page : undefined,
  });
  return (
    <>
      <div>
        {!posts || !posts.length ? (
          <NoPost />
        ) : (
          <PostList
            posts={posts}
            currentPage={page ? +page : 1}
            totalPages={Math.ceil(totalPosts / DEFAULT_PAGE_SIZE)}
          />
        )}
      </div>
    </>
  );
};

export default UserPostPage;
