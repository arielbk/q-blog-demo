import type { NextPage } from 'next';
import PostList from '../components/PostList';
import SearchField from '../components/SearchField';
import useComponentLogger from '../hooks/useComponentLogger';
import { SearchProvider } from '../hooks/useSearchQuery';
import { getAllPosts } from '../lib/api';
import { Post } from '../types';

interface Props {
  posts: Post[];
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: { posts },
  };
}

const Posts: NextPage<Props> = ({ posts }) => {
  useComponentLogger('posts page');
  return (
    <SearchProvider>
      <header className="container flex justify-between items-center mb-8">
        <h2 className="text-3xl">All Posts</h2>
        <SearchField />
      </header>
      <main className="container">
        <PostList posts={posts} />
      </main>
    </SearchProvider>
  );
};

export default Posts;
