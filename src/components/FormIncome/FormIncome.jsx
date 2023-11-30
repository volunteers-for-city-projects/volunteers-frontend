import { useState } from 'react';
import PropTypes from 'prop-types';
import { InputMask } from '@react-input/mask';
import { useFormik } from 'formik';
import Input from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';
import InputGroup from '../InputGroup/InputGroup';
import { IncomeFormSchema } from '../../utils/validationSchemas/IncomeFormSchema';
import { phoneMask } from '../../utils/inputsMasks/phoneMask';
import Button from '../Button/Button';
import ProjectIncome from '../../classes/ProjectIncome';
import PopupWindow from '../PopupWindow/PopupWindow';
import { bemClassHelper, formatPhone } from '../../utils/utils';
import './FormIncome.scss';

function FormIncome({ currentUser, onSubmit, projectId }) {
	const bem = bemClassHelper('form-income');
	const [popup, setPopup] = useState({ isOpen: false });
	const openPopup = (text, type, errorArray = []) => {
		setPopup({
			text,
			type,
			isOpen: true,
			errorArray,
		});
		setTimeout(() => {
			setPopup({
				isOpen: false,
			});
		}, 3000);
	};

	const formik = useFormik({
		validateOnMount: true,
		validateOnChange: true,
		initialValues: {
			phone: formatPhone(currentUser.phone),
			telegram: currentUser.telegram,
			letter: '',
		},
		validationSchema: IncomeFormSchema,
		onSubmit: () => {
			ProjectIncome.createNew(formik.values, currentUser.id, projectId)
				.then((income) => onSubmit(income))
				.catch((e) => openPopup('', 'error', e));
		},
	});

	return (
		<form className={bem('#')} onSubmit={formik.handleSubmit}>
			<InputGroup title="Контактные данные">
				<InputMask
					component={Input}
					mask="+7 (___) ___-__-__"
					replacement={{ _: /\d/ }}
					modify={phoneMask}
					id="phone"
					name="phone"
					label="Телефон"
					type="text"
					placeholder="+7 977 000-00-00"
					inputSize="small"
					value={formik.values.phone}
					handleChange={formik.handleChange}
					error={formik.errors.phone}
					touched={formik.touched.phone}
				/>
				<Input
					id="telegram"
					name="telegram"
					label="Telegram"
					type="text"
					placeholder="@name"
					inputSize="small"
					error={formik.errors.telegram}
					touched={formik.touched.telegram}
					value={
						formik.values.telegram && !formik.values.telegram.startsWith('@')
							? `@${formik.values.telegram}`
							: formik.values.telegram
					}
					handleChange={formik.handleChange}
					submitCount={formik.submitCount}
					autoсomplete="off"
				/>
				<div>
					<label htmlFor="email" className={bem('#__label')}>
						Почта
						<input
							value={currentUser.email}
							disabled
							className={bem('input', 'input_type-small', '#__email')}
							name="email"
							id="email"
						/>
					</label>
					<p className={bem('#__tip')}>
						На указанную почту вам придет уведомление о поданной заявке{' '}
					</p>
				</div>
			</InputGroup>
			<InputGroup title="Сопроводительное письмо">
				<InputTextArea
					name="letter"
					placeholder="Расскажите немного о себе, какие задачи вы бы хотели выполнять, кем хотели бы быть"
					value={formik.values.letter}
					handleChange={formik.handleChange}
					error={formik.errors.letter}
					label=""
				/>
			</InputGroup>
			<Button type="submit" className={bem('#__submit')}>
				Подать заявку на участие в проекте
			</Button>

			{popup?.isOpen && <PopupWindow {...popup} />}
		</form>
	);
}
FormIncome.propTypes = {
	currentUser: PropTypes.shape({
		id: PropTypes.number,
		phone: PropTypes.string,
		email: PropTypes.string,
		telegram: PropTypes.string,
	}).isRequired,
	onSubmit: PropTypes.func.isRequired,
	projectId: PropTypes.string.isRequired,
};
export default FormIncome;
