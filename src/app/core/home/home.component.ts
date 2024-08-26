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
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/pexels-wildlittlethingsphoto-27176373.jpg?alt=media&token=cec87823-9bd8-46ea-ad09-aed575f09391',
        },
        {
            id: 'children',
            title: 'Les enfants',
            description:
                "Ce module comprend des fonctionnalités pour enregistrer les données personnelles de l'enfant (nom, prénom, date de naissance, contact des parents).",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/pexels-hannah-barata-776560167-27787983.jpg?alt=media&token=58e0926a-a8d6-457c-9583-ada3771c7aa4',
        },
        {
            id: 'parents',
            title: 'Les parents',
            description:
                'Dans ce module on retrouve des formulaires pour compléter les informations de contact des parents. Les parents pourront être directement lié aux enfants.',
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/pexels-vidalbalielojrfotografia-1682497.jpg?alt=media&token=0e60871b-59af-4c98-a1fd-d3ea1730c78b',
        },
        {
            id: 'activities',
            title: 'Les activités',
            description:
                "Concernant les activités, il est possible de créer plusieurs types d'activés pour les enfants : arrivée, départ, manger, boire, couche, soins.",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/pexels-markusspiske-234137.jpg?alt=media&token=d051a9cc-4956-4435-8ddb-0de3ef085d1f',
        },
        {
            id: 'employees',
            title: 'Les employés',
            description:
                "Le gestionnaire de crèche a la possiblité de créer des profils utilisateurs pour ses employés. Il devra renseigner une adresse mail de son choix, un mot de passe générique. Il est primmordial d'avoir accès à ce mail.",
            image: 'https://firebasestorage.googleapis.com/v0/b/my-nursery-73d6f.appspot.com/o/pexels-fauxels-3182773.jpg?alt=media&token=d9032d6c-5ea3-4bb7-a625-2293ef28b8c8',
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
