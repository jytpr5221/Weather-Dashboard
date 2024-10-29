import React from "react";
import "./favorite.css";
import Favcity from "../favcity/favcity";

function Favorite({ favs, removeFavCity }) {
    return (
        <div className="main">
            <h1
                style={{
                    color: "antiquewhite",
                    borderBottom: "2px solid rgb(225, 215, 181)",
                }}
            >
                Your Favorite
            </h1>
            {favs.length > 0 ? (
                favs.map((fav) => (
                    <Favcity key={fav.id} fav={fav} removeFavCity={removeFavCity} />
                ))
            ) : (
                <div style={{ color: "white" }}>Add Your Favorite City</div>
            )}
        </div>
    );
}

export default Favorite;
