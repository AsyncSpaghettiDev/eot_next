interface GapProps {
    gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    gapX?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    gapY?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

interface PaddingProps {
    p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
}

interface MarginProps {
    m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
    my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'auto'
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