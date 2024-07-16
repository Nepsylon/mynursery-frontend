import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { FooterComponent } from '../../../core/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mn-board-admin',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterOutlet],
    templateUrl: './board-admin.component.html',
    styleUrl: './board-admin.component.scss',
})
export class BoardAdminComponent {}
