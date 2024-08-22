import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildService } from '../child.service';
import { ToastrService } from 'ngx-toastr';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { NurseryService } from '../../nursery/nursery.service';
import { Router } from '@angular/router';
import { RadioButtonModule } from 'primeng/radiobutton';
import { parentService } from '../../parent/parent.service';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
    selector: 'mn-child-details-form',
    standalone: true,
    imports: [ReactiveFormsModule, DropdownModule, ButtonModule, ModalComponent, RadioButtonModule, CalendarModule, MultiSelectModule],
    templateUrl: './child-details-form.component.html',
    styleUrl: './child-details-form.component.scss',
})
export class ChildDetailsFormComponent implements OnInit, OnChanges {
    @Input() child: Child;
    @Input() childId: string;
    loading: boolean = false;
    listPotentialParents: Parent[];
    listPotentialNurseries: Nursery[];

    childForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        surname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
        age: new FormControl(0, [Validators.required, Validators.min(0)]),
        gender: new FormControl('male'),
        startDateContract: new FormControl<Date | null>(null),
        endDateContract: new FormControl<Date | null>(null),
        nursery: new FormControl<number>(0, [Validators.required]),
        parents: new FormControl<Parent[] | number[]>([], [Validators.required]),
    });

    constructor(
        private childService: ChildService,
        private parentService: parentService,
        private nurseryService: NurseryService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.updateForm(this.child);
        console.log(this.child);
        this.getPotentialNurseries();
        this.getPotentialParents();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['child'] && changes['child'].currentValue) {
            this.updateForm(changes['child'].currentValue);
        }
    }

    public get form() {
        return this.childForm.controls;
    }

    getPotentialNurseries(): void {
        this.nurseryService.getAll().subscribe({
            next: (res: Nursery[]) => {
                this.listPotentialNurseries = res;
            },
        });
    }

    getPotentialParents(): void {
        this.parentService.getAll().subscribe({
            next: (res: Parent[]) => {
                this.listPotentialParents = res;
            },
        });
    }

    updateForm(child: Child): void {
        this.childForm.patchValue({
            name: child.name,
            surname: child.surname,
            age: child.age,
            gender: child.gender,
            startDateContract: new Date(child.startDateContract),
            endDateContract: new Date(child.endDateContract),
            parents: child?.parents,
            nursery: child.nursery?.id,
        });
    }

    onUpdate(): void {
        this.loading = true;
        console.log('1', this.childForm.value);
        const parentsIds: number[] = (this.childForm.value.parents as Parent[]).map((parent) => parent.id);
        console.log(typeof parentsIds);
        this.childForm.value.parents = parentsIds;
        console.log('2', this.childForm.value);
        this.childService.update(this.childId, this.childForm.value).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Enfant mise à jour');
            },
            error: (res: any) => {
                this.loading = false;
                this.toastr.error('Une erreur est survenue pendant la mise à jour des informations');
            },
        });
    }
    onDelete(): void {
        this.loading = true;
        this.childService.delete(this.childId).subscribe({
            next: (res: any) => {
                this.loading = false;
                this.toastr.success('Enfant supprimé');
                this.router.navigate(['/admin/children']);
            },
            error: (res: any) => {
                this.loading = false;
                console.error('error', res);
                this.toastr.error('Une erreur est survenue pendant la suppression');
            },
        });
    }
}
