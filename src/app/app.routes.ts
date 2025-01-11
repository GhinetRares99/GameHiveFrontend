import { Routes } from '@angular/router';
import { ShopComponent } from './components/shop/shop.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AfterSignUpComponent } from './components/after-sign-up/after-sign-up.component';
import { SeeMoreComponent } from './components/see-more/see-more.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyGamesComponent } from './components/my-games/my-games.component';
import { AccountComponent } from './components/account/account.component';
import { adminGuard } from './guards/admin.guard';
import { AddGameComponent } from './components/add-game/add-game.component';
import { AddTrophyComponent } from './components/add-trophy/add-trophy.component';
import { UpdateTrophyComponent } from './components/update-trophy/update-trophy.component';
import { UpdateGameComponent } from './components/update-game/update-game.component';
import { UpdateUserAdminComponent } from './components/update-user-admin/update-user-admin.component';
import { SeeMoreShopComponent } from './components/see-more-shop/see-more-shop.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'shop',
        component: ShopComponent,
    },
    {
        path: 'signin',
        component: SignInComponent,
    },
    {
        path: 'signup',
        component: SignUpComponent,
    },
    {
        path: 'after-sign-up',
        component: AfterSignUpComponent,
    },
    {
        path: 'see-more/:gameName',
        component: SeeMoreComponent,
    },
    {
        path: 'see-more-shop/:gameName',
        component: SeeMoreShopComponent,
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/add-game',
        component: AddGameComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/add-trophy',
        component: AddTrophyComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/update-trophy/:trophyName',
        component: UpdateTrophyComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/update-game/:gameName',
        component: UpdateGameComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'admin/update-user-admin/:userName',
        component: UpdateUserAdminComponent,
        canActivate: [adminGuard],
    },
    {
        path: 'my-games',
        component: MyGamesComponent,
    },
    {
        path: 'account',
        component: AccountComponent,
    },
];
