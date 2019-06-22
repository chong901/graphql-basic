const users = [
  createUser('1', 'chong', 'chong@test.com', 25),
  createUser('2', 'anita', 'anita@test.com', 24),
  createUser('3', 'chong 2', 'chong2@test.com', 26),
]

const posts = [
  {id: '1', title: 'first title', body: 'first body', isPublished: true, authorId: '1'},
  {id: '2', title: 'second title', body: 'second body', isPublished: false, authorId: '1'},
  {id: '3', title: 'third title', body: 'third body', isPublished: true, authorId: '2'},
]

const comments = [
  {
    id: '1',
    text: 'first comment',
    authorId: '2',
    postId: '1',
  },
  {
    id: '2',
    text: 'second comment',
    authorId: '2',
    postId: '1',
  },
  {
    id: '3',
    text: '3rd comment',
    authorId: '3',
    postId: '2',
  },
  {
    id: '4',
    text: '4th comment',
    authorId: '1',
    postId: '3',
  },
]

function createUser(id, name, email, age) {
  return {id, name, age, email}
}

export const db = {
  users,
  posts,
  comments
}

