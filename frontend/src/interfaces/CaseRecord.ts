interface ICaseRecord {
  _id: string;
  createdAt: string;
  updatedAt: string;
  doctorId: string;
  patientId: string;
  prescription: {
    _id: string;
    name: string,
    type: string;
    dosage: string;
  }[];
  report: {
    title: string;
    body: string;
    _id: string;
  }
}
export default ICaseRecord;
