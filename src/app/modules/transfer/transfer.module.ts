import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransferComponent } from './pages/transfer.component';

const routes: Routes = [
  { path: '', component: TransferComponent },
];

@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class TransferModule { }
