/**
 * Internal dependencies
 */
import { contextConnect, useContextSystem } from './context-system';

export function withNext(
	CurrentComponent = () => null,
	NextComponent = () => null,
	namespace = 'Component',
	adapter = ( p ) => p
) {
	const WrappedComponent = ( props, ref ) => {
		const { __unstableVersion, ...otherProps } = useContextSystem(
			props,
			namespace
		);

		if ( __unstableVersion === 'next' ) {
			const nextProps = adapter( otherProps );
			return <NextComponent { ...nextProps } ref={ ref } />;
		}

		return <CurrentComponent { ...props } ref={ ref } />;
	};

	return contextConnect( WrappedComponent, namespace );
}
