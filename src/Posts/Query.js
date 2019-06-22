export const postsQuery = {
  posts(parent, {body, isPublished}, {db: { posts }}) {
    if (!body && !isPublished) {
      return posts;
    }

    return posts.filter(post => {
      if (body && isPublished) {
        return post.body.toLowerCase().includes(body.toLowerCase()) && post.isPublished === isPublished;
      }

      if (body) {
        return post.body.toLowerCase().includes(body.toLowerCase());
      }

      if (isPublished) {
        return post.isPublished === isPublished;
      }
    });
  }
}