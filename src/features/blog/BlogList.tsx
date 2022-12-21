import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  getPosts,
  addPosts,
  deletePosts,
  updatePosts,
} from "../../api/blogApi";

const BlogLists = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    data: posts,
    isError,
    error,
  } = useQuery("posts", getPosts, {
    select: (data) => data.sort((a: any, b: any) => b.id - a.id),
  });

  const addPostsMutation = useMutation(addPosts, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  // const updatePostsMutation = useMutation(updatePosts, {
  //   onSuccess: () => {
  //     // Invalidate cache and refetch
  //     queryClient.invalidateQueries("posts");
  //   },
  // });

  const deletePostsMutation = useMutation(deletePosts, {
    onSuccess: () => {
      // Invalidate cache and refetch
      queryClient.invalidateQueries("posts");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPostsMutation.mutate({ userId: 1, title: title, body: body });
    setBody("");
    setTitle("");
  };

  let content;
  if (isLoading) {
    content = <p>loading...</p>;
  } else if (isError) {
    content = <p>Error...</p>;
  } else {
    content = posts.map((post: any) => (
      <article key={post.id}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Post : {post.title}</label>
          <label>Body : {post.body}</label>
          <button onClick={() => deletePostsMutation.mutate({ id: post.id })}>
            Delete
          </button>
          <button onClick={() => navigate(`/posts/${post.id}`)}>Edit</button>
          {/* <button onClick={() => history.go(`/posts/${post.id}`)}>Edit</button> */}
        </div>
      </article>
    ));
  }
  return (
    <div>
      <h1>BlogLists</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter new todo item</label>
        <div className="new-todo">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="new-todo">
          <label htmlFor="">body</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {content}
    </div>
  );
};

export default BlogLists;
