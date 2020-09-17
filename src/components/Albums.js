import React, {useState} from "react";
import "./Albums.css";
import useDataHook from "./dataHook";

const defaultImage =
  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

const views = {
  ALBUMS: "ALBUMS",
  ALBUM: "ALBUM",
};


const Albums = () => {
  const { data } = useDataHook();
  const [view, setView] = useState(views.ALBUMS);
  const [albumId, setAlbumId] = useState();

  return (
      <div>
        <h1>{view === views.ALBUMS ? "Albums" : "Album"}</h1>
        <div className="albums">
          {view === views.ALBUMS && data.map((item) => {
            return (
              <div className="album" key={item.id}>
                <div onClick={() => {setView(views.ALBUM); setAlbumId(item.id)}}>
                  <div className="image-container">
                    <img src={item.image || defaultImage} alt="Album cover" />
                  </div>
                  <div className="album-info">
                    <h2>{item.title}</h2>
                    <h3>{item.author}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          {view === views.ALBUM && data.map((item, index) => {
            if(item.id === albumId){
              return (
                <div key={index} className="single-album">
                  <img src={item.image || defaultImage} alt="Album cover" />
                  <span className="item">Title: </span>
                  <span className="item">{item.title}</span>
                  <span className="item">Author: </span>
                  <span className="item">{item.author}</span>
                  <span className="item">Songs: </span>
                  <span className="item">{item.songs !== undefined ? item.songs.map((song, index) => {
                      return (
                        <p key={index}>{song}</p>
                      )
                    }) : ""}</span>
                  <button onClick={() => setView(views.ALBUMS)}>BACK</button>
                </div>
              );
            }
            return false;
          })}
        </div>
      </div>
  );
};

export default Albums;
