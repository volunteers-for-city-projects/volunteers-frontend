import { withRouter } from 'storybook-addon-react-router-v6';
import Footer from './Footer';

export default {
	title: 'Blocks/Footer',
	component: Footer,
	tags: ['autodocs'],
	argTypes: {},
	args: {},
	decorators: [withRouter],
};

export const Default = () => <Footer />;
