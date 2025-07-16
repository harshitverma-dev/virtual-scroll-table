# About

Created a virtualized table component that efficiently renders large datasets (1000+ rows, 50+ columns) using both vertical and horizontal virtual scrolling to optimize performance. Additionally, implemented logic to freeze the first 2 and last 2 columns so they remain visible during horizontal scrolling.

## Features

This project implements a virtualized table component for efficiently rendering large datasets. Key features include:

*   **Virtualization:** Only renders the visible rows, improving performance for large datasets.
*   **Fixed Columns:** Supports freezing columns on the left and right sides of the table.
*   **Customizable Columns:** Allows defining column widths and headers.

## Running the Application

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

    This will start the application in development mode with hot module replacement (HMR). Open your browser to view it.

3.  **Build for Production:**

    ```bash
    npm run build
    ```

    This command builds the application for production, optimizing the code for deployment.

4.  **Serve Production Build:**

    You can use a static file server to serve the production build from the `dist` directory. For example, using `serve`:

    ```bash
    npm install -g serve
    serve dist
    ```

