import { useState } from "react";
import Modal from "../../ui/Modal";
import SearchPatient from "./SearchPatient";
import AddPatient from "./AddPatient";
import Reservation from "./NewReservation";

function AddCheck() {
  const [patientIsFound, setPatientIsFound] = useState<boolean | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");

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
            <Reservation
              phoneNumber={phoneNumber}
              setPatientIsFound={setPatientIsFound}
            />
          ) : patientIsFound === false ? (
            <AddPatient
              setPatientIsFound={setPatientIsFound}
              phoneNumber={phoneNumber}
            />
          ) : (
            <SearchPatient
              setPatientIsFound={setPatientIsFound}
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
