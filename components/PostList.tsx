import Link from 'next/link';
import { useEffect, useState } from 'react';
import useComponentLogger from '../hooks/useComponentLogger';
import { Post } from '../types';

interface Props {
  posts: Post[];
  query: string;
}

const PostList: React.FC<Props> = ({ posts, query }) => {
  useComponentLogger('PostList');

  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (!query) return;
    // filter post authors by search query (case insensitive)
    const filtered = posts.filter((post) =>
      post.user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [posts, query]);

  if (!filteredPosts.length) {
    return (
      <div
        data-testid="postlist-empty"
        className="text-xl text-gray-400 flex place-content-center p-12"
      >
        No posts found!
      </div>
    );
  }
  return (
    <ul
      data-testid="postlist"
      className="grid mx-auto my-12 gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {filteredPosts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <a>
            <li
              data-testid="postlist-item"
              className="bg-white hover:shadow-lg active:shadow-none cursor-pointer transition-shadow duration-200 flex py-3 px-6 border rounded-lg flex-col justify-between"
            >
              <h3
                data-testid="postlist-title"
                className="font-medium capitalize text-lg mb-8"
              >
                {post.title}
              </h3>
              <span data-testid="postlist-commentcount">
                Comments: {post.comments.length}
              </span>
              <span data-testid="postlist-author" className="text-sm">
                by {post.user.name}
              </span>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
