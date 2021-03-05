import { Component } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Personal } from 'src/models/personal';

@Component({
  selector: 'app-fetch-employee',
  templateUrl: './fetch-employee.component.html',
  styleUrls: ['./fetch-employee.component.css']
})
export class FetchEmployeeComponent {

  public personalList: Personal[];

  constructor(private _employeeService: EmployeeService) {
    this.getEmployees();
  }

  getEmployees() {
    this._employeeService.getEmployees().subscribe(
      (data: Personal[]) => {this.personalList = data; console.log(data); }
    );
  }

  delete(employeeID) {
    const ans = confirm('Do you want to delete employee with Id: ' + employeeID);
    if (ans) {
      this._employeeService.deleteEmployee(employeeID).subscribe(() => {
        this.getEmployees();
      }, error => console.error(error));
    }
  }
}
