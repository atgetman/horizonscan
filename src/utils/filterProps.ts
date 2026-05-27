/**
 * Centralized utility for filtering out internal props that shouldn't be passed to DOM elements.
 * 
 * USE THIS WHEN:
 * - Creating wrapper components around third-party primitives (Radix UI, Headless UI, etc.)
 * - Forwarding props with {...props} to DOM elements
 * - You see React warnings about unrecognized props on DOM elements
 * 
 * FILTERS OUT:
 * - Figma inspector props (_fgT, _fgS, _fgB, _fgt, _fgs, _fgb, etc.)
 * - Any other internal tracking props that start with _fg (case-insensitive)
 * 
 * PATTERN FOR NEW UI COMPONENTS:
 * ```typescript
 * import { withoutInternalProps } from '@/utils/filterProps';
 * 
 * function MyWrapper(props: ComponentProps<typeof Primitive>) {
 *   return <Primitive {...withoutInternalProps(props)} />;
 * }
 * ```
 * 
 * UPDATED COMPONENTS (as of implementation):
 * - dropdown-menu.tsx ✅
 * - dialog.tsx ✅
 * - sheet.tsx ✅
 * 
 * @example
 * ```typescript
 * function Button(props: ComponentProps<'button'>) {
 *   return <button {...withoutInternalProps(props)} />;
 * }
 * ```
 */
export function withoutInternalProps<T extends Record<string, any>>(props: T): T {
  // Fast path: if no _fg props, return as-is
  const keys = Object.keys(props);
  const hasFigmaProps = keys.some(key => key.toLowerCase().startsWith('_fg'));
  
  if (!hasFigmaProps) {
    return props;
  }
  
  // Filter out Figma props
  const filtered = {} as T;
  for (const key of keys) {
    if (!key.toLowerCase().startsWith('_fg')) {
      (filtered as any)[key] = props[key];
    }
  }
  
  return filtered;
}

/**
 * Alias for better semantics in some contexts
 */
export const cleanProps = withoutInternalProps;