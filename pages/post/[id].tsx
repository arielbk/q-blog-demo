import { NextPage } from 'next';
import { getAllPosts, getPostById } from '../../lib/api';
import { Post } from '../../types';

interface Props {
  post: Post;
}

// get paths of all posts to statically generate
export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

// get props for a specific post
export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(Number(id));
  return {
    props: {
      post,
    },
  };
}

const Post: NextPage<Props> = ({ post }) => {
  return (
    <>
      <header className="container flex flex-col gap-4 mb-12">
        <h2 className="text-3xl capitalize">{post.title}</h2>
        <h3>by {post.user.name}</h3>
      </header>
      <main className="container capitalize mb-12">{post.body}</main>
      <section className="container">
        <h4 className="font-medium mb-8">Comments</h4>
        {post.comments.map((comment) => (
          <article
            key={comment.id}
            className="flex flex-col gap-2 border px-4 py-2 mb-4 rounded-md"
          >
            <div className="italic">{comment.email} says:</div>
            <div className="font-bold">{comment.name}</div>
            <div>{comment.body}</div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Post;
