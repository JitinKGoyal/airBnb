import { SafeUser } from '@/app/types';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import useLoginModal from './useLoginModal';

import axios from 'axios';
import toast from 'react-hot-toast';

interface IUseFavorite {
	listingId: string;
	currentUser: SafeUser | null;
}

const useFavorite = ({ currentUser, listingId }: IUseFavorite) => {
	const loginModal = useLoginModal();
	const router = useRouter();

	const hasFavorited = useMemo(() => {
		const favoriteIds = currentUser?.favoriteIds || [];
		return favoriteIds.includes(listingId);
	}, [currentUser, listingId]);

	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}

			try {
				let request;

				if (hasFavorited) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong');
			}
		},
		[currentUser, hasFavorited, listingId, loginModal, router]
	);

	return { hasFavorited, toggleFavorite };
};

export default useFavorite;
