import axios from 'axios';

const fetchData = async (storedUserId, messageId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/Messages/${storedUserId}/${messageId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchData;
