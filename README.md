# QuickShort Linke - URL Shortener

Welcome to QuickShort Link, a simple and efficient URL shortener service!

## Overview

QuickShort Linke provides a web-based UI and an API for creating and managing shortened URLs. Whether you want to share links more easily or manage your URLs programmatically, QuickShort Linke has got you covered.

- Web Service: [https://qsl.onrender.com/](https://qsl.onrender.com/)
- API Endpoint: [https://qsl.onrender.com/api](https://qsl.onrender.com/api)
- UI Endpoint: [https://qsl.onrender.com/UIshortener](https://qsl.onrender.com/UIshortener)

## How It Works

### Web Service

Visit [https://qsl.onrender.com/](https://qsl.onrender.com/) to access the official QuickShort Linke web service. Here, you'll find a brief set of instructions on how to use the URL shortener.

### UI Shortener

The UI shortener is accessible at [https://qsl.onrender.com/UIshortener](https://qsl.onrender.com/UIshortener). Follow these steps to create a shortened link:

1. Visit the UI shortener endpoint.
2. Input your long URL in the provided field.
3. Click on the "Create Short URL" button.
4. Get your newly generated shortened link!

### API

The API is accessible at [https://qsl.onrender.com/api](https://qsl.onrender.com/api). Use the following endpoints:

- **GET `/api`**: Retrieve a list of all links and their corresponding shortened versions.

- **POST `/api`**: Shorten a new URL. Make a POST request with the following JSON format:

    ```json
    {
        "url": "your_long_url_here"
    }
    ```

    Example Response:

    ```json
    {
        "short_url": "your_shortened_url_here"
    }
    ```

Feel free to integrate QuickShort Linke into your projects or use it for personal URL management! If you have any questions or issues, don't hesitate to reach out. Happy shortening!

### MIT License

Copyright 2023 Victor Villca

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
