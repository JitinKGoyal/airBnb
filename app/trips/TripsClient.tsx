'use client';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import Container from '../components/Container';
import Heading from '../components/Heading';

import { SafeReservations, SafeUser } from '../types';

interface TripsClientProps {
	reservations: SafeReservations[];
	currentUser: SafeUser;
}

const TripsClient: React.FC<TripsClientProps> = ({ currentUser, reservations }) => {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState('');

	const onCancle = useCallback((id: string) => {}, [second]);

	return (
		<Container>
			<Heading title="Trips" subtitle="Where you've been and where you're going" />
			<div className="mt-10 grid grid-cols-1 sm:gri-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8"></div>
		</Container>
	);
};

export default TripsClient;
