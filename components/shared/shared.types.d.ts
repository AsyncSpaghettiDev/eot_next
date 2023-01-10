/* eslint-disable no-unused-vars */
interface GapProps {
  g?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  gx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  gy?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

interface PaddingProps {
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  pt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  pb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  pl?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  pr?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

interface MarginProps {
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  mt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  ml?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
  mr?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
}

interface RoundedProps {
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}

interface SizeProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'base'
}

interface BaseSharedProps {
  children?: React.ReactNode
  className?: string
  span?: boolean
  id?: string
}

interface FontProps {
  font?: 'primary' | 'secondary'
}

interface StyleProps {
  style?: React.CSSProperties
}

interface BgProps {
  bg?: 'brown' | 'lightbrown' | 'white'
}

interface ColorProps {
  color?: 'white' | 'black' | 'grey'
}
