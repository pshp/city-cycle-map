import * as React from "react";
import { Popup } from "react-map-gl";
import StarIcon from "@mui/icons-material/Star";
import "./InfoBox.css";

const InfoBox = () => {
  const [showPopup, setShowPopup] = React.useState(true);

  return (
    <>
      {showPopup && (
        <Popup
          longitude={13.405}
          latitude={52.52}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="title">Home</h4>
            <label>Review</label>
            <p>my home :)</p>
            <label>Rating</label>
            <div>
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
            </div>
            <label>Info</label>
            <span className="username">
              Created by <b>Peter</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      )}
    </>
  );
};

export default InfoBox;
