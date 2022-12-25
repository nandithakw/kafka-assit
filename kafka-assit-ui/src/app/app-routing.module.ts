import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClusterAdminComponent } from './cluster-admin/cluster-admin.component';
import { PublishToTopicComponent } from './publish-to-topic/publish-to-topic.component';

const routes: Routes = [{ path: 'admin', component: ClusterAdminComponent },
{ path: 'publish', component: PublishToTopicComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
