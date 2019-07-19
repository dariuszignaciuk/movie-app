import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material';

const MATERIAL_MODULES = [
    MatInputModule
];

const SHARED_MODULES = [
    CommonModule,
    HttpClientModule,
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
