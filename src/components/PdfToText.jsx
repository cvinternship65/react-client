import React, { useState} from "react";

const PdfToText = () => {
    const [err, setErr] = useState("");
  const printdata = async() => {
    let data = document.getElementById("resultText").value;
    // data = data.replace(/(\r\n|\n|\r)/gm, "");
    // data = data.replace(/\s/g, "");
    data = data.replace(/^\s+|\s+$/g, '');
    // data = data.join(data.split(' '))
    data = data.replaceAll("/", "");
    data = data.replaceAll('\n', ' ');
    console.log(data);
    try {
        const response = await fetch(
            `http://127.0.0.1:5000//cv-parser/${data}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error! status : ${(response, status)}`);
        }
        const result = await response.json();
        await console.log('fetched')
        await console.log(result);
       extractText.value = result.data;
        
      } catch (err) {
        setErr(err.message);
        console.error(err);
      }
    // extractText.value = data;
  };

  const uploadPdf = async () => {
    const formData = new FormData();
    const pdfData = document.getElementById("inpFile");
    const resultText = document.getElementById("resultText");
    // await console.log(pdfData.files[0]);
    await formData.append("pdfFile", pdfData.files[0]);
    await console.log(formData);

    fetch("https://mongo-cv-api.herokuapp.com/extract-text", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.text();
      })
      .then((extractedText) => {
        resultText.value = extractedText;
      });
  };

  return (
    <div>
      <h1 className="text-center ">PDF To Text</h1>
      <input
        className="form-control"
        type="file"
        id="inpFile"
        accept="application/pdf"
      ></input>
      <input
        className="form-control-btn mt-3 mb-3"
        type="button"
        id="btnUpload"
        value="1.Convert"
        onClick={uploadPdf}
      ></input>
      <br></br>
      <textarea
        className="pdf-result"
        id="resultText"
        placeholder="Wait for result then click 2. "
      ></textarea>
      <input
        className="form-control-btn mt-3 mb-3"
        type="button"
        id="btnUpload"
        value="2.Extract Resume"
        onClick={printdata}
      ></input>
      <textarea
        className="pdf-result"
        id="extractText"
        placeholder="Extract result here..."
      ></textarea>
    </div>
  );
};

export default PdfToText;
