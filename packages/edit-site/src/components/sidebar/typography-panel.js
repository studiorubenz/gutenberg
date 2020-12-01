/**
 * WordPress dependencies
 */
import {
	LineHeightControl,
	__experimentalFontFamilyControl as FontFamilyControl,
	__experimentalFontAppearanceControl as FontAppearanceControl,
} from '@wordpress/block-editor';
import { PanelBody, FontSizePicker } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useEditorFeature } from '../editor/utils';

export function useHasTypographyPanel( { supports, name } ) {
	const hasLineHeight = useHasLineHeightControl( { supports, name } );
	const hasFontAppearence = useHasAppearenceControl( { supports, name } );
	return (
		hasLineHeight || hasFontAppearence || supports.includes( 'fontSize' )
	);
}

function useHasLineHeightControl( { supports, name } ) {
	return (
		useEditorFeature( 'typography.customLineHeight', name ) &&
		supports.includes( 'lineHeight' )
	);
}

function useHasAppearenceControl( { supports, name } ) {
	const fontStyles = useEditorFeature( 'typography.fontStyles', name );
	const fontWeights = useEditorFeature( 'typography.fontWeights', name );
	return (
		( supports.includes( 'fontStyle' ) && !! fontStyles?.length ) ||
		( supports.includes( 'fontWeight' ) && !! fontWeights?.length )
	);
}

export default function TypographyPanel( {
	context: { supports, name },
	getStyle,
	setStyle,
} ) {
	const fontSizes = useEditorFeature( 'typography.fontSizes', name );
	const disableCustomFontSizes = ! useEditorFeature(
		'typography.customFontSize',
		name
	);
	const fontFamilies = useEditorFeature( 'typography.fontFamilies', name );
	const fontStyles = useEditorFeature( 'typography.fontStyles', name );
	const fontWeights = useEditorFeature( 'typography.fontWeights', name );
	const hasLineHeightEnabled = useHasLineHeightControl( { supports, name } );
	const hasAppearenceControl = useHasAppearenceControl( { supports, name } );
	const hasFontStyleSupport = supports.includes( 'fontStyle' );
	const hasFontWeightSupport = supports.includes( 'fontWeight' );

	return (
		<PanelBody title={ __( 'Typography' ) } initialOpen={ true }>
			{ supports.includes( 'fontFamily' ) && (
				<FontFamilyControl
					fontFamilies={ fontFamilies }
					value={ getStyle( name, 'fontFamily' ) }
					onChange={ ( value ) =>
						setStyle( name, 'fontFamily', value )
					}
				/>
			) }
			{ supports.includes( 'fontSize' ) && (
				<FontSizePicker
					value={ getStyle( name, 'fontSize' ) }
					onChange={ ( value ) =>
						setStyle( name, 'fontSize', value )
					}
					fontSizes={ fontSizes }
					disableCustomFontSizes={ disableCustomFontSizes }
				/>
			) }
			{ hasLineHeightEnabled && (
				<LineHeightControl
					value={ getStyle( name, 'lineHeight' ) }
					onChange={ ( value ) =>
						setStyle( name, 'lineHeight', value )
					}
				/>
			) }
			{ hasAppearenceControl && (
				<FontAppearanceControl
					value={ {
						fontStyle: getStyle( name, 'fontStyle' ),
						fontWeight: getStyle( name, 'fontWeight' ),
					} }
					options={ {
						fontStyles: hasFontStyleSupport
							? fontStyles
							: undefined,
						fontWeights: hasFontWeightSupport
							? fontWeights
							: undefined,
					} }
					onChange={ ( { fontStyle, fontWeight } ) => {
						setStyle( name, 'fontStyle', fontStyle );
						setStyle( name, 'fontWeight', fontWeight );
					} }
				/>
			) }
		</PanelBody>
	);
}
