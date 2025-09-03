import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { HomeComponent } from './components/home/home';
import { MaisonsEditionComponent } from './components/maisons-edition/maisons-edition';
import { AuteursComponent } from './components/auteurs/auteurs';
import { LivresComponent } from './components/livres/livres';
import { ContactsComponent } from './components/contacts/contacts';
import { UtilisateursComponent } from './components/utilisateurs/utilisateurs';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'maisons-edition', component: MaisonsEditionComponent },
  { path: 'auteurs', component: AuteursComponent },
  { path: 'livres', component: LivresComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'utilisateurs', component: UtilisateursComponent }
];
