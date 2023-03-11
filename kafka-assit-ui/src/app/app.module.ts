import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublishToTopicComponent } from './publish-to-topic/publish-to-topic.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormField, MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModulesList } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClusterAdminComponent } from './cluster-admin/cluster-admin.component';
import { ActionDirective } from './action-components/action.directive';
import { DescribeClusterConfigComponent } from './action-components/describe-cluster-config/describe-cluster-config.component';
import { DescribeConfigComponent } from './action-components/describe-config/describe-config.component';
const routes: Routes = [{ path: 'admin', component: ClusterAdminComponent },
  { path: '', component: PublishToTopicComponent },
   { path: 'publish', component: PublishToTopicComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    PublishToTopicComponent,ClusterAdminComponent,ActionDirective,
    DescribeClusterConfigComponent,DescribeConfigComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    MaterialModulesList,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [    
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
