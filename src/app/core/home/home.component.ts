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
            id: 'nursery',
            title: 'Les crèches',
            description:
                "Gestion des établissements : Ajout, modification et suppression des crèches, avec des informations détaillées telles que l'adresse, le nombre de places disponibles.",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/home%2Fbirth-7653040_1920.png?alt=media&token=3de6ebe5-d1e9-4b01-bdc1-3c96bf2dca18',
        },
        {
            id: 'children',
            title: 'Les enfants',
            description:
                "Ce module comprend des fonctionnalités pour enregistrer les données personnelles de l'enfant (nom, prénom, date de naissance, contact des parents).",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/home%2Fbaby-592595_1920.png?alt=media&token=a5213933-8d88-4b2e-b916-3f61f5e89100',
        },
        {
            id: 'parents',
            title: 'Les parents',
            description:
                'Dans ce module on retrouve des formulaires pour compléter les informations de contact des parents. Les parents pourront être directement lié aux enfants.',
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/home%2Ffamily-7610392_1920.png?alt=media&token=99db51e2-0f34-4f3b-a72b-fba31b323e18',
        },
        {
            id: 'activities',
            title: 'Les activités',
            description:
                "Concernant les activités, il est possible de créer plusieurs types d'activés pour les enfants : arrivée, départ, manger, boire, couche, soins.",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/home%2Fboy-7653058_1920.png?alt=media&token=294f2ebd-64fa-440d-945d-e7c2c2381c8b',
        },
        {
            id: 'employees',
            title: 'Les employés',
            description:
                "Le gestionnaire de crèche a la possibilité de créer des profils utilisateurs pour ses employés. Il devra renseigner une adresse mail de son choix, un mot de passe générique. Il est primmordial d'avoir accès à ce mail.",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/home%2Fbio-6956069_1920.png?alt=media&token=f27dfadc-f8d2-441c-8907-05054ec7fe40',
        },
    ];

    redirectToLogin() {
        this.router.navigate(['/login']);
    }

    redirectToSignIn() {
        this.router.navigate(['/sign-in']);
    }
}
