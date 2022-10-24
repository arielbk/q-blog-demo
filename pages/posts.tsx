import type { NextPage } from 'next';
import PostList from '../components/PostList';
import { getAllPosts } from '../lib/api';

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
  return (
    <>
      <header className="container flex justify-between mb-8">
        <h2 className="text-3xl">All Posts</h2>
        <div className="border py-2 px-12">Search bar</div>
      </header>
      <main className="container">
        <PostList posts={posts} />
      </main>
    </>
  );
};

export default Posts;
