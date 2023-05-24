import React from 'react';
import { Heading1, WrapMatchingText } from '../../module';
declare function AutocompleteOption({ onClick, isSelected, text, searchText, className, }: AutocompleteOptionProps): JSX.Element;
type WrapMatchingTextProps = React.ComponentProps<typeof WrapMatchingText>;
type AutocompleteOptionProps = {
    /** Function to be called onClick */
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    /** Text to display for the option */
    text: React.ComponentProps<typeof Heading1>['text'] | WrapMatchingTextProps['text'];
    /**
     * Passed through to WrapMatchingText component's 'match' prop
     */
    searchText: WrapMatchingTextProps['match'];
    /** Determines active state of the option */
    isSelected?: boolean;
    /** Optional className for the option */
    className?: string;
};
export default AutocompleteOption;
