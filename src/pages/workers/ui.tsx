import { Button, Container } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { WorkerList } from '~entities/workers'

const WorkerPage = () => {
    const navigate = useNavigate()

    return (
        <Container>
            <Button mt='lg' onClick={() => navigate('/')}>SKANERLASH</Button>
            <WorkerList />
        </Container>
    )
}

export default WorkerPage