import { ReactNode } from 'react';

// Interface para el encabezado de la solicitud
interface HeadersConfig {
  Authorization: string;
}

// Interface para la configuración de solicitud
interface RequestConfig {
  headers: HeadersConfig;
}

// Interface para la función de manejo de solicitud
interface RequestHandler {
  use: (
    arg0: (config: RequestConfig) => Promise<RequestConfig>,
    arg1: (err: any) => Promise<never>
  ) => void;
}

// Interface para los interceptores de solicitud
interface RequestInterceptors {
  request: RequestHandler;
}

// Interface principal que combina los interceptores y las configuraciones por defecto
export interface AxiosDefaults {
  headers: { Accept: string };
  interceptors: RequestInterceptors;
}

export type WithChildren = {
  children?: ReactNode;
};
