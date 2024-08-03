import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule, BrowserModule, HttpClientModule],
  exports: [],
})
export class SharedModule {}
