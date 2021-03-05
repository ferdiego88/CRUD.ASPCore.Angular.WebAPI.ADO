import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { City } from 'src/models/city';
import { Personal } from 'src/models/personal';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  personalForm: FormGroup;
  title = 'Create';
  IdPersonal: number;
  errorMessage: any;
  cityList: City[];

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _employeeService: EmployeeService, private _router: Router) {
    if (this._avRoute.snapshot.params['id']) {
      this.IdPersonal = this._avRoute.snapshot.params['id'];
    }

    this.personalForm = this._fb.group({
      IdPersonal: 0,
      nombres: ['', [Validators.required]],
      fchNac: ['', [Validators.required]],
      fchIngreso: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // this._employeeService.getCityList().subscribe(
    //   (data: City[]) => this.cityList = data
    // );

    if (this.IdPersonal > 0) {
      this.title = 'Editar';
      this._employeeService.getEmployeeById(this.IdPersonal)
        .subscribe((response: Personal) => {
          this.personalForm.setValue(response);
        }, error => console.error(error));
    }
  }

  save() {

    if (!this.personalForm.valid) {
      return;
    }

    if (this.title === 'Create') {
      this._employeeService.saveEmployee(this.personalForm.value)
        .subscribe(() => {
          this._router.navigate(['/fetch-employee']);
        }, error => console.error(error));
    } else if (this.title === 'Edit') {
      this._employeeService.updateEmployee(this.personalForm.value)
        .subscribe(() => {
          this._router.navigate(['/fetch-employee']);
        }, error => console.error(error));
    }
  }

  cancel() {
    this._router.navigate(['/fetch-employee']);
  }

  get nombres() { return this.personalForm.get('nombres'); }
  get fchNac() { return this.personalForm.get('fchNac'); }
  get fchIngreso() { return this.personalForm.get('fchIngreso'); }
}
