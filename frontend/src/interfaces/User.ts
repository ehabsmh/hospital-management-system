export interface IDoctor {
  rank: "استشاري" | "أخصائي" | "طبيب عام";
  clinicId: string | { _id: string; name: string };
  shiftId?: string;
  isAvailable: boolean;
  totalPatients?: number;
  patientsHandled?: number;
  lastSignin?: Date;
}

export interface IUser {
  _id: string;
  fullName: string;
  email?: string;
  avatar: string;
  role?: "admin" | "receptionist" | "doctor";
  doctorInfo?: IDoctor;
}
