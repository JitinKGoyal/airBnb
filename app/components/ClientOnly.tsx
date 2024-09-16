'use client';

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
	children: React.ReactNode;
}

// for hideration error that sometimes it handle it as server side
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return null;
	}

	return <>{children}</>;
};

export default ClientOnly;
