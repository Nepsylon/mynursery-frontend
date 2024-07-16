import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'mn-home-admin',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './home-admin.component.html',
    styleUrl: './home-admin.component.scss',
})
export class HomeAdminComponent {}
