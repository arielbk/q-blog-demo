import Link from 'next/link';

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul className="grid mx-auto my-12 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {posts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <li
            className="hover:shadow-lg active:shadow-none cursor-pointer transition-shadow duration-200 flex py-3 px-6 border rounded-lg flex-col justify-between"
            data-testid="post-item"
          >
            <a className="font-medium capitalize text-lg mb-8">{post.title}</a>
            <aside className="text-sm">by {post.user.name}</aside>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
