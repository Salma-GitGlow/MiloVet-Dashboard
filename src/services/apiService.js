export const fetchCount = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.results || 0;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return 0;
  }
};

