'use client';

import React, { FC } from 'react';
import { SafeUser } from '../types/SafeUser';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface HeartButtonProps {
	listingId: string;
	currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ listingId, currentUser }) => {
	const hasFavorited = true;
	const toggleFavorite = () => {};

	return (
		<div className="relative hover:opacity-80 transition cursor-pointer">
			<AiOutlineHeart size={28} className="fill-white absolute -top-[2px] -right-[2px]" />
			<AiFillHeart size={24} className={hasFavorited ? 'fill-rose-500' : 'fill-neutral-500/70'} />
		</div> 
	);
};

export default HeartButton;
