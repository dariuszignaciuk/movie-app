import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {LinkButtonComponent} from './components/link-button/link-button.component';
import {RouterModule} from '@angular/router';
import {IconComponent} from './components/icon/icon.component';

const MATERIAL_MODULES = [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
];

const SHARED_MODULES = [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
];

const SHARED_COMPONENTS = [
    LinkButtonComponent,
    IconComponent,
];

@NgModule({
    declarations: [
        SHARED_COMPONENTS,
    ],
    imports: [
        SHARED_MODULES,
    ],
    exports: [
        SHARED_MODULES,
        SHARED_COMPONENTS,
    ]
})
export class SharedModule {
}
