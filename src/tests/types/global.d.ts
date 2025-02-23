interface Window {
  MathJax: {
    typesetPromise: () => Promise<void>;
    [key: string]: any;
  };
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
} 