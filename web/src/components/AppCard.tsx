import { Card, CardContent } from '@mui/material'

interface Props {
  children: React.ReactNode
}

export const AppCard: React.VFC<Props> = ({ children }) => {
  return (
    <Card elevation={2} style={{ borderRadius: 8 }}>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
