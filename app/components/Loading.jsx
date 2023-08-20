import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border loader" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="modal-backdrop best_zind"></div>
    </div>
  );
};

export default Loader;
