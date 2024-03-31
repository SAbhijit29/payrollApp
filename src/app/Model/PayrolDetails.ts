import { Employee } from "./Employee";

export interface PayrolDetails extends Employee{
  dearnessAllowance: number
  conveyanceAllowance: number
  houseRentAllowance: number
  totalSalary: number
  genderStatus: string
  employeeCode: number
  employeeName: string
  dateOfBirth: string
  gender: number
  department: string
  designation: string
  basicSalary: number
  professionalTax:number
}
