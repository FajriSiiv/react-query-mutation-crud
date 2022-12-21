import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getPostsId, updatePosts } from "../../api/blogApi";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: posts,
    isError,
    error,
  } = useQuery(["posts", id], () => getPostsId(id));

  const updatePostsMutation = useMutation(updatePosts, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const handleUpdate = () => {
    updatePostsMutation.mutate({
      ...posts,
      title: title,
      body: body,
    });

    setTitle("");
    setBody("");

    navigate("/");
  };

  useEffect(() => {
    if (posts) {
      setTitle(posts.title);
      setBody(posts.body);
    }
  }, [posts]);

  return (
    <div>
      {posts && (
        <form
          onSubmit={handleUpdate}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label htmlFor="">{posts.title}</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="">{posts.body}</label>

          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      )}
    </div>
  );
};

export default EditBlog;
