interface ICaseRecord {
  _id?: string;
  createdAt: string;
  updatedAt?: string;
  doctorId: string;
  patientId: string;
  prescription: {
    _id?: string;
    name: string,
    type: string;
    dosage: string;
  }[];
  report: {
    _id?: string;
    title: string;
    body: string;
  }
}


export default ICaseRecord;
