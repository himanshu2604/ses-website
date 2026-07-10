## 2025-05-14 - Optimized Workflow scroll tracking

**Learning:** Using React state for high-frequency events like scrolling can cause significant main-thread overhead due to constant re-renders. Moving this state to a CSS variable and updating it directly on the DOM element allows for smoother performance. Additionally, using an IntersectionObserver to toggle event listeners ensures that the main thread isn't burdened by scroll events when the relevant section isn't in view.
**Action:** Always prefer CSS variables and direct DOM manipulation for high-frequency UI updates like scroll-driven animations. Use IntersectionObserver to gate event listeners.
