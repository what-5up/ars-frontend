//GENERAL
export const BASE_API = "http://localhost:5000/";

//AUTH
export const AUTH_REDIRECT_PATH = '/';

//ENUMS
export const GendersEnum = {
    MALE: 'm',
    FEMALE: 'f',
    OTHER: 'o'
}
Object.freeze(GendersEnum);

export const BookingStatesEnum = {
    BOOKING: 'booked',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
}
Object.freeze(BookingStatesEnum);

export const gender = [
	{ value: 'm', label: 'Male' },
	{ value: 'f', label: 'Female' },
	{ value: 'o', label: 'Other' },
];
