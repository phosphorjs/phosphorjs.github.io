flexbox-interrop
================

A demonstration of mixing CSS layout with Phosphor absolute layout.

In this example, an ad-hoc container widget is created which uses CSS
flexbox to layout its children. One of these children is a Phosphor
`SplitPanel`, which uses absolute layout to arrange *its* children.

This example shows that these two methods of layout get along nicely.

**Build Instructions:**
```bash
git clone https://github.com/sccolbert/flexbox-interrop.git
cd flexbox-interrop
npm install
npm run build
```

Navigate to `example/index.html`
