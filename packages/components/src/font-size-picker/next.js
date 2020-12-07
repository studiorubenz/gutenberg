/**
 * External dependencies
 */
import { FontSizeControl } from '@wp-g2/components';

/**
 * Internal dependencies
 */
import { withNext } from '../__next/context';

export function withNextComponent( current ) {
	return withNext( current, FontSizeControl, 'WPComponentsFontSizePicker' );
}
