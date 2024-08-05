import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'mn-modal',
    standalone: true,
    imports: [DialogModule, ButtonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
})
export class ModalComponent {
    visible: boolean;
    @Input() title: string;
    @Input() description?: string;
    @Output() onCancel = new EventEmitter<void>();
    @Output() onConfirm = new EventEmitter<boolean>();
    @HostListener('click') onClick() {
        this.visible = !this.visible;
        console.log(this.visible);
    }

    cancel() {
        this.onCancel.emit();
    }
    confirm() {
        this.onConfirm.emit(true);
    }
}
