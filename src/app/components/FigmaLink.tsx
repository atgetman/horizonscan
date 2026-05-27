import { Link, LinkProps } from 'react-router';
import { forwardRef } from 'react';

/**
 * A wrapper around react-router's Link that filters out Figma inspector props
 * to prevent React warnings about unrecognized DOM attributes.
 */
export const FigmaLink = forwardRef<HTMLAnchorElement, LinkProps & Record<string, any>>(
  (props, ref) => {
    // Filter out Figma inspector props
    const { _fgT, _fgS, _fgB, _fgt, _fgs, _fgb, ...cleanProps } = props;
    
    return <Link ref={ref} {...cleanProps} />;
  }
);

FigmaLink.displayName = 'FigmaLink';
