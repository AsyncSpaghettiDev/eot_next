/* eslint-disable no-unused-vars */
interface ContainerProps extends PaddingProps, MarginProps, BaseSharedProps, RoundedProps, StyleProps, BgProps {
  textAlign?: 'right' | 'left' | 'center' | 'justify'

  as?: 'div' | 'section' | 'article' | 'main' | 'aside' | 'header' | 'footer' | 'nav' | 'figure' | 'figcaption' | 'address' | 'time' | 'mark' | 'blockquote' | 'ol' | 'ul' | 'li' | 'dl' | 'dt' | 'dd' | 'table' | 'caption' | 'thead' | 'tbody' | 'tfoot' | 'tr' | 'th' | 'td' | 'hr' | 'pre' | 'code' | 'em' | 'strong' | 'small' | 's' | 'cite' | 'q' | 'dfn' | 'abbr' | 'ruby' | 'rt' | 'rp' | 'data' | 'time' | 'var' | 'samp' | 'kbd' | 'sub' | 'sup' | 'i' | 'b' | 'u' | 'span' | 'bdi' | 'bdo' | 'br' | 'wbr' | 'ins' | 'del' | 'img' | 'iframe' | 'embed' | 'object' | 'param' | 'video' | 'audio' | 'source' | 'track' | 'canvas' | 'map' | 'area' | 'svg' | 'math' | 'a' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  onClick?: (e: MouseEvent<HTMLElement>) => void
}

interface JustifyContentProps {
  justify?: 'start' | 'end' | 'center' | 'between' | 'around'
}

interface AlignItemsProps {
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
}

interface TableProps extends MarginProps, BaseSharedProps, StyleProps, RoundedProps {
  headers?: string[]
}

interface FlexProps extends ContainerProps, GapProps, JustifyContentProps, AlignItemsProps {
  wrap?: boolean
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
}

interface CardProps extends FlexProps {
  hoverable?: boolean
}

interface GridProps extends ContainerProps, GapProps, JustifyContentProps, AlignItemsProps {
  placeItems?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
  placeContent?: 'start' | 'end' | 'center' | 'stretch' | 'between' | 'around' | 'evenly'
}
