import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchBarService } from './search-bar.service';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
interface SearchSelect {
    name: string;
    endpoint: string;
}
type Dictionary = { [index: string]: string };

@Component({
    selector: 'mn-search-bar',
    standalone: true,
    imports: [FormsModule, CommonModule, DropdownModule, InputGroupModule, InputGroupAddonModule, InputTextModule, ButtonModule],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
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

    constructor(private searchBarService: SearchBarService) {}

    onSearch() {
        if (this.searchValue == '') {
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

    refreshSearchValue() {
        this.results = [];
        this.searchValue = '';
    }

    selectResult() {
        console.log('Selected result id:', this.searchValue);
        this.results = [];
        this.searchValue = '';
    }
}
