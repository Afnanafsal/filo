# ⚡️ Filo — Instantly Create Files & Folders from the Terminal

> A blazing-fast CLI tool to scaffold nested files and directories in one command.  
> Stop wasting time with `mkdir -p` and `touch`. Just type `filo path/to/file.js` and you're done.

---

## 📦 Installation

```bash
npm install -g filo
```

After installation, the `filo` command is available globally from any terminal.

---

## 🚀 Usage

```bash
filo path/to/file.ext
```

### ✅ Automatically:
- Recursively creates folders if they don’t exist.
- Creates the file if it doesn’t exist.
- Prompts you if the file already exists.

---

## 📂 Examples

### Example 1:
```bash
filo src/utils/math/calc.ts
```

Creates:
```
📁 src/
└── 📁 utils/
    └── 📁 math/
        └── 📄 calc.ts
```

### Example 2:
```bash
filo pages/blog/index.md
```

Creates:
```
📁 pages/
└── 📁 blog/
    └── 📄 index.md
```

---

## 🧠 Why Filo?

- ⚡ **Super fast**: No boilerplate or configuration.
- 🧼 **Cleaner workflow**: Better than `mkdir -p && touch`.
- 🧪 **Versatile**: Great for scaffolding, prototyping, or organizing projects.
- 🔗 **Universal**: Works anywhere — frontend, backend, markdown, docs.
- 🛡️ **Safe by default**: Prompts on overwrite.

---

## ✨ Features

- ✅ Global CLI (`filo`) after install.
- ✅ Cross-platform support (macOS, Linux, Windows).
- ✅ Prompts before overwriting files.
- ✅ Designed for speed and simplicity.