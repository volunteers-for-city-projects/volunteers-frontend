import { withRouter } from 'storybook-addon-react-router-v6';
import Promo from './Promo';

export default {
	title: 'Promo',
	component: Promo,
	decorators: [withRouter],
	args: {
		plarformPromo: {
			projectCount: 0,
			volunteersCount: 0,
			organizersCount: 0,
		},
	},
};

export const Default = (arg) => <Promo {...arg} />;
