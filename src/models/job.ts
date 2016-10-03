import { Param } from "./param";
export interface Job {
  name: string;
  description?: string;
  params?: Param[];
}
