import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { importExpr } from '@angular/compiler/src/output/output_ast';

@NgModule({
  declarations: [CategoryListComponent, CategoryFormComponent],
  imports: [CommonModule, CategoriesRoutingModule, ReactiveFormsModule],
})
export class CategoriesModule {}
