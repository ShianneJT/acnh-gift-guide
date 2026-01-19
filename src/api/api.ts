import { api } from "./client";

// Villager
export interface Villager {
	name: string;
	url: string;
	alt_name: string;
	title_color: string;
	text_color: string;
	id: string;
	image_url: string;
	species: string;
	personality: string;
	gender: string;
	birthday_month: string;
	birthday_day: string;
	sign: string;
	quote: string;
	phrase: string;
	clothing: string;
	islander: boolean;
	debut: string;
	prev_phrases: string[];
	nh_details: NHDetails;
	appearances: string[];
}

// NH Villager Details
export interface NHDetails {
	image_url: string;
	photo_url: string;
	icon_url: string;
	quote: string;
	"sub-personality": string;
	catchphrase: string;
	clothing: string;
	clothing_variation: string;
	fav_styles: string[];
	fav_colors: string[];
	hobby: string;
	house_interior_url: string;
	house_exterior_url: string;
	house_wallpaper: string;
	house_flooring: string;
	house_music: string;
	house_music_note: string;
	umbrella: string;
}

// Clothing
export interface Clothing {
	name: string;
	url: string;
	category: string;
	sell: number;
	variation_total: number;
	vill_equip: boolean;
	seasonality: string;
	version_added: string;
	unlocked: boolean;
	notes: string;
	label_themes: string[];
	styles: string[];
	availability: Availability[];
	buy: BuyPrice[];
	variations: Variation[];
}

// Furniture
export interface Furniture {
	name: string;
	url: string;
	category: string;
	item_series: string;
	item_set: string;
	themes: string[];
	hha_category: string;
	hha_base: number;
	tag: string;
	lucky: boolean;
	lucky_season: string;
	buy: BuyPrice[];
	sell: number;
	variation_total: number;
	pattern_total: number;
	customizable: boolean;
	custom_kits: number;
	custom_kit_type: string;
	custom_body_part: string;
	custom_pattern_part: string;
	grid_width: number;
	grid_length: number;
	height: number;
	door_decor: boolean;
	version_added: string;
	unlocked: boolean;
	functions: string[];
	availability: Availability[];
	variations: Variation[];
	notes: string;
}

// Shared between Clothing and Furniture
export interface Variation {
	variation: string;
	pattern?: string; // Furniture
	image_url: string;
	colors: string[];
}

export interface BuyPrice {
	price: number;
	currency: string;
}

export interface Availability {
	from: string;
	note: string;
}

export interface ACNHEvent {
	event: string;
	date: string;
	type: string;
	url: string;
}

export const getAllVillagers = async (): Promise<Villager[]> => {
	const response = await api.get<[]>("/villagers?game=nh&nhdetails=true");
	return response.data;
};

export const getAllClothing = async (): Promise<Clothing[]> => {
	const response = await api.get<[]>("/nh/clothing");
	return response.data;
};

export const getTodaysEvents = async (): Promise<ACNHEvent[]> => {
	const date = new Date().toLocaleDateString("en-CA");

	const response = await api.get<[]>(`/nh/events?date=${date}`);
	return response.data;
};
