import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import PatientList from "./Components/PatientList";
import Form from "./Components/Form";

function App() {
  //HOOCKS PARA LA OBTENCION DE TODOS LOS PACIENTES
  const [patients, setPatients] = useState([]);
  const [changeStatus, setChangeStatus] = useState(false);

  useEffect(() => {
    const getPatients = () => {
      fetch("http://localhost:8000/api/patients")
        .then((res) => res.json())
        .then((res) => setPatients(res));
    };
    getPatients();
    setChangeStatus(false);
  }, [changeStatus]);

  //HOOCKS PARA LA OBTENCION DE LOS TIPOS DE DOCUMENTO
  const [documentType, setDocumentTypes] = useState([]);
  useEffect(() => {
    const getDocumentsType = () => {
      fetch("http://localhost:8000/api/documentType")
        .then((res) => res.json())
        .then((res) => setDocumentTypes(res));
    };
    getDocumentsType();
  }, []);

  //HOOCKS PARA LA OBTENCION DE LOS GENEROS
  const [genders, setGenders] = useState([]);
  useEffect(() => {
    const getGenders = () => {
      fetch("http://localhost:8000/api/genders")
        .then((res) => res.json())
        .then((res) => setGenders(res));
    };
    getGenders();
  }, []);

  //HOOCKS PARA LA CREACION DE TODOS LOS PACIENTES
  const [patient, setPatient] = useState({
    documentid: 0,
    documentnumber: "",
    firstname: "",
    secondname: "",
    firstlastname: "",
    secondlastname: "",
    genderId: 0,
  });

  return (
    <Fragment>
      <Navbar brand="Mentalitat" />

      <div className="container">
        <div className="row">
          <div className="col-4">
            <h2 style={{ textAlign: "center" }}>Fromulario de Pacientes</h2>
            <Form
              documentType={documentType}
              genders={genders}
              patient={patient}
              setPatient={setPatient}
            />
          </div>
          <div className="col-8">
            <h2 style={{ textAlign: "center " }}>Lista de Pacientes</h2>
            <PatientList
              patients={patients}
              patient={patient}
              setPatient={setPatient}
              setChangeStatus={setChangeStatus}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
