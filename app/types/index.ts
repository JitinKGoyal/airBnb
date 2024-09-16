import { Listing, Reservation, User } from '@prisma/client';

export type SafeListings = Omit<Listing, 'createdAt'> & {
	createdAt: string;
};

export type SafeReservations = Omit<Reservation, 'createdAt' | 'startData' | 'endDate' | 'Listing'> & {
	createdAt: string;
	startData: string;
	endDate: string;
	Listing: SafeListings;
};

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
	createdAt: string;
	updatedAt: string;
	emailVerified: string | null;
};
