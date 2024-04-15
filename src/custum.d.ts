// custom.d.ts
declare module "*.jpeg" {
  const value: any;
  export default value;
}

// Extending the global ImportMeta interface for Vite environment variables
interface ImportMetaEnv {
  readonly VITE_REACT_APP_SERVICE_ID: string;
  readonly VITE_REACT_APP_TEMPLATE_ID: string;
  readonly VITE_REACT_APP_EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
