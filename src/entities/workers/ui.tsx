import { Container, Loader, Table, Text } from "@mantine/core";
import { useWorkers } from "./queries/worker-queries";
import { useNavigate } from "react-router-dom";
import { routersPath } from "~shared/constants";

const Workers = () => {
  const navigate = useNavigate();
  const { data: workers, isLoading } = useWorkers();

  if (isLoading || !workers) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader
          size="lg"
          variant="dots"
          color="blue"
          style={{
            transform: "scale(1.5)",
          }}
        />
      </Container>
    );
  }

  const rows = workers.map((worker) => (
    <Table.Tr
      key={worker.id}
      style={{
        cursor: "pointer",
        transition: "transform 0.3s ease, background-color 0.3s",
      }}
      onClick={() => navigate(`${routersPath.workers}/${worker.id}`)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Table.Td>
        <Text size="md" fw={600}>
          {worker.name}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{worker.position}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{worker.start_of_working}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{worker.end_of_working}</Text>
      </Table.Td>
      <Table.Td
        style={{
          backgroundColor: worker.is_working ? "#4caf50" : "#f44336",
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        {worker.is_working ? "ISHDA" : "ISHDAN CHIQDI"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container mt="lg" style={{ overflowX: "auto" }}>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        style={{
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Table.Thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#f5f5f5",
            zIndex: 1,
          }}
        >
          <Table.Tr>
            <Table.Th>
              <Text size="md" fw={700}>
                Ism
              </Text>
            </Table.Th>
            <Table.Th>
              <Text size="md" fw={700}>
                Lavozim
              </Text>
            </Table.Th>
            <Table.Th>
              <Text size="md" fw={700}>
                Ish soati (boshlanish)
              </Text>
            </Table.Th>
            <Table.Th>
              <Text size="md" fw={700}>
                Ish soati (tugashi)
              </Text>
            </Table.Th>
            <Table.Th>
              <Text size="md" fw={700}>
                Ish status
              </Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
        <Table.Caption>
          <Text size="sm" color="dimmed">
            Scroll page to see sticky thead
          </Text>
        </Table.Caption>
      </Table>
    </Container>
  );
};

export default Workers;