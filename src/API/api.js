export const getData = async (username) => {
  const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
    method: "GET",
  });

  const data = await response.json();

  console.log(data);
  return data;
};

getData();
