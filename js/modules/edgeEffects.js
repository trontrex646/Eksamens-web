const EDGE_THRESHOLD = 100; // pixels from edge to trigger effect

export function initEdgeEffects() {
  const leftEdge = document.querySelector('.edge-effect.left');
  const rightEdge = document.querySelector('.edge-effect.right');
  
  if (!leftEdge || !rightEdge) return;
  
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientWidth } = getMousePosition(e);
    
    // Left edge effect
    if (clientX < EDGE_THRESHOLD) {
      const opacity = 1 - (clientX / EDGE_THRESHOLD);
      leftEdge.style.opacity = opacity.toString();
      leftEdge.style.width = `${EDGE_THRESHOLD}px`;
    } else {
      leftEdge.style.opacity = '0';
    }
    
    // Right edge effect
    if (clientX > clientWidth - EDGE_THRESHOLD) {
      const opacity = 1 - ((clientWidth - clientX) / EDGE_THRESHOLD);
      rightEdge.style.opacity = opacity.toString();
      rightEdge.style.width = `${EDGE_THRESHOLD}px`;
    } else {
      rightEdge.style.opacity = '0';
    }
  });
}

function getMousePosition(e) {
  return {
    clientX: e.clientX,
    clientWidth: document.documentElement.clientWidth
  };
} 