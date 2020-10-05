export const threadBlocker = (userCount: number): number => {
  const users = [];

  const userDetails = {
    id: 1,
    dateJoined: 0,
  };

  for (let i = 0; i < userCount; i++) {
    userDetails.id = i++;
    userDetails.dateJoined = Date.now();
    users.push(userDetails);
  }
  return users.length;
};
