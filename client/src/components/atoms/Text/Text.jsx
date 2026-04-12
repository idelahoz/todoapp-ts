function Text({ children, className, style, ...props }) {
  return (
    <span className={className} style={style} {...props}>
      {children}
    </span>
  )
}

export default Text