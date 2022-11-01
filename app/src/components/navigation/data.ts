export interface AppPage {
	name: string;
	tags: string;
	href: string;
	iconClassName: string;
	badge: string;
}
export const appPages: AppPage[] = [
	{
		name: 'Home',
		tags: 'See all you need',
		href: '/',
		iconClassName: 'home',
		badge: ''
	},
	{
		name: 'Workflow builder',
		tags: 'See all you need',
		href: '/workflow-builder/',
		iconClassName: 'foundation',
		badge: ''
	},
	{
		name: 'Verify domain',
		tags: 'Verify your domain so you can enable tipping',
		href: '/verify-your-domain/',
		iconClassName: 'domain',
		badge: ''
	},
	{
		name: 'Profile',
		tags: 'Verify your domain so you can enable tipping',
		href: '/profile/',
		iconClassName: 'account_circle',
		badge: ''
	}
];
