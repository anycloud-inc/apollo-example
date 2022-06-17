import { Alert } from '@mui/material'

interface Props {
  children?: React.ReactNode
}

export const AppAlert: React.VFC<Props> = ({ children }) => {
  return <Alert severity="error">{children ?? 'Unexpected Error'}</Alert>
}
