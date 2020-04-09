![](./public/logo.png)

# conflux-remix plugin <img src="./public/remix-logo.png" alt="remix-logo" style="zoom:18%;" />

The Conflux remix plugin let  Remix IDE adds support for creating and interacting with contracts on a Conflux network.



## Getting Started

Just go to the [Remix IDE](https://remix.ethereum.org/) and activate the **Conflux Network** plugin on the plugins page. For step-by-step instructions, go to read the Development Setup section docs.



## Development Setup

- Clone the repo and run:

```
yarn install
yarn start
```

- This will start the webpack development server and serve the plugin at [http://localhost:3000](http://localhost:3000/)
- Go to our dev version of [Remix IDE](http://remix-alpha.ethereum.org/). Make sure you connect to the http version of the site, not https.
- Click on the plugins tab
- Activate the Conflux Network plugin
- The extension should automatically reload with any changes you make.



## Building

`yarn build` to run a production build of the plugin. The output is in the build/ directory. `yarn serve` to serve the build folder from port 3000



## License

Conflux-remix plugin is under the Apache 2.0 license. See the [LICENSE](./LICENSE) file for details.

