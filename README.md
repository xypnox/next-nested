# NextJS Nested demo

You can view the deployed version here: https://next-nested.vercel.app/

This is the source code of the sample website to demonstrate nested markdown structure rendered in next.js.

This repo includes minimal code to read infinitely nested folders and subfolders containing markdown files and displayes them in a nested manner and the generated slug replicates the file structure.

For a folder to be read, it needs to contain an index.md.

Current code assumes YAML frontmatter `title` for the docs files to be necessary and `date` optional but can be tweaked to whatever you may find suitable.

The basic patterns are outlined below:

## Blog

The blog is the basic flat normal structure. This is same from Next.js tutorial.

- When to Use Static Generation v.s. Server-side Rendering
  January 2, 2020
- Two Forms of Pre-rendering
  January 1, 2020

## Docs

The Docs here are generated in nested manner and have urls in same pattern as file structure.

- **Documentation** /docs/
  - Contributionsnsn /docs/contributing
  - Funkquently asked qwestions /docs/faq
  - **Getting Started** /docs/getting-started
    - Installation /docs/getting-started/installation
    - Quick Start /docs/getting-started/quickstart
  - **Reference** /docs/reference
    - KOMOPONENTS /docs/reference/components
    - FUnktions /docs/reference/functions
    - **Nested Index** /docs/reference/nested
      - Nested File /docs/reference/nested/nested_file
      - **Subnested Index** /docs/reference/nested/subnested
        - Sub Nested File /docs/reference/nested/subnested/subnested_file

## Docs - Flat

The Docs can also be displayed in a flattened manner as well but have urls in same pattern as file structure.

- Documentation
- Contributionsnsn
- Funkquently asked qwestions
- Getting Started
- Installation
- Quick Start
- Reference
- KOMOPONENTS
- FUnktions
- Nested Index
- Nested File
- Subnested Index
- Sub Nested File

## Known Issues

- The folders in Docs can't have same name one after the other. This is a deficiency in the algorithm and should not be a major issue. This only affects the foldername and the title can always remain same!

## Credits

The code for pageFileCache was first implemented by @davecaruso. I separated the file reading for reusability in `lib/docs`, and implemented the component/functions to process and display the tree structure.

---

<center><i>
With :heart: by xypnox
</i></center>
