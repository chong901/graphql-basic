export const User = {
  posts(parent, args, {db: { posts }}) {
    return posts.filter(post => post.authorId === parent.id);
  },
  comments(parent, args, {db: { comments }}) {
    return comments.filter(comment => comment.authorId === parent.id)
  }
}