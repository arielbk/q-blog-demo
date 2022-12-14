import type { NextPage } from 'next';
import PostList from '../components/PostList';
import SearchField from '../components/SearchField';
import useComponentLogger from '../hooks/useComponentLogger';
import { SearchProvider, withSearchQuery } from '../hooks/useSearchQuery';
import { getAllPosts } from '../lib/api';
import { Post } from '../types';

interface Props {
  posts: Post[];
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
    revalidate: 30, // ISR countdown in seconds
  };
}

const Posts: NextPage<Props> = ({ posts }) => {
  useComponentLogger('posts page');

  const PostListWithQuery = withSearchQuery(PostList);

  return (
    <SearchProvider>
      <header className="container flex justify-between items-center mb-8">
        <h2 className="text-3xl">All Posts</h2>
        <SearchField />
      </header>
      <main className="container">
        <PostListWithQuery posts={posts} />
      </main>
    </SearchProvider>
  );
};

export default Posts;
