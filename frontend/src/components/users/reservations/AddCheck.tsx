import { useState } from "react";
import Modal from "../../../ui/Modal";
import SearchPatient from "./SearchPatient";
import AddPatient from "./AddPatient";

function AddCheck() {
  const [patientIsFound, setPatientIsFound] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  function onCloseModal() {
    throw new Error("Function not implemented.");
  }
  return (
    <div className="text-center">
      <Modal>
        <Modal.Open opens="new-check">
          <button className="bg-primary text-white py-3 px-4 text-sm rounded-md cursor-pointer hover:bg-primary-dark duration-150">
            New Check
          </button>
        </Modal.Open>
        <Modal.Window name="new-check">
          {patientIsFound ? (
            <p>Patient found</p>
          ) : patientIsFound === false ? (
            <AddPatient
              onCloseModal={onCloseModal}
              setPatientIsFound={setPatientIsFound}
              phoneNumber={phoneNumber}
            />
          ) : (
            <SearchPatient
              setPatientIsFound={setPatientIsFound}
              onCloseModal={onCloseModal}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          )}
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCheck;
