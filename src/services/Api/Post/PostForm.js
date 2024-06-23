// PostForm.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PostForm = {
  postScores: async (scores) => {
    const response = await axios.post(`${API_URL}/auditPostForm`, scores); 
    return response.data;
  }
};

const PostUpdate = async (scores) => {
  try {
    const response = await axios.post(`${API_URL}/auditPostForm/update`, scores); // Adjust the endpoint if necessary
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to update data.");
  }
};

export { PostForm, PostUpdate };
