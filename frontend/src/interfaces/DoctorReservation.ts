interface IDoctorReservation {
  _id: string;
  patientId: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    age: number;
    job: string;

  };
  doctorId: string;
  reservationTypeId: {
    _id: string;
    name: string;
    price: number;
  };
  status: string;
}

export default IDoctorReservation;
