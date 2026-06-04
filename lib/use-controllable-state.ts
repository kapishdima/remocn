import * as React from "react";

type UseControllableStateParams<T> = {
  /** Controlled value. When defined, the hook operates in controlled mode. */
  prop?: T | undefined;
  /** Initial value used in uncontrolled mode. */
  defaultProp?: T | undefined;
  /** Called whenever the value changes (in either mode). */
  onChange?: (state: T) => void;
};

type SetStateFn<T> = (prev: T | undefined) => T;

/**
 * Radix-style controllable state: behaves as a controlled value when `prop` is
 * provided, otherwise manages its own state seeded from `defaultProp`. Accepts
 * both a plain next value and an updater function, and only fires `onChange`
 * when the value actually changes.
 *
 * `setValue` is referentially stable (empty deps) — it reads the latest `prop`
 * and `onChange` through refs so consumers can safely list it in their own
 * `useCallback`/`useEffect` deps without invalidating them on every render.
 */
export function useControllableState<T>({
  prop,
  defaultProp,
  onChange = () => {},
}: UseControllableStateParams<T>) {
  const [uncontrolledProp, setUncontrolledProp] = React.useState(defaultProp);
  const isControlled = prop !== undefined;
  const value = isControlled ? prop : uncontrolledProp;

  const onChangeRef = React.useRef(onChange);
  const propRef = React.useRef(prop);
  React.useEffect(() => {
    onChangeRef.current = onChange;
    propRef.current = prop;
  });

  const setValue = React.useCallback((next: T | SetStateFn<T>) => {
    const currentProp = propRef.current;
    if (currentProp !== undefined) {
      // Controlled: derive the next value and bubble it up; the parent owns it.
      const nextValue =
        typeof next === "function"
          ? (next as SetStateFn<T>)(currentProp)
          : next;
      if (nextValue !== currentProp) onChangeRef.current?.(nextValue);
    } else {
      setUncontrolledProp((prev) => {
        const nextValue =
          typeof next === "function" ? (next as SetStateFn<T>)(prev) : next;
        if (nextValue !== prev) onChangeRef.current?.(nextValue);
        return nextValue;
      });
    }
  }, []);

  return [value, setValue] as const;
}
