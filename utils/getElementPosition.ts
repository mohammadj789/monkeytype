export function getElementPositionInContainer(
  element: HTMLElement,
  container: HTMLElement,
  after: boolean
): { x: number; y: number } {
  if (!element || !container) {
    throw new Error(
      "Both element and container must be valid HTMLElements"
    );
  }

  // Get bounding rectangles for both the element and the container
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Calculate the position of the element relative to the container
  const x =
    elementRect.left -
    containerRect.left +
    (after ? elementRect.width : 0);
  // + elementRect.width;
  const y = elementRect.top - containerRect.top;

  return { x, y };
}
