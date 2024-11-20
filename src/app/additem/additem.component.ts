import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardModule} from "@angular/material/card";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AdditemService} from "./service/additem.service";
import {Observable} from "rxjs";
import { IProduct } from '../shared/model/product';

@Component({
  selector: 'app-additem',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './additem.component.html',
  styleUrl: './additem.component.css'
})
export class AdditemComponent implements OnInit{
  @Input() public productData: IProduct | null = null;  // Meglévő termék adatainak fogadása
  public productForm: FormGroup;

  public constructor(private fb: FormBuilder, private additemService: AdditemService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    if (this.productData) {
      this.productForm.patchValue({
        name: this.productData.name,
        price: this.productData.price,
        description: this.productData.description
      });
    }
  }
  public loadItems() : Observable<IProduct[]> {
    return this.additemService.getAllItems();
  }

  public onSubmit() : void {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      const item: IProduct = {
        id : 0,
        name : formData.name,
        description : formData.description,
        price : formData.price,
      }
      this.additemService.createItem(item).subscribe(() => {
        this.loadItems();
      });
    } else {
      console.log('Az űrlap nem megfelelően van kitöltve.');
    }
  }

}
