# Fleek Image Optimizer

## Overview

Fleek Image Optimizer is a tool designed to enhance images for web delivery. It supports various image formats and provides functionalities to resize and re-encode images into more efficient formats like AVIF and WebP.

## Features

- **Parameter Processing**: Accepts image URLs, along with optional width and output type parameters from the query string.
- **Image Decoding**: Supports decoding of PNG, JPEG, WebP, and AVIF formats.
- **Image Resizing**: Allows resizing images while maintaining their aspect ratio.
- **Image Encoding**: Capable of encoding images to WebP and AVIF formats.

### Usage

You can call the function by passing the image URL and optional `width` and `to` parameters to the query string like this:

```
https://image-optimizer.functions.on-fleek.app/<url>/?w=<width>&to=<type>
```

If the `w` parameter is not provided, it will deliver the image size as is.

If the `to` parameter is not provided, it will check the image types accepted by the client and deliver a format that fits, prioritizing AVIF, and then WebP.

**Example:**

```
https://image-optimizer.functions.on-fleek.app/https://cloudinary-marketing-res.cloudinary.com/image/upload/landmannalaugar_iceland.jpg/?w=2000
```

It converts a 18 MB PNG image to a 211 KB AVIF image and delivers it as a response.

## Installation and Usage

### Installation

First, install the required dependencies using:

```sh
bun i
```

### Building the Project

To build the project, use the following command:

```sh
bun run build
```

This will create a `./dist/main.js` bundle that includes all tree-shaken dependencies and inline WASM modules.

### Deployment

To deploy the project, follow these steps:

1. Create a function:

```sh
bun create-func $NAME
```

2. Deploy the function:

```sh
bun deploy-func $NAME
```

Replace `$NAME` with the desired name of your function.

## Contributing

We welcome contributions! If you have suggestions for improvements or encounter any issues, please open an issue or submit a pull request on our GitHub repository.

## Contact

This project was developed as part of the Fleek Hacker House at ETH Brussels 2024. It's a proof of concept (PoC) and its future maintenance is uncertain. For questions or support, please reach out to [Blossom Labs](https://blossom.software).