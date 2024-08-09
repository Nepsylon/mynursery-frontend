import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBaby } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'mn-home-admin',
    standalone: true,
    imports: [RouterLink, FontAwesomeModule],
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent {
    faBaby = faBaby;
}
