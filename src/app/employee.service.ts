import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Model/Employee';
import { PayrolDetails } from './Model/PayrolDetails';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:7274/api/Payroll/';
  constructor(private http: HttpClient) { }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl+"Employees");
  }

  getEmployee(id: number): Observable<PayrolDetails> {
    const url = `${this.apiUrl+"PayDetail"}/${id}`;
    return this.http.get<PayrolDetails>(url);
  }
  addEmployee(employeeData: any): Observable<Employee> {
    return this.http.post<any>(`${this.apiUrl}`, employeeData);
  }
}
