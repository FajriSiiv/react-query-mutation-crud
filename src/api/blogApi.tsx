import axios from "axios";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const postsApi = axios.create({
  baseURL: "http://localhost:3500",
});

export const getPosts = async () => {
  try {
    const response = await postsApi.get("/posts");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsId = async (id: any) => {
  try {
    const response = await postsApi.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addPosts = async (post: any) => {
  return await postsApi.post("/posts", post);
};

export const updatePosts = async (post: any) => {
  return await postsApi.patch(`/posts/${post.id}`, post);
};

export const deletePosts = async ({ id }: { id: any }) => {
  return await postsApi.delete(`/posts/${id}`, id);
};

export default postsApi;
