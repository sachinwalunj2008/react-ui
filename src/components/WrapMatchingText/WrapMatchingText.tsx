import React from 'react'

const WrapMatchingText = ({
  text,
  match,
  wrapper,
  customClass,
}: WrapMatchingTextProps): JSX.Element => {
  const Wrapper = wrapper ? wrapper : DefaultWrapper,
    split = text.split(match)
  return (
    <>
      {split
        .map((val, index) => {
          if (!index) {
            return val ? (
              <span key={index} className={customClass}>
                {val}
              </span>
            ) : null
          }
          return (
            <span key={index} className={customClass}>
              {/* seems weird to print out a regex... It doesn't look like anyone has used match as a regex yet. I'm sure, once they do, they'll need to update this */}
              {/* @ts-expect-error React 18 issue? */}
              <Wrapper>{match}</Wrapper>
              {val && <span>{val}</span>}
            </span>
          )
        })
        .filter(Boolean)}
    </>
  )
}

type WrapMatchingTextProps = {
  text: string
  match: string | RegExp
  wrapper?: React.ComponentType
  customClass?: string
}

const DefaultWrapper: React.FC = ({ children }) => {
  return <strong>{children}</strong>
}

export default WrapMatchingText
