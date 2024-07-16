import { Component } from '@angular/core';
import { NavbarComponent } from '../../../core/navbar/navbar.component';
import { FooterComponent } from '../../../core/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'mn-board-owner',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterOutlet],
    templateUrl: './board-owner.component.html',
    styleUrl: './board-owner.component.scss',
})
export class BoardOwnerComponent {}
