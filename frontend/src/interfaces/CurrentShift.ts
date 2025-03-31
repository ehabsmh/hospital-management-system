import { IUser } from "./User";

interface ICurrentShift {
  doctors: IUser[];
  shiftId: string;
  groupId: string;
}

export default ICurrentShift;
