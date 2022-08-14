const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.enteries(newUsers).flat();
  return { id, ...user };
};

export default getMatchedUserInfo;