export const gapClassnames = ({ gx, gy, g }: GapProps) => {
  const gapXClassname = gx ? `gap-x-${gx}` : ''
  const gapYClassname = gy ? `gap-y-${gy}` : ''
  const gapClassname = g ? `gap-${g}` : ''
  return `${gapXClassname} ${gapYClassname} ${gapClassname}`
}

export const marginClassnames = ({ m, mx, my, mt, mb, ml, mr }: MarginProps) => {
  const mClassname = m ? `m-${m}` : ''
  const mxClassname = mx ? `mx-${mx}` : ''
  const myClassname = my ? `my-${my}` : ''
  const mtClassname = mt ? `mt-${mt}` : ''
  const mbClassname = mb ? `mb-${mb}` : ''
  const mlClassname = ml ? `ml-${ml}` : ''
  const mrClassname = mr ? `mr-${mr}` : ''
  return `${mClassname} ${mxClassname} ${myClassname} ${mtClassname} ${mbClassname} ${mlClassname} ${mrClassname}`
}

export const paddingClassnames = ({ p, px, py, pt, pb, pl, pr }: PaddingProps) => {
  const pClassname = p ? `p-${p}` : ''
  const pxClassname = px ? `px-${px}` : ''
  const pyClassname = py ? `py-${py}` : ''
  const ptClassname = pt ? `pt-${pt}` : ''
  const pbClassname = pb ? `pb-${pb}` : ''
  const plClassname = pl ? `pl-${pl}` : ''
  const prClassname = pr ? `pr-${pr}` : ''
  return `${pClassname} ${pxClassname} ${pyClassname} ${ptClassname} ${pbClassname} ${plClassname} ${prClassname}`
}
