import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {ClipboardService} from "./services/clipboard.service";

const appRoutes: Routes = [
	{path: 'index.html', component: AppComponent},
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [
		ClipboardService,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
