# Datekit

Beautiful calendar components for React/Next.js, built with Tailwind CSS & Day.js.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-changesets
```

## What's inside?

This repo includes the following:

### Apps and Packages

- `@datekit/docs`: Documentation site powered by [Next.js](https://nextjs.org/)
- `@datekit/website`: Main website powered by [Next.js](https://nextjs.org/)
- `@datekit/core`: Datekit core components
- `@datekit/utils`: Datekit shared utilities
- `@datekit/typescript-config`: TypeScript preset
- `@datekit/eslint-config`: ESLint preset

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Useful commands

- `npm run build` - Build all packages and both the website and the docs site
- `npm run dev` - Develop all packages and both the website and the docs site
- `npm run lint` - Lint all packages
- `npm run changeset` - Generate a changeset
- `npm run clean` - Clean up all `node_modules` and `dist` folders (runs each package's clean script)

## Versioning and Publishing packages

Package publishing has been configured using [Changesets](https://github.com/changesets/changesets). Please review their [documentation](https://github.com/changesets/changesets#documentation) to familiarize yourself with the workflow.

This example comes with automated npm releases setup in a [GitHub Action](https://github.com/changesets/action). To get this working, you will need to create an `NPM_TOKEN` and `GITHUB_TOKEN` in your repository settings. You should also install the [Changesets bot](https://github.com/apps/changeset-bot) on your GitHub repository as well.

For more information about this automation, refer to the official [changesets documentation](https://github.com/changesets/changesets/blob/main/docs/automating-changesets.md)

### npm

If you want to publish package to the public npm registry and make them publicly available, this is already setup.

To publish packages to a private npm organization scope, **remove** the following from each of the `package.json`'s

```diff
- "publishConfig": {
-  "access": "public"
- },
```

### GitHub Package Registry

See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#publishing-a-package-using-publishconfig-in-the-packagejson-file)
