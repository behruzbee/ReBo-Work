import { Container, Loader, Mark, Text, Grid, Card, Table, Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorker } from '~entities/workers/queries/worker-queries';

const WorkerInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useWorker(id || '0');
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader color="blue" />;
  }

  if (!worker) {
    return <Text color="red">Worker not found</Text>;
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(dateString).toLocaleString('ru-RU', options);
  };

  // Округление значений
  const monthlyWorkedMinutes = Math.round(worker.monthly_worked_minutes);
  const monthlyEarnings = Math.round(worker.monthly_earnings);
  const hourlyRate = Math.round(worker.hourly_rate);

  return (
    <Container mt="lg">
      <Button
        mt="lg"
        onClick={() => navigate(-1)}
        size="md"
        style={{
          background: 'linear-gradient(135deg, #00b4db, #0083b0)',
          color: 'white',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        ORTGA
      </Button>

      <Text fw={700} style={{ fontSize: '30px', margin: '20px 0', color: '#3b5bdb' }}>
        {`${worker.name} ${worker.firstName}`}
      </Text>

      <Grid gutter="md">
        <Grid.Col span={12}>
          <Card shadow="lg" padding="lg" style={{ borderRadius: '12px' }}>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Lavozim: <Mark style={{ textTransform: 'uppercase' }}>{worker.position}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Ish holati: <Mark color={worker.is_working ? 'green' : 'red'}>{worker.is_working ? 'ISHDA' : 'ISHDA EMAS'}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Ish boshlanish vaqti: <Mark>{worker.start_of_working}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Ish tugatish vaqti: <Mark>{worker.end_of_working}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Ishlagan soati (1 oy ichida): <Mark>{monthlyWorkedMinutes} daqiqa</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px', marginBottom: '8px' }}>
              Ishlagan soati puli (1 oy ichida): <Mark>{monthlyEarnings} so'm</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ish soati puli: <Mark>{hourlyRate} so'm</Mark>
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Text fw={700} style={{ fontSize: '26px', margin: '30px 0 15px', color: '#3b5bdb' }}>
        ИСТОРИЯ:
      </Text>

      <Table striped highlightOnHover withColumnBorders style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Table.Thead>
          <Table.Tr style={{ backgroundColor: '#3b5bdb', color: 'white' }}>
            <Table.Th>Vaqt</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {worker.work_histories.map((history, index) => (
            <Table.Tr key={index}>
              <Table.Td>{formatDate(history.date)}</Table.Td>
              <Table.Td>
                {history.sessions.map((session, idx) => (
                  <Text key={idx} style={{ display: 'block', marginBottom: '5px' }}>
                    <Mark color={session.check_out ? 'green' : 'orange'} style={{ textTransform: 'capitalize', marginRight: '10px' }}>
                      Kirish: {formatDate(session.check_in)}
                    </Mark>
                    {session.check_out ? (
                      <Mark color="blue" style={{ textTransform: 'capitalize' }}>
                        Chiqish: {formatDate(session.check_out)}
                      </Mark>
                    ) : (
                      <Text component="span" color="red">
                        Chiqish: ro'yxatdan yo'q
                      </Text>
                    )}
                  </Text>
                ))}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default WorkerInfoPage;
