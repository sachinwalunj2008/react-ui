import React from 'react';
export interface Toggle {
    application: string;
    enabled: boolean;
    key: string;
    name: string;
}
interface ToggleProviderContextValue {
    toggles: Toggle[] | undefined;
}
export declare const ToggleProviderContext: React.Context<ToggleProviderContextValue>;
interface ToggleProviderProps {
    children: React.ReactNode;
    distributionKey: string;
    environment: 'development' | 'staging' | 'production';
    errorCallback?: (error: string | Record<string, unknown>) => void;
    finishedLoadingCallback?: (isLoaded: boolean) => void;
}
declare const ToggleProvider: ({ children, distributionKey, environment, errorCallback, finishedLoadingCallback, }: ToggleProviderProps) => JSX.Element;
export default ToggleProvider;
