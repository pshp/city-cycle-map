import React, { useContext } from "react";
import { Popup } from "react-map-gl";
import "./Pin.css";
import CloseIcon from "@mui/icons-material/Close";
import { MyContext } from "../context";

const EditInfoBox = ({ lat, lng }) => {
  const {
    handleClickClose,
    handleSubmit,
    editPlace,
    handleDescChange,
    handleTitleChange,
    desc,
    title,
  } = useContext(MyContext);

  return (
    <>
      <Popup
        longitude={lng}
        latitude={lat}
        anchor="left"
        closeOnClick={false}
        closeButton={false}
        offset={[9, -8]}
      >
        <form className="submit-card" onSubmit={(e) => handleSubmit(e)}>
          {/* <div>
            <Room style={{ color: "violet", fontSize: 20 }} />
            <Room style={{ color: "indigo", fontSize: 20 }} />
            <Room style={{ color: "blue", fontSize: 20 }} />
            <Room style={{ color: "gold", fontSize: 20 }} />
            <Room style={{ color: "orange", fontSize: 20 }} />
            <Room style={{ color: "tomato", fontSize: 20 }} />
          </div> */}
          <CloseIcon
            className="icon-buttons icon-button close-button"
            onClick={() => {
              handleClickClose();
            }}
          />
          <label>Title</label>
          <input
            name="title"
            placeholder="Enter a title"
            value={title}
            autoFocus
            onChange={(e) => handleTitleChange(e.target.value)}
          />
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Say us something about this place."
            value={desc}
            onChange={(e) => handleDescChange(e.target.value)}
          />
          <button type="submit" className="submitButton">
            {editPlace && "Save Changes"}
            {!editPlace && "Add Pin"}
          </button>
        </form>
      </Popup>
    </>
  );
};

export default EditInfoBox;
