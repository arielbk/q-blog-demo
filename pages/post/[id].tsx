import { GetStaticPaths, NextPage } from 'next';
import { getAllPosts, getPostById } from '../../lib/api';
import { Post } from '../../types';

interface Props {
  post: Post;
}

// get paths of all posts to statically generate
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
  return {
    paths,
    fallback: 'blocking', // generate static page on the fly if necessary
  };
};

// get props for a specific post
export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;
  const post = await getPostById(Number(id));
  const notFound = !post;

  return {
    props: {
      post,
    },
    revalidate: 30, // ISR countdown in seconds
    notFound,
  };
}

const Post: NextPage<Props> = ({ post }) => {
  return (
    <>
      <header className="container flex flex-col gap-4 mb-12">
        <h2 data-testid="post-title" className="text-3xl capitalize">
          {post.title}
        </h2>
        <h3 data-testid="post-author">by {post.user.name}</h3>
      </header>
      <main data-testid="post-body" className="container capitalize mb-12">
        {post.body}
      </main>
      <section className="container">
        <h4 className="font-medium mb-8">Comments</h4>
        {post.comments.map((comment) => (
          <article
            key={comment.id}
            data-testid="post-comment"
            className="flex flex-col gap-2 border px-4 py-2 mb-4 rounded-md"
          >
            <div data-testid="post-commentauthor" className="italic">
              {comment.email} says:
            </div>
            <div data-testid="post-commentname" className="font-bold">
              {comment.name}
            </div>
            <div data-testid="post-commentbody">{comment.body}</div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Post;
