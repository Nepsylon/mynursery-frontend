import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../auth/services/auth.service';

interface Carousel {
    id: string;
    title: string;
    description: string;
    image: string;
}

@Component({
    selector: 'mn-home',
    standalone: true,
    imports: [CarouselModule, FooterComponent, ButtonModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
    responsiveOptions: any[] | undefined;
    constructor(private router: Router, private authService: AuthService) {}
    ngOnInit(): void {
        this.authService.isAuth.subscribe((isAuthenticated: boolean) => {
            if (isAuthenticated) {
                this.authService.redirect();
            }
        });

        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1,
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1,
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1,
            },
        ];
    }
    items: Carousel[] = [
        {
            id: 'roles',
            title: 'Les rôles',
            description: 'Ceci est la description des rôles',
            image: '',
        },
        {
            id: 'nursery',
            title: 'Les crèches',
            description:
                "Gestion des établissements : Ajout, modification et suppression des crèches, avec des informations détaillées telles que l'adresse, le nombre de places disponibles.",
            image: '',
        },
        {
            id: 'children',
            title: 'Les enfants',
            description: 'Ceci est la description des enfants',
            image: '',
        },
        {
            id: 'parents',
            title: 'Les parents',
            description: 'Ceci est la description des parents',
            image: '',
        },
        {
            id: 'activities',
            title: 'Les activités',
            description: 'Ceci est la description des activités',
            image: '',
        },
        {
            id: 'employees',
            title: 'Les employés',
            description: 'Ceci est la description des employés',
            image: '',
        },
        {
            id: 'bonus',
            title: 'Quelques points bonus',
            description: 'Ceci est la description des points bonus',
            image: '',
        },
        {
            id: 'bonus',
            title: 'Le 8eme',
            description: 'Ceci est la description du 8eme',
            image: '',
        },
        {
            id: '',
            title: '',
            description: '',
            image: '',
        },
    ];

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    redirectToSignIn() {
        this.router.navigate(['/sign-in']);
    }
}
