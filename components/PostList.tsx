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
      className="grid mx-auto my-12 gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {filteredPosts.map((post) => (
        <Link key={post.id} href={`/post/${post.id}`}>
          <a className="bg-white hover:shadow-lg hover:border-gray-400 active:shadow-none cursor-pointer transition-shadow duration-200 border rounded-lg overflow-hidden">
            <li
              data-testid="postlist-item"
              className="flex flex-col justify-between h-full"
            >
              <div className="px-4 py-4 h-full">
                <h3
                  data-testid="postlist-title"
                  className="font-medium capitalize text-lg"
                >
                  {post.title}
                </h3>
                <span data-testid="postlist-author" className="text-sm italic">
                  by {post.user.name}
                </span>
              </div>
              <div
                data-testid="postlist-commentcount"
                className="bg-gray-100 px-3 py-2 text-right text-sm mt-4"
              >
                <span className="font-medium">Comments:</span>{' '}
                <span className="ml-2 bg-gray-400 text-gray-50 px-2 py-1 rounded-full">
                  {post.comments.length}
                </span>
              </div>
            </li>
          </a>
        </Link>
      ))}
    </ul>
  );
};

export default PostList;
