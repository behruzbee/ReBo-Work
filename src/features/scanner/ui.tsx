import { useEffect, useRef } from "react"
import { Flex } from "@mantine/core"
import jsQR from "jsqr"
import { workerCrudApi } from '~entities/workers/api/worker-api'; // Импортируем API для обновления работника

const Scanner = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current

    if (!canvas || !video) {
      console.error("Canvas или видео не существуют.")
      return
    }

    const context = canvas.getContext("2d")

    if (!context) {
      console.error("Ошибка при получении контекста 2D.")
      return
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment", width: 640, height: 480 } })
      .then((stream) => {
        video.srcObject = stream

        let lastScanTime = 0

        const scanQRCode = (time: number) => {
          if (time - lastScanTime >= 300) {
            lastScanTime = time

            if (video.readyState === video.HAVE_ENOUGH_DATA) {
              canvas.width = video.videoWidth
              canvas.height = video.videoHeight

              context.drawImage(video, 0, 0, canvas.width, canvas.height)

              const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

              const code = jsQR(imageData.data, imageData.width, imageData.height)

              if (code) {
                const workerId = code.data // Предполагаем, что в QR-коде содержится id работника

                // Вызываем функцию updateWorker
                workerCrudApi.updateWorker(workerId)
                  .then(() => {
                    alert(`Работник с ID ${workerId} успешно обновлен.`)
                  })
                  .catch((error) => {
                    console.error('Ошибка обновления работника:', error)
                    alert('Не удалось обновить работника.')
                  });
              }
            }
          }
          requestAnimationFrame(scanQRCode)
        }

        requestAnimationFrame(scanQRCode)
      })
      .catch(() => {
        alert("Ошибка при доступе к камере")
      })
  }, [])

  return (
    <Flex w="800px" h="800px">
      <video
        ref={videoRef}
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Flex>
  )
}

export default Scanner