import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'mn-nursery-form',
    standalone: true,
    imports: [ButtonModule, FileUploadModule, ToastModule],
    templateUrl: './nursery-form.component.html',
    styleUrl: './nursery-form.component.scss',
})
export class NurseryFormComponent {
    onUpload(event: UploadEvent) {}
}
