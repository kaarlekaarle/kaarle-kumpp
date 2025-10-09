'use client';

import { useRouter } from 'next/navigation';

type ClientItem = { slug: string; name: string };

export default function MobileClientList({
	clients,
	currentClientSlug,
}: {
	clients: ClientItem[];
	currentClientSlug?: string;
}) {
	const router = useRouter();

	return (
		<div
			data-id="mobile-clients"
			style={{
				width: '100%',
				paddingRight: '1.5rem',
				marginBottom: '2.5rem',
				textAlign: 'center',
			}}
		>
			<div
				style={{
					display: 'inline-block',
					textAlign: 'left',
					height: `${clients.length * 1.4}rem`,
					position: 'relative',
				}}
			>
				{clients.map((client, index) => {
					const isCurrentClient = client.slug === currentClientSlug;
					const opacity = isCurrentClient ? 1 : 0.25;
					return (
						<div
							key={client.slug}
							onClick={() => router.push(`/works/${client.slug}`)}
							style={{
								fontFamily: 'var(--font-sans)',
								fontSize: 'var(--fs-right)',
								fontWeight: '400',
								lineHeight: '1.2',
								textTransform: 'uppercase',
								letterSpacing: '.04em',
								cursor: 'pointer',
								opacity: opacity,
								transition: 'opacity 0.3s ease',
								color: '#0000EE',
								position: 'absolute',
								top: `${index * 1.4}rem`,
								left: 0,
								whiteSpace: 'nowrap',
							}}
						>
							{client.name}
						</div>
					);
				})}
			</div>
		</div>
	);
}


