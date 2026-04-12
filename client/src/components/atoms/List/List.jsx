function List({ children, className, ...props }) {
  return (
    <ul className={className} {...props}>
      {children}
    </ul>
  )
}

export default List