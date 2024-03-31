import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Employee } from 'src/app/Model/Employee';
import { EmployeeService } from 'src/app/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayrolDetails } from 'src/app/Model/PayrolDetails';

@Component({
  selector: 'app-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeePayrollComponent implements OnInit {
  employees: Employee[] = [];
  payroll!: PayrolDetails;
  employeeForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    //this.getEmployees();
    this.initForm();
  }

  initForm() {
    this.employeeForm = this.formBuilder.group({
      employeeName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['3', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
      basicSalary: ['', Validators.required],
    });
  }

  //function to get the employees
  getEmployees(): void {
    //this.employeeForm.reset();
    this.employeeService.getEmployees().subscribe(
      (employees) => (this.employees = employees),
      (error) => console.log(error)
    );
  }

  //Function to show the individual  pay slip
  showSlip(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (payroll) => {
        this.payroll = payroll;
      },
      (error) => console.log(error)
    );
  }

  // Function to add employee
  addEmployee(): void {
    // Check if the form is valid
    if (this.employeeForm.valid) {
      const validation = this.ValidateForm(this.employeeForm);

      if (validation) {
        const newEmployee = this.employeeForm.value;
        const max = this.employees.length;
        newEmployee.employeeCode = max + 1;

        this.employeeService.addEmployee(newEmployee).subscribe(
          (res) => {
            this.getEmployees();
            this.employeeForm.reset();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        window.alert('Invalid DOB');
      }
    } else {
      alert('Please fill out all fields');
    }
  }

  ValidateForm(form: FormGroup) {
    const selectedDate = new Date(form.value.dateOfBirth);
    const currentDate = new Date();

    if (selectedDate > currentDate) {
      return false; // Return validation error as false if date is in the future
    }

    return true; // Return true if validation passes
  }
}
