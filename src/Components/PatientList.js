import React from "react";

const PatientList = ({ patients, patient, setPatient, setChangeStatus }) => {
  const handleDelete = (id) => {
    const requestInit = {
      method: "DELETE",
    };

    fetch("http://localhost:8000/api/patients/" + id, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setChangeStatus(true);
  };

  let { documentid, documentnumber, firstname, firstlastname, genderId } =
    patient;

  const handleUpdate = (id) => {
    //VALIDACIONES DEL FORMULARIOS

    if (
      documentid <= 0 ||
      documentnumber === "" ||
      firstname === "" ||
      firstlastname === "" ||
      genderId <= 0
    ) {
      alert("Existen campos sin completar");
      return;
    }

    const requestInit = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    };

    fetch("http://localhost:8000/api/patients/" + id, requestInit)
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setChangeStatus(true);

    //REINICIO DEL ESTADO DEL FORMULARIO
    setPatient({
      documentid: 0,
      documentnumber: "",
      firstname: "",
      secondname: "",
      firstlastname: "",
      secondlastname: "",
      genderId: 0,
    });
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo de Documento</th>
          <th>Identificación</th>
          <th>Nombre Completo</th>
          <th>Genero</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id}>
            <td>{patient.id}</td>
            <td>{patient.DOCUMENT_TYPE}</td>
            <td>{patient.documentnumber}</td>
            <td>
              {patient.firstname +
                " " +
                patient.secondname +
                " " +
                patient.firstlastname +
                " " +
                patient.secondlastname}
            </td>
            <td>{patient.GENDER}</td>
            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </td>

            <td>
              <div className="mb-3">
                <button
                  onClick={() => handleUpdate(patient.id)}
                  className="btn btn-warning"
                >
                  Editar
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientList;
