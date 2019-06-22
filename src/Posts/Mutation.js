import uuidv4 from 'uuid/v4';

export const postsMutation = {
  createPost(parent, args, {db: { users, posts }, pubSub }) {
    const { authorId} = args.data;
    if (!users.some(user => user.id === authorId)) {
      throw new Error('User not found');
    }
    const newPost = {
      id: uuidv4(),
      ...args.data
    }
    posts.push(newPost);
    if (newPost.isPublished) {
      pubSub.publish('post', {
        post: {
          mutation: 'CREATED',
          data: newPost,
        }
      });
    }
    return newPost;
  },
  deletePost(parent, args, {db, pubSub}) {
    const { postId } = args;
    const { posts, comments } = db;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPost = posts.splice(postIndex, 1)[0];
    db.comments = comments.filter(comment => comment.postId !== postId);
    if (deletedPost.isPublished) {
      pubSub.publish('post', {
        post: {
          mutation: 'DELETED',
          data: deletedPost,
        }
      })
    }
    return deletedPost;
  },
  updatePost(parent, args, {db: { posts }}, info) {
    const { postId, data } = args;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const post = posts[postIndex];
    const updatedPost = {
      ...post,
      ...data
    }
    posts[postIndex] = updatedPost;
    return updatedPost;
  },
}