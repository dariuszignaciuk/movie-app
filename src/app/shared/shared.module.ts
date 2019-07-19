import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

const MATERIAL_MODULES = [
    MatInputModule,
    MatFormFieldModule,
];

const SHARED_MODULES = [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
];

@NgModule({
    declarations: [],
    imports: [
        SHARED_MODULES
    ],
    exports: [
        SHARED_MODULES
    ]
})
export class SharedModule {
}
