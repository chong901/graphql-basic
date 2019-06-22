export const commentsQuery = {
  comments(parent, args, {db: { comments }}) {
    return comments;
  }
}