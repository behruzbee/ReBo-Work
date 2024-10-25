import { useEffect, useRef } from "react";
import { Flex, Box } from "@mantine/core";
import jsQR from "jsqr";
import { workerCrudApi } from "~entities/workers/api/worker-api";

const Scanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!canvas || !video) {
      console.error("Canvas или видео не существуют.");
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      console.error("Ошибка при получении контекста 2D.");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment", width: 640, height: 480 } })
      .then((stream) => {
        video.srcObject = stream;

        let isScanningAllowed = true;

        const scanQRCode = () => {
          if (isScanningAllowed && video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
              const workerId = code.data;
              isScanningAllowed = false;

              workerCrudApi
                .updateWorker(workerId)
                .then(() => {
                  alert(`Работник с ID ${workerId} успешно обновлен.`);
                })
                .catch((error) => {
                  console.error("Ошибка обновления работника:", error);
                  alert("Не удалось обновить работника.");
                })
                .finally(() => {
                  setTimeout(() => {
                    isScanningAllowed = true;
                  }, 3000);
                });
            }
          }
          requestAnimationFrame(scanQRCode);
        };

        requestAnimationFrame(scanQRCode);
      })
      .catch(() => {
        alert("Ошибка при доступе к камере");
      });
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      justify="center"
      align="center"
      direction="column"
      style={{
        position: "relative",
        maxWidth: "500px",
        maxHeight: "500px",
        borderRadius: "20px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "20px",
          filter: "brightness(0.7) saturate(1.2)",
        }}
      />

      <Box
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
        }}
      />

      <Box
        style={{
          position: "absolute",
          width: "70%",
          height: "70%",
          border: "4px solid #00ff85",
          borderRadius: "15px",
          boxShadow: "0 0 20px #00ff85",
          animation: "scanner-frame-animation 2s infinite ease-in-out",
          transition: "width 0.3s, height 0.3s",
        }}
      />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <style>
        {`
          @keyframes scanner-frame-animation {
            0% { box-shadow: 0 0 10px #00ff85; }
            50% { box-shadow: 0 0 20px #00ff85; }
            100% { box-shadow: 0 0 10px #00ff85; }
          }

          @media (max-width: 768px) {
            .scanner-frame-animation {
              width: 80%;
              height: 80%;
            }
          }

          @media (max-width: 480px) {
            .scanner-frame-animation {
              width: 90%;
              height: 90%;
            }
          }
        `}
      </style>
    </Flex>
  );
};

export default Scanner;