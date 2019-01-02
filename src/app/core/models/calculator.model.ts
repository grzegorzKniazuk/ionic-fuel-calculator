import { ValidatorPlaceholderData } from '../enums/validator-placeholder-data.enum';
import { FormPlaceholderData } from '../enums/form-placeholder-data.enum';

export class CalculatorModel {
	public validatorPlaceholder;
	public formPlaceholderData;

	protected initPlaceholders(): void {
		this.validatorPlaceholder = ValidatorPlaceholderData;
		this.formPlaceholderData = FormPlaceholderData;
	}
}
