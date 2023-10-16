import ModalConfirm from './ModalConfirm';

export default {
	title: 'UI/ModalConfirm',
	component: ModalConfirm,
	tags: ['autodocs'],
	argTypes: {},
	args: {
		onSubmitOk: () => console.log('Форма отправлена'),
		onClickExit: () => console.log('Модальное окно закрыто'),
		isOpen: true,
		closeConfirm: () => console.log('Модальное окно закрыто'),
	},
};

export const Default = (args) => <ModalConfirm {...args} />;
