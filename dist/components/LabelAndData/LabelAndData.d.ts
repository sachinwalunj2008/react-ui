import React from 'react';
export type LabelAndDataProps = {
    /** Content to show as label. */
    label: React.ReactNode;
    /** Boolean to decide whether to show data. */
    check: boolean;
    /** Optional children element can be added */
    children?: React.ReactNode;
    /** Optional class for data. */
    customClass?: string;
    /** Optional class for label. */
    labelClass?: string;
    /** Content to show in data. */
    data: React.ReactNode;
};
export default function LabelAndData({ label, data, check, children, customClass, labelClass, }: LabelAndDataProps): JSX.Element;
