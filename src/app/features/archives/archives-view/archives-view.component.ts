import { Component, OnInit } from '@angular/core';
import { ArchivesService } from '../archives.service';
import { CommonModule } from '@angular/common';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { ArchivesListComponent } from '../archives-list/archives-list.component';
import { UserService } from '../../user/user.service';
import { ChildService } from '../../child/child.service';
import { parentService } from '../../parent/parent.service';
import { NurseryService } from '../../nursery/nursery.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'mn-archives',
    standalone: true,
    imports: [CommonModule, EmptyComponent, ArchivesListComponent],
    templateUrl: './archives-view.component.html',
    styleUrl: './archives-view.component.scss',
})
export class ArchivesViewComponent implements OnInit {
    activeTab: string = 'users';
    tabData: any[] = [];

    constructor(
        private archivesService: ArchivesService,
        private userService: UserService,
        private childService: ChildService,
        private parentService: parentService,
        private nurseryService: NurseryService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.selectTab('users');
    }

    selectTab(tabCategory: string) {
        this.activeTab = tabCategory;
        this.loadTabData(tabCategory);
    }

    loadTabData(tabCategory: string) {
        switch (tabCategory) {
            case 'users':
                this.archivesService.getUsersArchives().subscribe((data) => (this.tabData = data));
                break;
            case 'children':
                this.archivesService.getChildrenArchives().subscribe((data) => (this.tabData = data));
                break;
            case 'parents':
                this.archivesService.getParentsArchives().subscribe((data) => (this.tabData = data));
                break;
            case 'nurseries':
                this.archivesService.getNurseriesArchives().subscribe((data) => (this.tabData = data));
                break;
        }
    }

    delete(id: number) {
        switch (this.activeTab) {
            case 'users':
                this.userService.delete(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément supprimé');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'children':
                this.childService.delete(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément supprimé');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'parents':
                this.parentService.delete(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément supprimé');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'nurseries':
                this.nurseryService.delete(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément supprimé');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
        }
    }

    restore(id: number) {
        switch (this.activeTab) {
            case 'users':
                this.userService.restore(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément restauré');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'children':
                this.childService.restore(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément restauré');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'parents':
                this.parentService.restore(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément restauré');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'nurseries':
                this.nurseryService.restore(id).subscribe({
                    next: (data) => {
                        this.toastr.success('élément restauré');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
        }
    }

    multipleDelete(ids: number[]) {
        switch (this.activeTab) {
            case 'users':
                this.userService.deleteMultiple(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments supprimés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'children':
                this.childService.deleteMultiple(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments supprimés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'parents':
                this.parentService.deleteMultiple(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments supprimés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'nurseries':
                this.nurseryService.deleteMultiple(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments supprimés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
        }
    }

    multipleRestore(ids: number[]) {
        switch (this.activeTab) {
            case 'users':
                this.userService.multipleRestore(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments restaurés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'children':
                this.childService.multipleRestore(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments restaurés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'parents':
                this.parentService.multipleRestore(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments restaurés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
            case 'nurseries':
                this.nurseryService.multipleRestore(ids).subscribe({
                    next: (data) => {
                        this.toastr.success('éléments restaurés');
                        this.loadTabData(this.activeTab);
                    },
                    error: (err) => {
                        this.toastr.error('Une erreur est survenue');
                    },
                });
                break;
        }
    }
}
