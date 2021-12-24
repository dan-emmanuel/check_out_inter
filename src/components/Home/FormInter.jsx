import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Webcam from "react-webcam";
import "../pdf.css";

const FormInter = (props) => {
  const videoConstraints = {
    width: 2000,
    height: 2000,

    facingMode: { exact: "environment" },
    screenshotQuality: 1,
    screenshotFormat: "image/jpeg",
    mirrored: true,
  };
  let {
    setFourniture,
    setClientName,
    setFinalclientName,
    setMainDOeuvre,
    setDate,
    setDeplacement,
    setNumInter,
    setComment,
    setResponsable,
    submitForm,
    setImage,
    setPostEmergency,
    image,
    setCommentHeight,
    setFournitureHeight,
  } = props;
  const refcom = useRef();
  const reffourniture = useRef();
  const capture = React.useCallback(() => {
    setCommentHeight(document.getElementById("commTextAres").offsetHeight);
    setFournitureHeight(document.getElementById("fournTextAres").offsetHeight);
    const imageSrc = webcamRef.current.getScreenshot({
      screenshotQuality: 1,
      screenshotFormat: "image/jpeg",
    });
    setImage(imageSrc);
  });

  const webcamRef = React.useRef(null);

  return (
    <div className="row justify-content-center">
      <div className="" id="mainPdfBody">
        <div className="container">
          <div
            style={{ width: "100vw" }}
            className="row align-items-center justify-content-between"
          >
            <div className="col">
              <img
                alt="logo"
                style={{ width: "20mm" }}
                src={`${process.env.PUBLIC_URL}/rdsLogo.jpg`}
              />
              <p className="fs-6">Rapide Dépannage Service</p>
            </div>
            <div className="col">
              <h3 className="text-center mb-2">Rapport d intervention</h3>
            </div>
            <div className="col row justify-content-end">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  onChange={setPostEmergency}
                />
                <label className="form-check-label ps-3 text">URGENCE</label>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mb-1">
            <div className="col-6">
              <div className="form-floating  mb-3">
                <input
                  list="clientsListe"
                  className="form-control "
                  type="text"
                  onChange={(e) => setClientName(e.target.value)}
                />
                <datalist id="clientsListe">
                  <option value="PHINELEC">PHINELEC</option>
                  <option value="EMALEC">EMALEC</option>
                  <option value="EGEO MAINTENANCE">EGEO MAINTENANCE</option>
                  <option value="MAINTENET">MAINTENET</option>
                  <option value="ABN STANDING">ABN STANDING</option>
                  <option value="ARTISANS DES RESEAUX">
                    ARTISANS DES RESEAUX
                  </option>
                  <option value="MASTORE">MASTORE</option>
                  <option value="MINI MOOV">MINI MOOV</option>
                  <option value="PATRIARCA">PATRIARCA</option>
                  <option value="SCI DREYFUSS">SCI DREYFUSS</option>
                </datalist>
                <label>Nom du client</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  onChange={(e) => setNumInter(e.target.value)}
                  className="form-control mb-1"
                />
                <label>Reference</label>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mb-1">
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="form-control "
                  defaultValue={`${new Date().getYear()}-${new Date().getMonth()}-${new Date().getDay()}`}
                />
                <label>Date</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  onChange={(e) => setFinalclientName(e.target.value)}
                  className="form-control "
                />
                <label>Client final</label>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mb-1">
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  onChange={(e) => setDeplacement(e.target.value)}
                  className="form-control mb-1"
                />
                <label>Deplacement</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="number"
                  onChange={(e) => setMainDOeuvre(e.target.value)}
                  className="form-control mb-1"
                />
                <label>Main d'oeuvre (h)</label>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mb-1">
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  rows="10"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  className="form-control h-100"
                  placeholder="Leave a comment here"
                  id="commTextAres"
                />
                <label>commentaires</label>
              </div>
            </div>
          </div>
          <div className="row justify-content-between mb-1">
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  rows="6"
                  onChange={(e) => setFourniture(e.target.value)}
                  className="form-control h-100"
                  id="fournTextAres"
                />
                <label>fournitures</label>
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between mt-4 ">
              <div className="col-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    onChange={(e) => setResponsable(e.target.value)}
                    className="form-control mb-1"
                  />
                  <label>Signataire</label>
                </div>
              </div>

              <div className="col-4 ">
                <div className="webcam-container d-flex flex-column align-items-center">
                  <div className="webcam-img">
                    {image === "" ? (
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={"100%"}
                        videoConstraints={videoConstraints}
                        forceScreenshotSourceSize
                      />
                    ) : (
                      <img
                        style={{ width: "100%" }}
                        alt="tampon de l'entreprise"
                        src={image}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-around mt-2">
            <button
              className="btn btn-success col-5"
              type="submit"
              onClick={(e) => submitForm(e)}
            >
              Submit
            </button>
            {image !== "" ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setImage("");
                }}
                className="btn btn-primary col-5"
              >
                Retake Image
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();

                  capture();
                }}
                className="btn btn-primary col-5"
              >
                Capture
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormInter;
