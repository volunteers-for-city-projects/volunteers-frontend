import * as Yup from 'yup';
import { phone, telegram, letter } from './Fields';

export const IncomeFormSchema = Yup.object({
	phone,
	telegram,
	letter,
});
