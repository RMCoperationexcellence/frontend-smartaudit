// PostForm.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const PostForm = {
  postScores: async (scores) => {
    const response = await axios.post(`${API_URL}/auditPostForm`, scores); 
    return response.data;
  }
};

export default PostForm;
