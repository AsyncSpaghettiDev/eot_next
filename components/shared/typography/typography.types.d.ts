interface TypographyProps extends PaddingProps, MarginProps, SizeProps, BaseSharedProps, FontProps, StyleProps, ColorProps {
    weight?: 'light' | 'normal' | 'semibold' | 'bold'

    decoration?: 'underline' | 'overline' | 'line-through'
    transform?: 'uppercase' | 'lowercase' | 'capitalize'

    display?: 'block' | 'inline' | 'inline-block'
    align?: 'left' | 'center' | 'right' | 'justify'

    onClick?: (e: MouseEvent<HTMLElement>) => void
}

interface TitleProps extends TypographyProps {
    order?: 1 | 2 | 3 | 4 | 5 | 6
}

interface TextProps extends TypographyProps {
    breaks?: 'normal' | 'words' | 'all'
}