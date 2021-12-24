import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PDF from "../PDF";
import FormInter from "./FormInter";

const Home = () => {
  const [image, setImage] = useState("");
  const [clientName, setClientName] = useState("");
  const [finalclientName, setFinalclientName] = useState("");
  const [numInter, setNumInter] = useState("");
  const [date, setDate] = useState("");
  const [deplacement, setDeplacement] = useState("");
  const [mainDOeuvre, setMainDOeuvre] = useState("");
  const [comment, setComment] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fournitures, setFourniture] = useState(0);
  const [commentHeight, setCommentHeight] = useState(0);
  const [fournituresHeight, setFournitureHeight] = useState("");

  const [postSubmitted, setPostSubmitted] = useState(false);
  const [emergency, setPostEmergency] = useState(false);

  const submitForm = (e) => {
    e.preventDefault();
    setPostSubmitted(true);
  };

  return !postSubmitted ? (
    <FormInter
      setClientName={setClientName}
      setFinalclientName={setFinalclientName}
      setMainDOeuvre={setMainDOeuvre}
      setDate={setDate}
      setDeplacement={setDeplacement}
      setNumInter={setNumInter}
      setComment={setComment}
      setResponsable={setResponsable}
      submitForm={submitForm}
      setImage={setImage}
      image={image}
      setPostEmergency={setPostEmergency}
      setFourniture={setFourniture}
      setCommentHeight={setCommentHeight}
      setFournitureHeight={setFournitureHeight}
    />
  ) : (
    <PDF
      clientName={clientName}
      finalclientName={finalclientName}
      numInter={numInter}
      date={date}
      deplacement={deplacement}
      mainDOeuvre={mainDOeuvre}
      comment={comment}
      responsable={responsable}
      image={image}
      emergency={emergency}
      fournitures={fournitures}
      commentHeight = {commentHeight}
      fournituresHeight = {fournituresHeight}
    />
  );
};
export default Home;
