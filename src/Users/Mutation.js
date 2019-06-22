import uuidv4 from 'uuid/v4';

export const usersMutation = {
  createUser(parent, args, {db: { users }}) {
    const { name, email, age } = args.data;
    if (users.some(user => user.email.toLowerCase() === email)) {
      throw new Error('email is existing');
    }
    const newUser = createUser(uuidv4(), name, email, age);
    users.push(newUser)
    return newUser;
  },
  deleteUser(parent, args, {db}) {
    const { userId } = args;
    const { users, posts, comments } = db;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    db.posts = posts.filter(post => {
      const usersPost = post.authorId === userId
      if (usersPost) {
        db.comments = comments.filter(comment => comment.postId !== post.id);
      }
      return !usersPost;
    });
    db.comments = comments.filter(comment => comment.authorId !== userId);
    return deletedUser;
  },
  updateUser(parent, args, {db: {users}}, info) {
    const {userId, data} = args;
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    checkEmail(data.email, users);

    const user = users[userIndex];
    const updatedUser = {
      ...user,
      ...data
    }
    users[userIndex] = updatedUser;
    return updatedUser;
  }
}

function checkEmail(email, users) {
  if (!email) {
    return;
  }
  if (users.some(user => user.email === email)) {
    throw new Error('Email is existing');
  }
}