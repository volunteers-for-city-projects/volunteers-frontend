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
		type: 'logout',
		onClick: () => console.log('Клик'),
	},
};

export const Default = (args) => <Button {...args} />;
