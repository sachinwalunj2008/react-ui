import { isEmpty } from 'lodash'
import type { TitleProps } from './model'

export const labelStyle = (
  title?: TitleProps
): React.CSSProperties | undefined => {
  if (!isEmpty(title)) {
    return {
      fontWeight: title?.bold ? 'bold' : '',
      fontSize: '12px',
      fill: 'var(--dark-purple)',
    }
  }
}
