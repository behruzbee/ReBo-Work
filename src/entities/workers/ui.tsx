import { Container, Loader, Table } from "@mantine/core"
import { useWorkers } from "./queries/worker-queries"
import { useNavigate } from "react-router-dom"
import { routersPath } from "~shared/constants"

const Workers = () => {
    const navigate = useNavigate()
    const { data: workers, isLoading } = useWorkers()

    if (isLoading || !workers) {
        return <Loader color="blue" />
    }

    const rows = workers.map((worker) => (
        <Table.Tr
            key={worker.id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`${routersPath.workers}/${worker.id}`)}
        >
            <Table.Td>{worker.name}</Table.Td>
            <Table.Td>{worker.position}</Table.Td>
            <Table.Td>{worker.start_of_working}</Table.Td>
            <Table.Td>{worker.end_of_working}</Table.Td>
            <Table.Td
                style={{
                    backgroundColor: worker.is_working ? "green" : "red",
                    fontWeight: 800,
                    color: "white",
                    textAlign: "center"
                }}
            >
                {worker.is_working ? "ISHDA" : "ISHDAN CHIQDI"}
            </Table.Td>
        </Table.Tr>
    ))

    return (
        <Container mt="lg">
            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Ism</Table.Th>
                        <Table.Th>Lavozim</Table.Th>
                        <Table.Th>Ish soati (boshlanish)</Table.Th>
                        <Table.Th>Ish soati (tugashi)</Table.Th>
                        <Table.Th>Ish status</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
                <Table.Caption>Scroll page to see sticky thead</Table.Caption>
            </Table>
        </Container>
    )
}

export default Workers