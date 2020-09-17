import React, {useState} from "react";
import "./AdminPanel.css";
import AdminForm from "./AdminForm";
import useDataHook from "./dataHook";

const AdminPanel = () => {
  const { data, refetchData } = useDataHook();

  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [songs, setSongs] = useState([""]);

  const albumInfo = {
    id: id,
    title: title,
    author: author,
    image: image,
    songs: songs !== undefined ? songs : [""]
  }

  const deleteAlbum = (albumId) => {
    fetch(`http://localhost:3001/albums/${albumId}`, {
      method: "DELETE",
    }).then(() => refetchData());
  };

    const editAlbum = (albumId) => {
      fetch(`http://localhost:3001/albums/${albumId}`)
        .then((album) => album.json())
        .then((info) => {   
          setId(info.id);
          setTitle(info.title);
          setAuthor(info.author);
          setImage(info.image);
          setSongs(info.songs);
        })
    };

  return (
    <div>
      <h1>Admin panel</h1>
      <AdminForm dataToForm={albumInfo} onSuccess={() => refetchData()} />
      <div className="albums-list">
        <div className="album-item">id</div>
        <div className="album-item">title</div>
        <div className="album-item">ACTIONS</div>
        {data.map((album, index) => {
          return (
            <React.Fragment key={index}>
              <div className="album-item">{album.id}</div>
              <div className="album-item">{album.title}</div>
              <div className="album-item">
                <button
                  className="delete-button"
                  onClick={() => deleteAlbum(album.id)}
                >
                  DELETE
                </button>
                <button
                  className="delete-button"
                  onClick={() => {editAlbum(album.id);}}
                >
                  EDIT
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AdminPanel;
