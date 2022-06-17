import LoadingButton from '@mui/lab/LoadingButton'
import { MouseEventHandler, useState } from 'react'
import { useMounted } from '../utils/hooks/use-mounted'
import { isPromise } from '../utils/type-util'

interface Props {
  children: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const AppButton: React.VFC<Props> = ({ children, onClick }) => {
  const [loading, setLoading] = useState(false)
  const mounted = useMounted()

  const _handleClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (onClick == null) return
    const result = onClick(e)
    if (isPromise(result)) {
      setLoading(true)
      result.finally(() => {
        if (!mounted()) return
        setLoading(false)
      })
    }
  }

  return (
    <LoadingButton onClick={_handleClick} loading={loading} variant="contained">
      {children}
    </LoadingButton>
  )
}
