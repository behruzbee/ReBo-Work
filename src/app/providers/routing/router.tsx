import { createBrowserRouter } from "react-router-dom";

import { ScannerPage } from "~pages/scanner";
import { WorkerInfoPage } from "~pages/worker-info";
import { Workers } from "~pages/workers";

import { routersPath } from "~shared/constants";

export const router = createBrowserRouter([
    {
        path: routersPath.root,
        element: <ScannerPage />
    },
    {
        path: routersPath.workers,
        element: <Workers />
    },
    {
        path: routersPath.worker,
        element: <WorkerInfoPage />
    },
])