import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MyNavbar from "../src/components/MyNavbar";
import ArticleForm from "./components/ArticleForm";
import AddArticle from "./components/AddArticle";
import ArticleList from "./components/ArticleList";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost/progetto_settimanale/wp-json/wp/v2/posts?_embed")
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error("Errore durante il recupero dei post:", error));
  };

  const handleCreate = (formData) => {
    fetch("http://localhost/progetto_settimanale/wp-json/wp/v2/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("marco:qaJd Os5d SIim P5Bk Azgq WUOt")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        status: "publish",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante la creazione del post");
        }
        fetchPosts();
        setShowCreateForm(false);
      })
      .catch((error) => {
        console.error("Errore durante la creazione del post:", error);
      });
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setShowCreateForm(true);
    setEditMode(true);
  };

  const handleUpdate = (formData) => {
    fetch(`http://localhost/progetto_settimanale/wp-json/wp/v2/posts/${selectedPost.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("marco:qaJd Os5d SIim P5Bk Azgq WUOt")}`,
      },
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'aggiornamento del post");
        }
        fetchPosts();
        setShowCreateForm(false);
        setEditMode(false);
        setSelectedPost(null);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };

  const handleDelete = (postId) => {
    fetch(`http://localhost/progetto_settimanale/wp-json/wp/v2/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa("marco:qaJd Os5d SIim P5Bk Azgq WUOt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore durante l'eliminazione del post");
        }
        fetchPosts();
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
      });
  };

  return (
    <Container className="py-4">
      <AddArticle onOpenCreateForm={() => setShowCreateForm(true)} />
      <ArticleList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      <ArticleForm
        show={showCreateForm}
        onClose={() => {
          setShowCreateForm(false);
          setSelectedPost(null);
          setEditMode(false);
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        editMode={editMode}
        formData={selectedPost}
      />
    </Container>
  );
};

export default App;

// qaJd Os5d SIim P5Bk Azgq WUOt
