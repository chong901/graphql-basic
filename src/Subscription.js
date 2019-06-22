export const Subscription = {
  comment: {
    subscribe(parent, { postId }, { pubSub, db: { posts } }, info) {
      const post = posts.find(post => post.id === postId && post.isPublished);

      if (!post) {
        throw new Error('Post not found');
      }

      return pubSub.asyncIterator(`comment postId-${postId}`)
    }
  },
  post: {
    subscribe(parent, args, { pubSub }, info) {
      return pubSub.asyncIterator('post');
    }
  }
}