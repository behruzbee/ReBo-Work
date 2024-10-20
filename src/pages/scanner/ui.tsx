import { Button, Flex } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Scanner } from "~features/scanner";

const ScannerPage = () => {
    const navigate = useNavigate()

    return (
        <Flex
            justify='center'
            align='center'
            bg='#3b5bdb'
            h='100vh'
        >
            <Button onClick={() => navigate('/workers')}>ISHCHILAR RO'YXATI</Button>
            <Scanner />
        </Flex>
    );
};

export default ScannerPage;