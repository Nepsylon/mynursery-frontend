import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { ChildService } from '../child.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'mn-child-details-form',
    standalone: true,
    imports: [],
    templateUrl: './child-details-form.component.html',
    styleUrl: './child-details-form.component.scss',
})
export class ChildDetailsFormComponent implements OnInit, OnChanges {
    @Input() child: Child;
    @Input() childId: string;

    childForm = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        age: new FormControl(0),
        gender: new FormControl('male'),
        startDateContract: new FormControl(),
        endDateContract: new FormControl(),
    });

    constructor(private childService: ChildService, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.updateForm(this.child);
    }

    ngOnChanges(changes: SimpleChanges): void {}

    updateForm(child: Child): void {
        this.childForm.setValue(child);
    }
}
