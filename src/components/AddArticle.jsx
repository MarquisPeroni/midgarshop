import React from "react";
import { Button } from "react-bootstrap";

const AddArticle = ({ onOpenCreateForm }) => {
  return (
    <div className="mb-4">
      <h1 className="text-center mb-4">Articles</h1>
      <Button variant="primary" onClick={onOpenCreateForm}>
        Create new Article
      </Button>
    </div>
  );
};

export default AddArticle;