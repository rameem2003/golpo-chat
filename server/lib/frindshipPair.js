const getPair = (id1, id2) => {
  const [user1, user2] = [id1.toString(), id2.toString()].sort();

  return {
    user1,
    user2,
  };
};

module.exports = getPair;
