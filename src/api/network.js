import axios from 'axios';

const config = {
  baseURL: '',
  token: '',
};

export const getData = async () => {
  try {
    const response = await axios.get(`${config.baseURL}`, {
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });
    const data = response.data;
    const status = response.status;
    return {success: true, data: data, status: status};
  } catch (error) {
    console.log(error);
    return {success: false, data: error};
  }
};
