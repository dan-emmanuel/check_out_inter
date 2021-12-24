import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./pdf.css";

const ref = React.createRef();

let  divide = (txt,row) => {
    let  text = txt?txt.split("\n"):[];
    text = [...text,...Array(row-text.length).fill(" ")]
    return <>{text.map((element, index) => <p className="mt-0 mb-0" key={index}>{element}</p>)}</>
}
const PDF = (props) => {
    let {
        clientName,
        finalclientName,
        numInter,
        date,
        deplacement,
        mainDOeuvre,
        comment,
        responsable,
        image,
        emergency,
        fournitures,
        commentHeight,
        fournituresHeight
    } = props;
    let toPdf = () => {

        const quality = 2; // Higher the better but larger file
        document.getElementById("img").style.display = "none"

        html2canvas(document.querySelector("#mainPdfBody"), {
            scale: quality,
            allowTaint: true,
        }).then((canvas) => {
            document.getElementById("img").style.display = "block"

            const pdf = new jsPDF("p", "mm", [210, 297]);
            pdf.addImage(canvas.toDataURL("image/png"), "JPG", 0, 0, 210, 297);
            pdf.addImage(image, 'JPG', 140, 205, 50, 40, "NONE", "NONE");

            let dateDateFormat = new Date(date);
            let dateString = `${dateDateFormat.getDate()}-${dateDateFormat.getMonth()}-${dateDateFormat.getFullYear()}`;
            pdf.save(`${clientName}_${finalclientName}_${dateString}.pdf`);

        });
      
    };
    return (
        <>
            <div className="row justify-content-center">
                <div className="" id="mainPdfBody" ref={ref}>
                    <div className="container">
                        <div className="row align-items-center justify-content-between ">
                            <div className="col-3">
                                <img
                                    alt="logo"
                                    style={{ width: "20mm" }}
                                    src={`${process.env.PUBLIC_URL}/rdsLogo.jpg`}
                                />
                                <p className="fs-5 text">Rapide Dépannage Service</p>
                            </div>

                            <div className="col-3">
                                <h5 className="text-center mb-2">Rapport d'intervention</h5>
                            </div>
                            <div className="col-3">
                                {emergency ? (
                                    <img
                                        alt="logo"
                                        style={{ width: "20mm" }}
                                        src={`${process.env.PUBLIC_URL}/emergency.jpg`}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1">
                            <div className="col-6 ">
                                <div className="form-floating">
                                    <input
                                        readOnly
                                        value={clientName}
                                        type="text"
                                        className="form-control"
                                    />

                                    <label>Nom du client</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        readOnly
                                        value={date}
                                        type="date"
                                        className="form-control form-control-sm "
                                    />
                                    <label>Date</label>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1">
                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        value={numInter}
                                        readOnly
                                        type="text"
                                        className="form-control "
                                    />
                                    <label>Reference</label>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="form-floating">
                                    <input
                                        readOnly
                                        value={finalclientName}
                                        type="text"
                                        className="form-control form-control-sm "
                                    />
                                    <label>Client final</label>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1 ">
                            <div className="col-6 ">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        readOnly
                                        value={deplacement}
                                        className="form-control form-control-sm"
                                    />
                                    <label>Deplacement</label>
                                </div>
                            </div>

                            <div className="col-6 ">
                                <div className="form-floating ">
                                    <input
                                        readOnly
                                        value={mainDOeuvre}
                                        type="number"
                                        className="form-control form-control-sm"
                                    />
                                    <label>Main d'oeuvre (h)</label>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1">
                            <div className="col-12">
                                <div className="form-floating" style={{height:commentHeight}}>
                                 
                                    <div className="form form-control h-100" style={{ backgroundColor: "#e9ecef" }}>
                                        {divide(comment,10)}
                                    </div>
                                    <label>commentaires</label>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1">
                            <div className="col-12">
                                <div className="form-floating" style={{height:fournituresHeight}}>
                                    <div className="form form-control h-100" style={{ backgroundColor: "#e9ecef" }}>
                                        {divide(fournitures,4)}
                                    </div>
                                    <label>fournitures</label>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-between mb-1 ">
                            <div className="col-4">
                                <div className="form-floating mb-3">
                                    <input
                                        readOnly
                                        value={responsable}
                                        type="text"
                                        className="form-control form-control-sm mb-1"
                                    />
                                    <label>Signataire</label>
                                </div>
                            </div>
                            <div className="col-4" id="img">
                                <div className="webcam-container d-flex flex-column align-items-center">
                                    <img alt="tampon" style={{ width: "100%" }} src={image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" style={{ position: "absolute", top: "250mm" }}>
                    <button className="btn btn-primary" onClick={toPdf}>
                        Edit Pdf
                    </button>
                </div>
            </div>
        </>
    );
};

export default PDF;
