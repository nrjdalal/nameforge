# Wordloom

**A sophisticated engine to generate short, word-like lowercase names from real English letter patterns, equipped with a high-performance CLI and a stunning Web Studio.**

[![Twitter](https://img.shields.io/twitter/follow/nrjdalal?label=%40nrjdalal_dev)](https://twitter.com/nrjdalal)
[![npm](https://img.shields.io/npm/v/wordloom?color=red&logo=npm)](https://www.npmjs.com/package/wordloom)
[![license](https://img.shields.io/npm/l/wordloom)](https://www.npmjs.com/package/wordloom)

Wordloom gives you lowercase name ideas based on contextual phonotactics. If a generated result happens to be a real dictionary word, Wordloom instantly fetches and displays its exact meaning.

Perfect for naming side projects, exploring short word-like combinations, or strictly filtering names that start, end, or contain specific letter sequences.

---

## ✦ Wordloom Studio (Web Application)

Wordloom has evolved from a standalone CLI into a fully interactive **Wordloom Studio**. Built as a robust monolithic workspace, the Studio is designed with an emphasis on minimalist, editorial aesthetics and a premium user experience.

### Key Studio Features:

- **Interactive UI & CLI Mode:** Toggle seamlessly between a tactile visual configuration board and an integrated browser-terminal to input constraint commands exactly like the CLI.
- **Text-Flipping Board:** Powered by Aceternity UI, featuring beautiful 3D mechanical split-flap animations for your generated characters.
- **Kinetic Vanta FOG Backgrounds:** A heavily customized, beautiful fluid background using WebGL (`three.js`) dynamically tracking the cursor for maximum immersion.
- **Real-Time Next.js 15+ Rendering:** Optimized heavily via Turbopack for instantaneous computation.

### Running the Studio Locally

The architecture utilizes **Turborepo** and **Bun** to manage local packages and applications effortlessly.

```bash
# Clone the repository
git clone https://github.com/whoavidwivedi/wordloomUI.git
cd wordloomUI

# Install dependencies using Bun
bun install

# Start the development server across all packages
bun dev
```

Navigate to `http://localhost:3000` to dive into the Studio!

---

## ✦ Wordloom CLI

To use Wordloom strictly from your terminal in any environment without installing the Studio:

### Quick Usage

```sh
npx wordloom
npx wordloom --prefix no
npx wordloom --length 6 --contains abse
```

### Output Example

```text
┌───┬────────┬──────────────────────────────────────────────┐
│   │ name   │ meaning                                      │
├───┼────────┼──────────────────────────────────────────────┤
│ 1 │ abseco │                                              │
│ 2 │ absect │                                              │
│ 3 │ absent │ verb: go away or leave; adjective: not      │
│   │        │ being in a specified place                   │
└───┴────────┴──────────────────────────────────────────────┘
```

### Global Installation

```sh
npm install -g wordloom
wordloom --help
```

### CLI Options

```text
-l, --length <number>         Exact name length to generate (2-8, default: 5)
-c, --contains <text>         Literal substring to require anywhere in the name
-p, --prefix <prefix>         Literal starting prefix to validate and continue from
-s, --suffix <suffix>         Literal ending suffix to require
-h, --help                    Show help
```

---

## ✦ How it works

Wordloom is conceptually transparent yet powerful:

1. It learns allowed letter transitions sequentially from **CMUdict**.
2. It constructs sequences strictly following these verified constraints.
3. Every generated result is cross-referenced against **WordNet** algorithms. If the lemma is an exact, matching dictionary term, the semantic meaning is automatically resolved.

_(Note: While results are highly word-like, they are randomly evaluated and are not strictly guaranteed to be common words, proper names, or brand-safe names out of the box)._

## License

MIT
