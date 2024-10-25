import { Button, Container, Box } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { WorkerList } from '~entities/workers';

const WorkerPage = () => {
    const navigate = useNavigate();

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", // Тень для контейнера
                borderRadius: "10px",
                background: "#f8f9fa", // Легкий серый фон для контраста
            }}
        >
            {/* Кнопка для навигации на страницу сканера */}
            <Button
                mt="lg"
                size="lg"
                radius="md"
                style={{
                    background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)", // Градиент
                    color: "#fff",
                    padding: "12px 24px",
                    fontSize: "18px",
                    transition: "transform 0.2s ease",
                }}
                onClick={() => navigate('/')}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                SKANERLASH
            </Button>

            {/* Список работников */}
            <Box
                mt="xl"
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)", // Дополнительная тень для контраста
                    backgroundColor: "#ffffff", // Белый фон для списка
                }}
            >
                <WorkerList />
            </Box>
        </Container>
    );
};

export default WorkerPage;
