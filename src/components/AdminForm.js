import React, { useState, useEffect } from "react";

const AdminForm = (props) => {
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [songs, setSongs] = useState([""]);


  const onFormSubmit = (e) => {
    e.preventDefault();
    if(id !== undefined){
      fetch(`http://localhost:3001/albums/${props.dataToForm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          image,
          songs,
        }),
      }).then(() => {
        props.onSuccess();
        clearFormValues();
      });
    } else {
      fetch("http://localhost:3001/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          image,
          songs,
        }),
      }).then(() => {
        props.onSuccess();
        clearFormValues();
      });
    }
  };

  const clearFormValues = () => {
    setId();
    setTitle("");
    setAuthor("");
    setImage("");
    setSongs([""]);
  };

  const onSongChange = (value, songIndex) => {
    setSongs((songs) =>
      songs.map((song, index) => (index === songIndex ? value : song))
    );
  };

  useEffect(() => {
    if(props.dataToForm.id !== undefined){
      setId(props.dataToForm.id)
      setTitle(props.dataToForm.title);
      setAuthor(props.dataToForm.author);
      setImage(props.dataToForm.image);
      setSongs(props.dataToForm.songs);
    }
  }, [props.dataToForm.author, props.dataToForm.id, props.dataToForm.image, props.dataToForm.songs, props.dataToForm.title])


  const addSong = () => setSongs((songs) => [...songs, ""]);

  return (
    <form className="album-form" onSubmit={onFormSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author"
        value={author}
        required
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="image">Image</label>
      <input
        type="text"
        id="image"
        value={image}
        required
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="button" className="add-song" onClick={addSong}>
        Add song +
      </button>
      {songs.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={`song${index}`}>Song #{index + 1}</label>
            <input
              type="text"
              id={`song${index}`}
              value={item}
              onChange={(e) => onSongChange(e.target.value, index)}
            />
          </React.Fragment>
        );
      })}
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default AdminForm;
