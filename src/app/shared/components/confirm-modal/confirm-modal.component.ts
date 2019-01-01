import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';
import { ConfirmResponseType } from '../../../core/enums/confirm-response-type.enum';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {

  constructor(protected matBottomSheetRef: MatBottomSheetRef) {}

  @HostListener('document:keydown.enter')
  private onEnter(): void {
    this.matBottomSheetRef.dismiss('confirm');
  }

  @HostListener('document:keydown.esc')
  private onClose(): void {
    this.matBottomSheetRef.dismiss('abort');
  }

  public onResponse(response: ConfirmResponseType): void {
    this.matBottomSheetRef.dismiss(response);
  }
}
