import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { FooterComponent } from '../../../core/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mn-board-user',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterOutlet],
    templateUrl: './board-user.component.html',
    styleUrl: './board-user.component.scss',
})
export class BoardUserComponent {}
