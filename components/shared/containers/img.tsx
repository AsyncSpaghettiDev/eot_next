import Image from 'next/image'

export const Img = ({ src, classic, alt, size }: ImgProps) => {
  // eslint-disable-next-line @next/next/no-img-element
  if (classic) { return <img src={src} alt={alt} /> }

  return (
    <Image src={src} alt={alt} width={size} height={size} />
  )
}
