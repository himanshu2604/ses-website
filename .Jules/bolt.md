## 2025-05-14 - Optimized Workflow scroll tracking

**Learning:** Using React state for high-frequency events like scrolling can cause significant main-thread overhead due to constant re-renders. Moving this state to a CSS variable and updating it directly on the DOM element allows for smoother performance. Additionally, using an IntersectionObserver to toggle event listeners ensures that the main thread isn't burdened by scroll events when the relevant section isn't in view.
**Action:** Always prefer CSS variables and direct DOM manipulation for high-frequency UI updates like scroll-driven animations. Use IntersectionObserver to gate event listeners.

## 2025-05-21 - Robust Direct DOM Animation

**Learning:** When using direct DOM manipulation (e.g., `node.textContent`) to optimize animations and bypass React re-renders, it's critical to also maintain the current value in a `useRef`. Otherwise, if the component re-renders via its parent, React's reconciliation will overwrite the manually updated DOM with the stale value from the VDOM (often "0" or an initial state).
**Action:** When bypassing React state for animations, always store the "truth" in a ref and render that ref in the JSX to ensure persistence across re-renders.
