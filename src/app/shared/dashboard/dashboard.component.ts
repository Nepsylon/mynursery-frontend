import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
    selector: 'mn-dashboard',
    standalone: true,
    imports: [RouterLink, FontAwesomeModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    faBaby = faBaby;
    userRole: string | null;
    userRoleFr: string | null;

    constructor(private authService: AuthService) {}
    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        switch (this.userRole) {
            case 'admin':
                this.userRoleFr = 'Administrateur';
                break;
            case 'owner':
                this.userRoleFr = 'Gérant';
                break;
            case 'user':
                this.userRoleFr = 'Employé';
                break;
        }
    }
}
