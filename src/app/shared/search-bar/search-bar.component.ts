import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarService } from './search-bar.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';

interface SearchSelect {
    name: string;
    endpoint: string;
}
type Dictionary = { [index: string]: string };

@Component({
    selector: 'mn-search-bar',
    standalone: true,
    imports: [
        FormsModule,
        CommonModule,
        DropdownModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule,
        ButtonModule,
        RouterLink,
    ],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
    @Output() hide = new EventEmitter<void>();
    fields: Dictionary = {
        nurseries: 'name',
        children: 'name',
        parents: 'name',
        users: 'name',
        activities: 'title',
    };
    repositories: SearchSelect[] = [
        {
            name: 'crèches',
            endpoint: 'nurseries',
        },
        {
            name: 'enfants',
            endpoint: 'children',
        },
        {
            name: 'parents',
            endpoint: 'parents',
        },
        {
            name: 'utilisateur',
            endpoint: 'users',
        },
    ];
    searchRepo: string = this.repositories[0].endpoint;
    searchValue: string = '';
    results: any[] = [];
    searchBarVisible = false;

    constructor(private searchBarService: SearchBarService, private router: Router) {}

    hideSearchBar() {
        this.hide.emit();
    }

    onSearch() {
        if (this.searchValue.trim() === '') {
            this.results = [];
            return;
        }
        const endpoint = this.searchRepo;
        const field = this.fields[this.searchRepo];
        const value = this.searchValue;

        this.searchBarService.searchElements(endpoint, field, value).subscribe({
            next: (data: any[]) => {
                this.results = data;
            },
        });
    }

    onSearchButton() {
        this.router.navigate([this.searchRepo, this.searchValue]);
    }

    refreshSearchValue() {
        this.results = [];
        this.searchValue = '';
    }

    selectResult(event: any) {
        console.log('Selected result id:', typeof this.searchValue);
        console.log('Selected result id:', this.searchRepo);
        this.results = [];
        this.searchValue = event.label;
    }
}
