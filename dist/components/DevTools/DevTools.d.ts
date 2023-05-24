import * as React from 'react';
type CalloutType = React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
type DevToolsProps = {
    backendNames: string[];
    rerenderCallout: CalloutType;
};
export declare function DevTools({ backendNames, rerenderCallout, }: DevToolsProps): JSX.Element | null;
export {};
