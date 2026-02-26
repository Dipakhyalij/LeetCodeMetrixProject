export const getData = async (username) => {
  const response = await fetch(
    `https://leetcode-api-faisalshohag.vercel.app/${username}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
};