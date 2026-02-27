import { Routes } from '@angular/router';
import { Imprint } from './imprint/imprint';
import { PrivacyPolicy } from './privacy-policy/privacy-policy';
import { PageNotFound } from './page-not-found/page-not-found';
import { Main } from './main/main';

export const routes: Routes = [
    {path: "", component: Main},
    {path: "imprint", component: Imprint},
    {path: "privacy-policy", component: PrivacyPolicy},
    {path: "page-not-found", component: PageNotFound},
    {path: "**", redirectTo: "page-not-found"}
];
