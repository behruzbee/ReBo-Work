import { Button, Flex, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Scanner } from "~features/scanner";

const ScannerPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      style={{
        background: "linear-gradient(135deg, #3b5bdb 0%, #1e90ff 100%)",
        height: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Box
        style={{
          marginBottom: "20px",
          width: "100%",
          maxWidth: "540px",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Button
          fullWidth
          size="lg"
          radius="md"
          style={{
            background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "18px",
            transition: "transform 0.3s ease",
          }}
          onClick={() => navigate('/workers')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ISHCHILAR RO'YXATI
        </Button>
      </Box>

      <Box
        style={{
          width: "100%",
          maxWidth: "540px",
          padding: "15px",
          borderRadius: "15px",
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
          background: "#ffffff33",
          boxSizing: "border-box",
        }}
      >
        <Scanner />
      </Box>

      <style>
        {`
          @media (max-width: 768px) {
            button {
              font-size: 16px;
              padding: 10px 20px;
            }
            .scanner-container {
              padding: 15px;
            }
          }
          @media (max-width: 480px) {
            button {
              font-size: 14px;
            }
            .scanner-container {
              padding: 10px;
            }
          }
        `}
      </style>
    </Flex>
  );
};

export default ScannerPage;
