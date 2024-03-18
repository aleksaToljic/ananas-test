# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# App description

The layout and visuals are simple, inspired by GitHub.

I've used my personal layout tool, that I started preparing and want to open-source when ready, but it's new and I didn't have a chance to use it on some project, so I wanted to take this oportunity, and test the tool.

Layout tool is inspired by [Every-Layout](https://every-layout.dev/) and [Utopia](https://utopia.fyi/).

- I've added //TODO comments to explain my idea behind some of the decisions, and also how to improve some things later on.
- Added just two simple unit tests
- Added some simple automation for rendering the routes, it will render the routes based on the structure of the `pages` folder, then `<Router/>` component is using that generated info to render the routes.
- Since the task was to have propsMessage setuped from one location, I used `React.Context` via `HelloFromContainer.tsx` since I didn't have any Context in this app, so I was just showing how would I use Context via two functions I added `createContainer()` and `useContainer()`, small functions that are copied from `unstated-next`

##### Folder structure

- [assets](src%2Fassets) (auto-generated)
- [components](src%2Fcomponents) (place for all the components, sub folders like "atoms" for primitive components, but also folder structure like "pages" to track the components used in pages as well)
- [containers](src%2Fcontainers) (place for Context.Providers (containers))
- [hooks](src%2Fhooks) (place for our hooks)
- [http](src%2Fhttp) (we keep track of all axios config and requests there)
- [pages](src%2Fpages) (pages, by which structure we generage `routes.json` via `npm run generate`)
- [styles](src%2Fstyles) (styles where mostly we have this lib I'm working on, only "modules" folder is custom (that I had to write now))
- [types](src%2Ftypes) (some place for our types)
- [util](src%2Futil) (some place for our util, like `constants`)
