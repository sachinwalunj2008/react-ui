import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DocsTemplate } from '../../../../.storybook'
import BubbleChart from './BubbleChart'
import WinnabilityTooltip, { WinnabilityLegend } from './WinnabilityTooltip'
import type { BubbleData } from './model'

const BKG_COLORS = {
  green: 'var(--chart-dark-1-green)',
  yellow: 'var(--chart-light-5-yellow)',
  red: 'var(--chart-light-5-red)',
}
const BUBBLE_COLORS = {
  green: 'var(--chart-dark-1-green)',
  yellow: 'var(--chart-dark-1-yellow)',
  red: 'var(--chart-dark-2-red)',
}

export default {
  title: '[WIP]/BubbleChart',
  component: BubbleChart,
  parameters: {
    docs: {
      page: () => <DocsTemplate wip />,
    },
  },
} as ComponentMeta<typeof BubbleChart>

const Template: ComponentStory<typeof BubbleChart> = (args) => (
  <div style={{ width: 800, height: 400 }}>
    <BubbleChart {...args} />
  </div>
)

export const Default = Template.bind({})
const defaultData: BubbleData[] = [
  {
    name: 'Point 1',
    x: 0,
    y: 0,
    z: 10,
    bubbleSize: 1,
    color: BUBBLE_COLORS.green,
  },
  {
    name: 'Point 2',
    x: -20,
    y: 10,
    z: 20,
    bubbleSize: 2,
    color: BUBBLE_COLORS.yellow,
  },
  {
    name: 'Point 3',
    x: 10,
    y: -20,
    z: 30,
    bubbleSize: 3,
    color: BUBBLE_COLORS.red,
  },
  {
    name: 'Point 4',
    x: 20,
    y: 0,
    z: 40,
    bubbleSize: 4,
    color: BUBBLE_COLORS.green,
  },
  {
    name: 'Point 5',
    x: -15,
    y: -10,
    z: 50,
    bubbleSize: 5,
    color: BUBBLE_COLORS.yellow,
  },
  {
    name: 'Point 6',
    x: 10,
    y: -10,
    z: 60,
    bubbleSize: 6,
    color: BUBBLE_COLORS.red,
  },
  {
    name: 'Point 7 with a category name that is going to be a bit longer than 60 characters so that it has to be truncated',
    x: -5,
    y: 25,
    z: 50,
    bubbleSize: 5,
    color: BUBBLE_COLORS.green,
  },
  {
    name: 'Point 8',
    x: 12,
    y: 17,
    z: 40,
    bubbleSize: 4,
    color: BUBBLE_COLORS.yellow,
  },
  {
    name: 'Point 9 with a long name for demo purposes',
    x: 5,
    y: -5,
    z: 50,
    bubbleSize: 5,
    color: BUBBLE_COLORS.red,
  },
  {
    name: 'Point 10',
    x: 5,
    y: 30,
    z: 10,
    bubbleSize: 1,
    color: BUBBLE_COLORS.green,
  },
]

Default.args = {
  chart: {
    title: { text: 'Chart Title' },
    leftTitle: { text: 'Left Title (bold)', bold: true },
    rightTitle: { text: 'Right Title' },
    bottomTitle: { text: 'Bottom Title', bold: true },
  },
  data: defaultData,
  quadrantColors: ['red', 'green', 'yellow'],
  subTitle: {
    topLeft: { text: 'Top Left {quadrant color: red}' },
    topRight: { text: 'Top Right {quadrant color: green}', bold: true },
    bottomLeft: { text: 'Bottom Left {quadrant color: none}' },
    bottomRight: {
      text: 'Bottom Right {quadrant color: yellow}',
      bold: true,
    },
  },
  xAxis: {
    ref: {
      text: 'Reference X',
      value: -2,
    },
  },
  yAxis: { ref: { text: 'Reference Y', value: 10 } },
}

export const Bubble = Template.bind({})
const data = [
  { name: 'Multivitamins', x: 0.34, y: 5375000, z: 400 },
  { name: 'Medicinal Sleep Aid', x: 0.21, y: 2650000, z: 200 },
  {
    name: 'Blended Vitamins & Mineral Supplements',
    x: 0.41,
    y: 2150000,
    z: 400,
  },
  { name: 'Probiotic Nutritional Supplements', x: 0.185, y: 1900000, z: 400 },
  { name: 'Vitamin D Supplements', x: 0.16, y: 2000000, z: 100 },
  { name: 'Vitamin Supplements', x: 0.115, y: -250000, z: 300 },
  { name: 'Tumeric Herbal', x: 0.325, y: -250000, z: 200 },
  { name: 'Other Yellow 1', x: 0.55, y: 0, z: 100 },
  { name: 'Other Yellow 2', x: 0.45, y: 100000, z: 5 },
  { name: 'Other Yellow 3', x: 0.405, y: -750000, z: 100 },
  { name: 'Other Yellow 4', x: 0.395, y: -25000, z: 5 },
  { name: 'Other Yellow 5', x: 0.375, y: -75000, z: 5 },
  { name: 'Other Yellow 6', x: 0.375, y: 1000000, z: 50 },
  { name: 'Other Yellow 7', x: 0.355, y: -500000, z: 25 },
  { name: 'Other Yellow 7', x: 0.35, y: -250000, z: 10 },
  { name: 'Other Yellow 7', x: 0.35, y: 250000, z: 75 },
  { name: 'Other Red 1', x: 0.06, y: -300000, z: 75 },
  { name: 'Other Red 2', x: 0.11, y: 1625000, z: 50 },
  { name: 'Other Red 3', x: 0.12, y: -275000, z: 23 },
  { name: 'Other Red 4', x: 0.23, y: -1000000, z: 50 },
  { name: 'Other Red 5', x: 0.24, y: -200000, z: 25 },
  { name: 'Other Red 6', x: 0.25, y: 800000, z: 10 },
  { name: 'Other Red 7', x: 0.275, y: 750000, z: 50 },
].map((data) => ({
  ...data,
  bubbleSize: Number(data?.z) ? Math.floor(Math.log(Number(data?.z))) : 0,
  color:
    data.x > 0.3 && data.y > 2000000
      ? BUBBLE_COLORS['green']
      : data.x < 0.3 && data.y < 2000000
      ? BUBBLE_COLORS['red']
      : BUBBLE_COLORS['yellow'],
}))

