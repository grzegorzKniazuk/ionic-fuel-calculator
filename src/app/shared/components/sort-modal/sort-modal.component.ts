import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormService } from '../../../core/services/form.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortModalComponent implements OnInit {

  public sortForm: FormGroup;

  constructor(private formService: FormService, private storageService: StorageService) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.sortForm = this.formService.sortForm;
  }

  private updateSortCriteria(): void {
    if (this.sortForm.valid) {
      this.storageService.updateSortCriteria(this.sortForm.value);
    }
  }
}
