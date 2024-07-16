import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'mn-navbar',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    userRole: string | null = '';

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
    }

    logout() {
        this.authService.logout();
    }
}
