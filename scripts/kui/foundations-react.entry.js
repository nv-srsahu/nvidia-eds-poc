// Build entry for the KUI bundle. Run `npm run build:kui` to regenerate
// foundations-react.bundle.js + foundations-react.bundle.css.
//
// Keep this limited to KUI components used by the EDS blocks. Importing from
// the package root here pulls CSS side effects for every KUI component.
//
// CSS = generic KUI design tokens (variables = 4px spacing scale + color
// primitives), dark/light semantic theme tokens, followed by component styles.
// Keep theme-light after theme-dark so the page default stays light while
// scoped .nv-dark components, such as the hero, can resolve dark tokens.
import "@kui/foundations-css/dist/base/variables.css";
import "@kui/foundations-css/dist/base/theme-dark.css";
import "@kui/foundations-css/dist/base/theme-light.css";
import "@kui/foundations-css/dist/components/primitive.css";
import "@kui/foundations-css/dist/components/hero.css";
import "@kui/foundations-css/dist/components/grid.css";
import "@kui/foundations-css/dist/components/flex.css";
import "@kui/foundations-css/dist/components/card.css";
import "@kui/foundations-css/dist/components/text.css";
import "@kui/foundations-css/dist/components/button.css";

// Matches block imports such as:
// import { Button, Card, Flex, Grid, Hero, Text } from "@kui/foundations-react";
export { Button } from "@kui/foundations-react/Button";
export { Card } from "@kui/foundations-react/Card";
export { Flex } from "@kui/foundations-react/Flex";
export { Grid } from "@kui/foundations-react/Grid";
export { Hero } from "@kui/foundations-react/Hero";
export { Text } from "@kui/foundations-react/Text";
