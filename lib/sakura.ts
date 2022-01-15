import { UpdateFunction } from './mod.ts';

export interface Sakura {
	brand: string;
	name: string;
	codename: string;
	maintainer_name: string;
	maintainer_xda: string;
	maintainer_country: string;
	xda_thread: string;
	active: boolean;
	donation_link?: string;
}
export const sakura: UpdateFunction = async (stored_devices, getDevice) => {
	const devices: Sakura[] = await fetch(
		'https://github.com/ProjectSakura/OTA/blob/11/devices.json?raw=true'
	).then((r) => r.json());
	devices.forEach((x) => {
		let device = getDevice(x.codename);
		device = {
			...device,
			brand: device.brand || x.brand,
			name: device.name || x.name,
			codename: x.codename,
			roms: [
				...device.roms,
				{
					id: 'sakura',
					xda_thread: x.xda_thread,
					maintainer_url: x.maintainer_xda,
					maintainer_name: x.maintainer_name,
					active: x.active,
				},
			],
		};
		stored_devices.set(x.codename, device);
	});
};