Bubble.args = {
  chart: {
    width: 1000,
    height: 600,
    title: { text: 'WINNABILITY' },
    leftTitle: { text: 'MARKET ATTRACTIVENESS' },
  },
  data,
  quadrantColors: [
    BKG_COLORS.yellow,
    BKG_COLORS.green,
    BKG_COLORS.yellow,
    BKG_COLORS.red,
  ],
  subTitle: {
    topLeft: {
      text: 'Attractive but hard to win: Develop Capabilities',
      bold: true,
    },
    bottomLeft: {
      text: 'Hard to Win and Slow Growing: Deprioritize',
      bold: true,
    },
    topRight: {
      text: 'Highest Area of Opportunity',
      bold: true,
    },
    bottomRight: {
      text: 'Winnable but Less Attractive',
      bold: true,
    },
  },
  xAxis: { ref: { value: 0.3 }, tickFixed: 1 },
  yAxis: { ref: { value: 2000000 }, display: 'right' },
}

export const Bubble2 = Template.bind({})
const data2 = [
  { name: 'Facial Oils', x: -2.47, y: -727382, z: 100, color: 'red' },
  { name: 'Facial Peels', x: -0.62, y: -527000, z: 50, color: 'yellow' },
  {
    name: 'Facial Moisturizers',
    x: -0.185,
    y: 27151834,
    z: 400,
    color: 'green',
  },
  {
    name: 'Facial Cleansing Washes',
    x: 0.005,
    y: 16771779,
    z: 300,
    color: 'violet',
  },
  {
    name: 'Lash Enhancers & Primers',
    x: 0.165,
    y: 560000,
    z: 100,
    color: 'orange',
  },
  { name: 'Facial Scrubs', x: 0.08, y: 1250000, z: 5, color: 'skyblue' },
  { name: 'Facial Serums', x: 0.28, y: 27651442, z: 300, color: 'pink' },
  {
    name: 'Facial Night Creams',
    x: 0.31,
    y: 3325000,
    z: 100,
    color: 'yellowgreen',
  },
  {
    name: 'Hair Regrowth Treatments',
    x: 0.61,
    y: 6977806,
    z: 200,
    color: 'mauve',
  },
  {
    name: 'Zero Point',
    x: 0,
    y: 0,
    z: 50,
    color: 'blue',
  },
  {
    name: 'Center Axis Large',
    x: -0.05,
    y: 7500000,
    z: 300,
    color: 'seagreen',
  },
  {
    name: 'Center Axis Small',
    x: -0.05,
    y: 7500000,
    z: 50,
    color: 'goldenrod',
  },
].map((d) => ({
  ...d,
  bubbleSize: Number(d?.z) ? Math.floor(Math.log(Number(d?.z))) : 0,
}))

Bubble2.args = {
  data: data2,
  chart: {
    width: 1200,
    height: 400,
  },
  numOfYTicks: 11,
  xAxis: { ticks: 20, ref: { value: -0.05 }, tickFixed: 1 },
  yAxis: { ref: { text: 'Average', value: 7500000 } },
}

export const WithLegend = Template.bind({})
const data3 = [
  {
    name: '"Manual Toothbrushes"',
    x: 0.026412041693812366,
    y: 8657920,
    z: 79535019,
    color: BUBBLE_COLORS['yellow'],
    bubbleSize: 2,
    incrementalGrowth: 0.1088567057370384,
  },
  {
    name: '"Replacement Toothbrush Heads"',
    x: -0.5531183463153974,
    y: 5967530,
    z: 177962855,
    color: BUBBLE_COLORS['red'],
    bubbleSize: 3,
    incrementalGrowth: 0.033532449146406865,
  },
  {
    name: 'Denture Brushes',
    x: 0.6652196590994979,
    y: 4779534,
    z: 3343612,
    color: BUBBLE_COLORS['yellow'],
    bubbleSize: 1,
    incrementalGrowth: 1.4294522931384228,
  },
  {
    name: 'Sonic Toothbrushes',
    x: -0.13851335447791108,
    y: 2033075,
    z: 68159985,
    color: BUBBLE_COLORS['red'],
    bubbleSize: 2,
    incrementalGrowth: 0.02982797941056584,
  },
].map((d) => ({
  ...d,
  bubbleSize: Number(d?.z) ? Math.floor(Math.log(Number(d?.z))) : 0,
}))
WithLegend.args = {
  CustomTooltip: WinnabilityTooltip,
  data: data3,
  xAxis: { ref: { value: 0 }, tickFixed: 2 },
  yAxis: { ref: { value: 10000000 } },
  quadrantColors: [
    BKG_COLORS.yellow,
    BKG_COLORS.green,
    BKG_COLORS.yellow,
    BKG_COLORS.red,
  ],
  legend: WinnabilityLegend,
}

export const NoData = Template.bind({})
NoData.args = {}
