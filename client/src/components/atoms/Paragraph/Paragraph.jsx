function Paragraph({ children, className, ...props }) {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  )
}

export default Paragraph