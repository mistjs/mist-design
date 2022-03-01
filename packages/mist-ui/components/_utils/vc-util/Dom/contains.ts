export default function contains(root: HTMLElement | null | undefined, n?: HTMLElement) {
  if (!root) {
    return false;
  }

  // @ts-ignore
  return root.contains(n);
}
