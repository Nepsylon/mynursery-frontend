import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBaby, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Role } from '../auth/enums/role.enum';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'mn-navbar',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        MenubarModule,
        BadgeModule,
        AvatarModule,
        InputTextModule,
        RippleModule,
        CommonModule,
        IconFieldModule,
        InputIconModule,
        FontAwesomeModule,
        SearchBarComponent,
        ButtonModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    animations: [
        trigger('toggleSearch', [
            state(
                'hidden',
                style({
                    opacity: 0,
                    height: '0px',
                })
            ),
            state(
                'visible',
                style({
                    opacity: 1,
                    height: '*',
                })
            ),
            transition('hidden <=> visible', [animate('300ms ease-in-out')]),
        ]),
    ],
})
export class NavbarComponent implements OnInit {
    showSearchBar = false;
    userRole: string | null = '';
    items: MenuItem[] | undefined;
    adminItems: MenuItem[] = [
        {
            label: 'Tableau de bord',
            id: 'dashboard',
            icon: 'pi pi-home',
            url: '',
        },
        {
            label: 'Les crèches',
            id: 'nurseries',
            icon: 'pi pi-star',
            url: 'nurseries',
        },

        {
            label: 'Dans la crèche',
            id: 'nursery',
            icon: 'pi pi-shop',
            items: [
                {
                    label: 'Les employés',
                    id: 'employees',
                    icon: 'pi pi-users',
                    url: 'employees',
                },

                {
                    label: 'Les enfants',
                    id: 'children',
                    faIcon: faBaby,
                    url: 'children',
                },

                {
                    label: 'Les parents',
                    id: 'parents',
                    icon: 'pi pi-user',
                    url: 'parents',
                },

                {
                    label: 'Les activités',
                    id: 'activities',
                    icon: 'pi pi-book',
                    url: 'activities',
                    //command: this.toggleSearchBar,
                },
            ],
        },
    ];
    ownerItems: MenuItem[] = [
        {
            label: 'Tableau de bord',
            id: 'dashboard',
            icon: 'pi pi-home',
        },
        {
            label: 'Les crèches',
            id: 'nurseries',
            icon: 'pi pi-star',
            url: 'nurseries',
        },

        {
            label: 'Dans la crèche',
            id: 'nursery',
            icon: 'pi pi-shop',
            items: [
                {
                    label: 'Les employés',
                    id: 'employees',
                    icon: 'pi pi-users',
                    url: 'employees',
                },

                {
                    label: 'Les enfants',
                    id: 'children',
                    faIcon: faBaby,
                    url: 'children',
                },

                {
                    label: 'Les parents',
                    id: 'parents',
                    icon: 'pi pi-user',
                    url: 'parents',
                },

                {
                    label: 'Les activités',
                    id: 'activities',
                    icon: 'pi pi-book',
                    url: 'activities',
                    command: this.toggleSearchBar,
                },
            ],
        },
    ];
    userItems: MenuItem[] = [
        {
            label: 'Les enfants',
            id: 'children',
            faIcon: faBaby,
        },

        {
            label: 'Les parents',
            id: 'parents',
            icon: 'pi pi-users',
        },

        {
            label: 'Les activités',
            id: 'activities',
            icon: 'pi pi-book',
        },
    ];
    faBaby = faBaby;
    faHouse = faHouse;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.getRole();
    }

    getRole(): void {
        this.userRole = this.authService.getUserRole();

        switch (this.userRole) {
            case Role.Admin:
                this.items = this.adminItems;
                break;
            case Role.Owner:
                this.items = this.ownerItems;
                break;
            case Role.User:
                this.items = this.userItems;
                break;
        }
    }

    toggleSearchBar() {
        this.showSearchBar = !this.showSearchBar;
    }

    logout() {
        this.authService.logout();
    }
}
