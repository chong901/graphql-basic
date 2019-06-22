export const Post = {
  author(parent, args, {db: { users }}, info) {
    return users.find(({id}) => id === parent.authorId);
  },
  comments(parent, args, {db: { comments }}) {
    return comments.filter(comment => comment.postId === parent.id);
  }
}