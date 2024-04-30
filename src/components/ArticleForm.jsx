// import React, { useState, useEffect } from "react";
// import { Modal, Form, Button } from "react-bootstrap";

// const ArticleForm = ({ show, onClose, onCreate, onUpdate, editMode, formData }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   useEffect(() => {
//     if (formData) {
//       setTitle(formData.title.rendered);
//       setContent(formData.content.rendered);
//     }
//   }, [formData]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editMode) {
//       onUpdate({ title, content });
//     } else {
//       onCreate({ title, content });
//     }
//   };

//   return (
//     <Modal show={show} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>{editMode ? "Modify" : "Create New"}</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="title">
//             <Form.Label>Title</Form.Label>
//             <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//           </Form.Group>
//           <Form.Group controlId="content">
//             <Form.Label>Content</Form.Label>
//             <Form.Control as="textarea" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
//           </Form.Group>
//           <Button variant="primary" type="submit">
//             {editMode ? "Save" : "Create"}
//           </Button>{" "}
//           <Button variant="secondary" onClick={onClose}>
//             Annulla
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default ArticleForm;

import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ArticleForm = ({ show, onClose, onCreate, onUpdate, editMode, formData }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (formData) {
      setTitle(formData.title.rendered);
      setContent(formData.content.rendered);
    } else {
      setTitle("");
      setContent("");
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      onUpdate({ title: { rendered: title }, content: { rendered: content } });
    } else {
      onCreate({ title: { rendered: title }, content: { rendered: content } });
    }
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editMode ? "Modify" : "Create New"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control as="textarea" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editMode ? "Save" : "Create"}
          </Button>{" "}
          <Button variant="secondary" onClick={onClose}>
            Annulla
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ArticleForm;


