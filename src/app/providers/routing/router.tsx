import { createBrowserRouter } from "react-router-dom";

import { ScannerPage } from "~pages/scanner";

import { routersPath } from "~shared/constants";

export const router = createBrowserRouter([
    {
        path: routersPath.root,
        element: <ScannerPage />
    }
])