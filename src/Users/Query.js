export const usersQuery = {
  users(parent, {query}, {db: { users }}) {
    if (!query) return users;
    return users.filter(user => user.name.includes(query));
  }
}