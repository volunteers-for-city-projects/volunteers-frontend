import Button from './Button';

export default {
	title: 'UI/Header/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		backgroundColor: { control: 'color' },
	},
	args: {
		label: 'Button',
		type: 'button',
	},
};

export const Default = () => <Button />;
