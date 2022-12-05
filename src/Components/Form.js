import React from "react";

const Form = ({ documentType, genders, patient, setPatient }) => {
  //FUNCION PARA ACTUALIZAR EL ESTADO DE CADA VARIABLE DEL OBJETO "PATIENTS" CO NEL FORMULARIO
  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  let {
    documentid,
    documentnumber,
    firstname,
    secondname,
    firstlastname,
    secondlastname,
    genderId,
  } = patient;

  //FUNCION PARA ACTUALIZAR EL ESTADO DE CADA VARIABLE DEL OBJETO "PATIENTS" CO NEL FORMULARIO
  const handleSubmit = () => {
    documentid = parseInt(documentid, 10);
    genderId = parseInt(genderId, 10);

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
    } else {
      console.log(JSON.stringify(patient));
      alert("funciono");
    }

    //CONSULTA A LA API
    const requestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    };
    fetch("http://localhost:8000/api/patients", requestInit)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="documentid" className="form-label">
          Tipo Documento:
        </label>
        {
          /* <input
          onChange={handleChange}
          name="documentid"
          type="number"
          value={documentid}
          id="documentid"
          className="form-control"
        ></input> */
          <select
            className="form-select"
            name="documentid"
            onChange={handleChange}
          >
            <option value="DEFAULT">Seleccione Tipo de Documento</option>
            {documentType.map((DocType) => (
              <option key={DocType.documentId} value={DocType.documentId}>
                {DocType.description}
              </option>
            ))}
          </select>
        }
      </div>

      <div className="mb-3">
        <label htmlFor="documentnumber" className="form-label">
          Identificación:
        </label>
        <input
          onChange={handleChange}
          name="documentnumber"
          type="text"
          id="documentnumber"
          value={documentnumber}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          Primer Nombre:
        </label>
        <input
          onChange={handleChange}
          name="firstname"
          type="text"
          value={firstname}
          id="firstname"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondname" className="form-label">
          Segundo Nombre:
        </label>
        <input
          onChange={handleChange}
          name="secondname"
          type="text"
          value={secondname}
          id="secondname"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstlastname" className="form-label">
          Primer Apellido:
        </label>
        <input
          onChange={handleChange}
          name="firstlastname"
          type="text"
          value={firstlastname}
          id="firstlastname"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="secondlastname" className="form-label">
          Segundo Apellido:
        </label>
        <input
          onChange={handleChange}
          name="secondlastname"
          type="text"
          value={secondlastname}
          id="secondlastname"
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="genderId" className="form-label">
          Genero:
        </label>
        {
          /* <input
          onChange={handleChange}
          name="genderId"
          type="number"
          value={genderId}
          id="genderId"
          className="form-control"
        ></input> */
          <select
            className="form-select"
            name="genderId"
            onChange={handleChange}
          >
            <option value="DEFAULT">Seleccione Su Genero</option>
            {genders.map((gender) => (
              <option key={gender.genderId} value={gender.genderId}>
                {gender.description}
              </option>
            ))}
          </select>
        }
      </div>

      <button type="submit" className="btn btn-primary center">
        Guardar
      </button>
    </form>
  );
};

export default Form;
