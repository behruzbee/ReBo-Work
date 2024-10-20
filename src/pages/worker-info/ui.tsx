import { Container, Loader, Mark, Text, Grid, Card, Table, Button } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useWorker } from '~entities/workers/queries/worker-queries';

const WorkerInfoPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useWorker(id || '0');
  const navigate = useNavigate()

  if (isLoading) {
    return <Loader />;
  }

  if (!worker) {
    return <Text color="red">Worker not found</Text>;
  }

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Используйте true для 12-часового формата
    };
    return new Date(dateString).toLocaleString('ru-RU', options);
  };

  console.log(worker);

  return (
    <Container mt='lg'>
      <Button mt='lg'  onClick={() => navigate(-1)}>ORTGA</Button>
      <Text fw={700} style={{ fontSize: '30px', marginBottom: '20px' }}>
        {`${worker.name} ${worker.firstName}`}
      </Text>

      <Grid gutter='md'>
        <Grid.Col span={12}>
          <Card shadow="sm" padding="lg">
            <Text fw={700} style={{ fontSize: '22px' }}>
              Lavozim: <Mark style={{ textTransform: 'uppercase' }}>{worker.position}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ish holati: <Mark style={{ textTransform: 'capitalize' }}>{worker.is_working ? 'ISHDA' : 'ISHDA EMAS'}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ish boshlanish vaqti: <Mark style={{ textTransform: 'capitalize' }}>{worker.start_of_working}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ish tugatish vaqti: <Mark style={{ textTransform: 'capitalize' }}>{worker.end_of_working}</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ishlagan soati (1 oy ichida): <Mark style={{ textTransform: 'capitalize' }}>{worker.monthly_worked_minutes} daqiqa</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ishlagan soati puli (1 oy ichida): <Mark style={{ textTransform: 'capitalize' }}>{worker.monthly_earnings} so'm</Mark>
            </Text>
            <Text fw={700} style={{ fontSize: '22px' }}>
              Ish soati puli: <Mark style={{ textTransform: 'capitalize' }}>{worker.hourly_rate} so'm</Mark>
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      <Text fw={700} style={{ fontSize: '26px', marginTop: '30px', marginBottom: '15px' }}>
        ИСТОРИЯ:
      </Text>

      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
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
                  <Text key={idx} style={{ display: 'block' }}>
                    <Mark 
                      color={session.check_out ? 'green' : 'orange'} 
                      style={{ textTransform: 'capitalize' }}
                      mr='md'
                    >
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