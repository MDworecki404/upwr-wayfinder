/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*/startConfig.json' {
  const value: {
    app: {
      name: string;
      version: string;
      description: string;
      author: string;
      license: string;
    };
    camera: {
      defaultPosition: {
        longitude: number;
        latitude: number;
        height: number;
      };
      defaultHeading: number;
      defaultPitch: number;
      defaultRoll: number;
    };
  };
  export default value;
}
