import uuidv4 from 'uuid/v4';

export const commentsMutation = {
  createComment(parent, args, {db: { users, posts, comments }, pubSub }) {
    const { authorId, postId } = args.data;
    const errors = [];
    if (!users.some(user => user.id === authorId)) {
      errors.push('User not found');
    }

    if (!posts.some(post => post.id === postId && post.isPublished)) {
      errors.push('Post not found');
    }

    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const newComment = {
      id: uuidv4(),
      ...args.data,
    };
    comments.push(newComment);
    pubSub.publish(`comment postId-${postId}`, { comment: newComment });
    return newComment;
  },
  deleteComment(parent, args, {db: { comments }}) {
    const { commentId } = args;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    return comments.splice(commentIndex, 1)[0];
  },
  updateComment(parent, args, {db: {comments}}, info) {
    const { commentId, data } = args;
    const commentIndex = comments.findIndex(comment => comment.id === commentId);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const comment = comments[commentIndex];
    const updatedComment = {
      ...comment,
      ...data
    }
    comments[commentIndex] = updatedComment;
    return updatedComment;
  
  },
}