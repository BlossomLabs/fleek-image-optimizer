# Fleek Image Optimizer

## Overview

Fleek Image Optimizer is a tool designed to enhance images for web delivery. It supports various image formats and provides functionalities to resize and re-encode images into more efficient formats like AVIF and WebP.

## Similar (propertary) services
These are all services that allow image optimization among other features.
- [Cloudinary](https://cloudinary.com/developers)
- [Imagekit](https://imagekit.io/docs/overview)
- [Imgix](https://www.imgix.com/solutions/compression-and-performance)
- [Akami](https://techdocs.akamai.com/ivm/docs/optimize-images)

## Optimizing images in Fleek

A very interesting resource for image optimization that uses WebAssembly and browser technologies is [Squoosh.app](https://squoosh.app) from Google Chrome Labs. The app [repo](https://github.com/GoogleChromeLabs/squoosh) is open source and up to date with support for the latest file formats.

For anyone who want to use the wasm modules underneath, there is an unofficial set of npm packages under [@jsquash/\*](https://github.com/jamsinclair/jSquash) that include the WASM modules with support for encoding, resizing, and decoding avif, jpeg, jxl, png and webp.

In order to make WASM work on Fleek Functions, I needed to configure the rollup bundler in a specific way to inline dynamic imports and WASM modules. I created an independent repo so anyone who needs to use WASM in Fleek can find how: [Fleek Functions WebAssembly Starter Kit](https://github.com/BlossomLabs/fleek-function-wasm-starter).

Using that configuration, I could import the wasm modules from jsquash, and use them in a fleek function that receives the image URI and the desired width, and converts it to the most efficient image type that is available for the requesting browser.

### Usage

You can call the function by passing the image URL and optional `width` and `to` parameters to the query string like this:

```
https://image-optimizer.functions.on-fleek.app/<url>/?w=<width>&to=<type>
```

If the `w` parameter is not provided, it will deliver the image size as is.

If the `to` parameter is not provided, it will check the image types accepted by the client and deliver a format that fits, prioritizing AVIF, and then WebP.

**Example:**

```
https://image-optimizer.functions.on-fleek.app/https://fleek.network/share-image.png/?w=500
```

It converts a 260 kB PNG image to a 5.21 kB WEBP image and delivers it as a response that takes less than a second.

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