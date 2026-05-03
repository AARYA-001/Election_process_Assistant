export function createLoadingSpinner(size: 'sm' | 'md' | 'lg' = 'md'): HTMLElement {
  const spinner = document.createElement('div');
  spinner.className = `loading-spinner loading-spinner--${size}`;
  spinner.setAttribute('role', 'status');
  spinner.setAttribute('aria-label', 'Loading');
  spinner.innerHTML = `
    <div class="loading-spinner__ring"></div>
    <div class="loading-spinner__ring"></div>
    <div class="loading-spinner__ring"></div>
  `;
  return spinner;
}

export function createSkeletonLoader(lines: number = 3): HTMLElement {
  const skeleton = document.createElement('div');
  skeleton.className = 'skeleton-loader';
  skeleton.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < lines; i++) {
    const line = document.createElement('div');
    line.className = 'skeleton-loader__line';
    line.style.width = `${60 + Math.random() * 40}%`;
    line.style.animationDelay = `${i * 0.15}s`;
    skeleton.appendChild(line);
  }
  return skeleton;
}
