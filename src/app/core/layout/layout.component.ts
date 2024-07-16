import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
    selector: 'mn-layout',
    standalone: true,
    imports: [],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.redirect();
    }
}
