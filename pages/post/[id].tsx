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
        <h3 data-testid="post-author" className="italic">
          by {post.user.name}
        </h3>
      </header>
      <main data-testid="post-body" className="container mb-16 text-lg">
        <div className="max-w-[85ch] leading-8">{post.body}</div>
      </main>
      <div className="container">
        <section className="bg-gray-100 rounded-lg p-8 mb-8 lg:w-1/2">
          <h4 className="mb-8 text-xl text-gray-500">Comments</h4>
          {post.comments.map((comment) => (
            <article
              key={comment.id}
              data-testid="post-comment"
              className="flex flex-col gap-2 p-4 mb-4 rounded-lg bg-white"
            >
              <div data-testid="post-commentauthor" className="italic">
                {comment.email}:
              </div>
              <div data-testid="post-commentname" className="font-bold">
                {comment.name}
              </div>
              <div data-testid="post-commentbody">{comment.body}</div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default Post;
