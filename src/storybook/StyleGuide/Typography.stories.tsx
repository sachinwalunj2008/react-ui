import { Typeset } from '@storybook/addon-docs'
import { ComponentMeta } from '@storybook/react'

export default {
  title: 'Style Guide/Typography',
  component: Typeset,
} as ComponentMeta<typeof Typeset>

export const Typography = (): JSX.Element => {
  const typography = {
    type: {
      primary: '"Montserrat", sans-serif',
    },
    weight: {
      light: 300,
      regular: 400,
      lightbold: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    size: {
      s1: '10px',
      s2: '12px',
      s3: '14px',
      s4: '16px',
      s5: '18px',
      s6: '21px',
      s7: '24px',
      s8: '32px',
    },
  }
  return (
    <>
      <p>Font-family: 'Montserrat, sans-serif'</p>
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.light}
        sampleText='Pattern Light Font Weight'
        fontFamily={typography.type.primary}
      />
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.regular}
        sampleText='Pattern Regular Font Weight'
        fontFamily={typography.type.primary}
      />
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.lightbold}
        sampleText='Pattern Light Bold Font Weight'
        fontFamily={typography.type.primary}
      />
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.semibold}
        sampleText='Pattern Semibold Font Weight'
        fontFamily={typography.type.primary}
      />
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.bold}
        sampleText='Pattern Bold Font Weight'
        fontFamily={typography.type.primary}
      />
      <Typeset
        fontSizes={[
          typography.size.s1,
          typography.size.s2,
          typography.size.s3,
          typography.size.s4,
          typography.size.s5,
          typography.size.s6,
          typography.size.s7,
          typography.size.s8,
        ]}
        fontWeight={typography.weight.extrabold}
        sampleText='Pattern Extra Bold Font Weight'
        fontFamily={typography.type.primary}
      />
    </>
  )
}
Typography.parameters = {
  previewTabs: {
    canvas: {
      hidden: true,
    },
  },
  viewMode: 'docs',
}
