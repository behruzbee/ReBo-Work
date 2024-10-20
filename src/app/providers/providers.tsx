import { MantineProvider } from "./mantine"
import { QueryProvider } from "./query"
import { RouterProvider } from "./routing"

const Providers = () => {
    return (
        <MantineProvider>
            <QueryProvider>
                <RouterProvider />
            </QueryProvider>
        </MantineProvider>
    )
}

export default Providers