export default function Layout({
    children,
    comments,
  }: {
    children: React.ReactNode
    comments: React.ReactNode
  }) {
    return (
      <>
        {children}
        {comments}
      </>
    )
  }