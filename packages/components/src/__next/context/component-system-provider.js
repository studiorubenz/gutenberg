/**
 * External dependencies
 */
import { ContextSystemProvider } from '@wp-g2/components';

export function ComponentSystemProvider( {
	__unstableNextInclude = [],
	children,
	value = {},
} ) {
	const contextValue = { ...value };

	__unstableNextInclude.forEach( ( namespace ) => {
		const baseValue = contextValue[ namespace ] || {};
		contextValue[ namespace ] = { ...baseValue, __unstableVersion: 'next' };
	} );

	return (
		<ContextSystemProvider value={ contextValue }>
			{ children }
		</ContextSystemProvider>
	);
}
