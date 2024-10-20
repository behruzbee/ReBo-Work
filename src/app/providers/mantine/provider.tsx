import { PropsWithChildren } from 'react'
import { MantineProvider } from '@mantine/core'

const Provider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider>
            {children}
        </MantineProvider>
    )
}

export default Provider