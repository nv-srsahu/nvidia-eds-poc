// node_modules/@kui/foundations-react-core/dist/Button/components/base/Button.js
import { jsx as jsx3 } from "react/jsx-runtime";

// scripts/kui/react-compiler-runtime.shim.js
import { useMemo } from "react";
var EMPTY = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
function c(size) {
  return useMemo(() => {
    const cache = new Array(size);
    for (let i = 0; i < size; i += 1) cache[i] = EMPTY;
    cache[EMPTY] = true;
    return cache;
  }, [size]);
}

// node_modules/@kui/foundations-react-core/dist/Button/components/base/Button.js
import React5 from "react";

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};

// node_modules/@kui/foundations-react-core/dist/lib/constants/generated/spacing-scale.js
var spacing_scale_default = (
  /** @type {const} */
  {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px",
    "11": "44px",
    "12": "48px",
    "14": "56px",
    "16": "64px",
    "18": "72px",
    "20": "80px",
    "24": "96px",
    "28": "112px",
    "32": "128px",
    "36": "144px",
    "40": "160px",
    "44": "176px",
    "48": "192px",
    "52": "208px",
    "56": "224px",
    "60": "240px",
    "64": "256px",
    "72": "288px",
    "80": "320px",
    "96": "384px",
    "250": "1000px",
    "px": "1px",
    "0.25": "1px",
    "0.5": "2px",
    "0.75": "3px",
    "1.5": "6px",
    "2.5": "10px",
    "3.5": "14px",
    "density-xxs": "2px",
    "density-xs": "4px",
    "density-sm": "6px",
    "density-md": "8px",
    "density-lg": "12px",
    "density-xl": "16px",
    "density-2xl": "24px",
    "density-3xl": "32px",
    "density-4xl": "48px",
    "density-5xl": "64px"
  }
);

// node_modules/@kui/foundations-react-core/dist/lib/constants/properties.js
var AlignItemsValues = ["baseline", "center", "start", "end", "stretch"];
var JustifyContentValues = ["normal", "start", "end", "center", "between", "around", "evenly", "stretch"];
var FlexWrapValues = ["wrap", "nowrap", "wrap-reverse"];
var spacingScaleKeys = Object.keys(spacing_scale_default);
var SizeValues = [...spacingScaleKeys, "inherit"];

// node_modules/@kui/foundations-react-core/dist/lib/utils/variants.js
var buildVariants = (base, variant, values, transform) => values.reduce((map, value) => {
  const normalizedValue = value.toString().replace(".", "_");
  map[value] = `${base}--${variant}-${transform ? transform(normalizedValue) : normalizedValue}`;
  return map;
}, {});

// node_modules/@radix-ui/react-primitive/dist/index.mjs
import * as React3 from "react";
import * as ReactDOM from "react-dom";

// node_modules/@radix-ui/react-slot/dist/index.mjs
import * as React2 from "react";

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
import * as React from "react";
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
import { Fragment as Fragment2, jsx } from "react/jsx-runtime";
var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
var use = React2[" use ".trim().toString()];
function isPromiseLike(value) {
  return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
  return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React2.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    const childrenArray = React2.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React2.Children.count(newElement) > 1) return React2.Children.only(null);
          return React2.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React2.isValidElement(newElement) ? React2.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = React2.forwardRef((props, forwardedRef) => {
    let { children, ...slotProps } = props;
    if (isLazyComponent(children) && typeof use === "function") {
      children = use(children._payload);
    }
    if (React2.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React2.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React2.cloneElement(children, props2);
    }
    return React2.Children.count(children) > 1 ? React2.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return React2.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-primitive/dist/index.mjs
import { jsx as jsx2 } from "react/jsx-runtime";
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node2 = React3.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx2(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});

// node_modules/@kui/foundations-react-core/dist/lib/components/Primitive.js
var primitiveStyles = cva("", {
  variants: {
    gap: buildVariants("nv-primitive", "gap", SizeValues),
    padding: buildVariants("nv-primitive", "spacing", SizeValues),
    paddingX: buildVariants("nv-primitive", "spacing-x", SizeValues),
    paddingY: buildVariants("nv-primitive", "spacing-y", SizeValues),
    paddingTop: buildVariants("nv-primitive", "spacing-t", SizeValues),
    paddingRight: buildVariants("nv-primitive", "spacing-r", SizeValues),
    paddingBottom: buildVariants("nv-primitive", "spacing-b", SizeValues),
    paddingLeft: buildVariants("nv-primitive", "spacing-l", SizeValues)
  },
  defaultVariants: {}
});

// node_modules/@kui/foundations-react-core/dist/lib/utils/children.js
import React4 from "react";
function isNativeButtonChild(children) {
  return React4.isValidElement(children) && children.type === "button";
}
function resolveButtonTypeAttribute(children, type, asChild) {
  if (!asChild || isNativeButtonChild(children)) {
    return type ?? "button";
  }
  return type;
}

// node_modules/@kui/foundations-react-core/dist/Button/constants.js
var ButtonTestIds = {
  Button: "nv-button"
};

// node_modules/@kui/foundations-react-core/dist/Button/components/base/Button.js
var button = cva("nv-button", {
  variants: {
    size: {
      tiny: "nv-button--size-tiny",
      small: "nv-button--size-small",
      medium: "nv-button--size-medium",
      large: "nv-button--size-large"
    },
    kind: {
      primary: "nv-button--kind-primary",
      secondary: "nv-button--kind-secondary",
      tertiary: "nv-button--kind-tertiary"
    },
    color: {
      brand: "nv-button--color-brand",
      neutral: "nv-button--color-neutral",
      danger: "nv-button--color-danger"
    }
  }
});
var Button = React5.forwardRef((t0, ref) => {
  const $ = c(25);
  let asChild;
  let children;
  let className;
  let color;
  let kind;
  let props;
  let size;
  let type;
  if ($[0] !== t0) {
    ({
      asChild,
      className,
      kind,
      size,
      children,
      color,
      type,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = asChild;
    $[2] = children;
    $[3] = className;
    $[4] = color;
    $[5] = kind;
    $[6] = props;
    $[7] = size;
    $[8] = type;
  } else {
    asChild = $[1];
    children = $[2];
    className = $[3];
    color = $[4];
    kind = $[5];
    props = $[6];
    size = $[7];
    type = $[8];
  }
  let t1;
  if ($[9] !== className || $[10] !== color || $[11] !== kind || $[12] !== size) {
    t1 = button({
      className,
      kind,
      size,
      color
    });
    $[9] = className;
    $[10] = color;
    $[11] = kind;
    $[12] = size;
    $[13] = t1;
  } else {
    t1 = $[13];
  }
  let t2;
  if ($[14] !== asChild || $[15] !== children || $[16] !== type) {
    t2 = resolveButtonTypeAttribute(children, type, asChild);
    $[14] = asChild;
    $[15] = children;
    $[16] = type;
    $[17] = t2;
  } else {
    t2 = $[17];
  }
  let t3;
  if ($[18] !== asChild || $[19] !== children || $[20] !== props || $[21] !== ref || $[22] !== t1 || $[23] !== t2) {
    t3 = /* @__PURE__ */ jsx3(Primitive.button, { asChild, className: t1, "data-testid": ButtonTestIds.Button, ref, type: t2, ...props, children });
    $[18] = asChild;
    $[19] = children;
    $[20] = props;
    $[21] = ref;
    $[22] = t1;
    $[23] = t2;
    $[24] = t3;
  } else {
    t3 = $[24];
  }
  return t3;
});
Button.displayName = "Button";

// node_modules/@kui/foundations-react-core/dist/Card/components/base/Card.js
import { jsx as jsx7, jsxs as jsxs2, Fragment as Fragment4 } from "react/jsx-runtime";
import { forwardRef as forwardRef3 } from "react";

// node_modules/@kui/foundations-react-core/dist/lib/components/Slottable.js
import React6 from "react";

// node_modules/@kui/foundations-react-core/dist/lib/utils/merge-props.js
var EVENT_HANDLER_PROP_RE = /^on[A-Z]/;
function isEventHandler(propName, value) {
  return EVENT_HANDLER_PROP_RE.test(propName) && typeof value === "function";
}
function isDefaultPrevented(event) {
  return typeof event === "object" && event !== null && "defaultPrevented" in event && Boolean(event.defaultPrevented);
}
function composeEventHandlers(overrideHandler, baseHandler) {
  return (...args) => {
    overrideHandler(...args);
    if (!isDefaultPrevented(args[0])) {
      baseHandler(...args);
    }
  };
}
function mergeProps2(baseProps, overrideProps) {
  if (!overrideProps) {
    return baseProps;
  }
  const finalProps = {
    ...baseProps
  };
  Object.assign(finalProps, overrideProps);
  for (const propName of Object.keys(overrideProps)) {
    const baseValue = baseProps[propName];
    const overrideValue = overrideProps[propName];
    if (isEventHandler(propName, baseValue) && isEventHandler(propName, overrideValue)) {
      finalProps[propName] = composeEventHandlers(overrideValue, baseValue);
    }
  }
  if ("style" in overrideProps && overrideProps.style) {
    const mergedStyle = {
      ...baseProps.style,
      ...overrideProps.style
    };
    finalProps.style = mergedStyle;
  }
  if ("className" in overrideProps && overrideProps.className) {
    const baseClassName = baseProps.className;
    const mergedClassName = baseClassName ? `${baseClassName} ${overrideProps.className}` : overrideProps.className;
    finalProps.className = mergedClassName;
  }
  return finalProps;
}

// node_modules/@kui/foundations-react-core/dist/lib/components/Slottable.js
function renderChildren(children, arg) {
  return typeof children === "function" ? children(arg) : children;
}
var Slottable = React6.forwardRef(({
  asChild,
  child,
  children,
  ...rest
}, ref) => {
  if (!React6.isValidElement(child)) {
    if (asChild) {
      console.warn("@kui/foundations-react/lib/components/Slottable: asChild is true but child is not a valid element. Make sure to render a valid element or component that forwards its props to the child.");
      return null;
    }
    return renderChildren(children, child);
  }
  if (asChild) {
    const childProps = child.props;
    return React6.cloneElement(child, mergeProps2({
      ...rest,
      ref
    }, childProps), renderChildren(children, childProps.children));
  }
  return renderChildren(children, child);
});
Slottable.displayName = "Slottable";

// node_modules/@kui/foundations-react-core/dist/Card/components/composed/CardContent.js
import { jsx as jsx4 } from "react/jsx-runtime";
import React7 from "react";

// node_modules/@kui/foundations-react-core/dist/Card/constants.js
var CardTestIds = {
  CardRoot: "nv-card-root",
  CardContent: "nv-card-content",
  CardMedia: "nv-card-media"
};

// node_modules/@kui/foundations-react-core/dist/Card/components/composed/CardContent.js
var CardContent = React7.forwardRef((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-card-content ${className}` : "nv-card-content";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx4(Primitive.div, { className: t1, "data-testid": CardTestIds.CardContent, ref, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
CardContent.displayName = "CardContent";

// node_modules/@kui/foundations-react-core/dist/Card/components/composed/CardMedia.js
import { jsx as jsx5, jsxs, Fragment as Fragment3 } from "react/jsx-runtime";
import React8 from "react";
var cardMedia = cva("nv-card-media", {
  variants: {
    mediaTheme: {
      dark: "nv-dark",
      light: "nv-light"
    }
  }
});
var CardMedia = React8.forwardRef((t0, ref) => {
  const $ = c(22);
  let asChild;
  let children;
  let className;
  let mediaTheme;
  let props;
  let slotHeader;
  if ($[0] !== t0) {
    ({
      children,
      className,
      mediaTheme,
      slotHeader,
      asChild,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = asChild;
    $[2] = children;
    $[3] = className;
    $[4] = mediaTheme;
    $[5] = props;
    $[6] = slotHeader;
  } else {
    asChild = $[1];
    children = $[2];
    className = $[3];
    mediaTheme = $[4];
    props = $[5];
    slotHeader = $[6];
  }
  const Component = asChild ? Slot : "div";
  let t1;
  if ($[7] !== className || $[8] !== mediaTheme) {
    t1 = cardMedia({
      className,
      mediaTheme
    });
    $[7] = className;
    $[8] = mediaTheme;
    $[9] = t1;
  } else {
    t1 = $[9];
  }
  let t2;
  if ($[10] !== slotHeader) {
    t2 = (child) => /* @__PURE__ */ jsxs(Fragment3, { children: [
      child,
      slotHeader && /* @__PURE__ */ jsx5("div", { className: "nv-card-media-header", children: slotHeader })
    ] });
    $[10] = slotHeader;
    $[11] = t2;
  } else {
    t2 = $[11];
  }
  let t3;
  if ($[12] !== asChild || $[13] !== children || $[14] !== t2) {
    t3 = /* @__PURE__ */ jsx5(Slottable, { asChild, child: children, children: t2 });
    $[12] = asChild;
    $[13] = children;
    $[14] = t2;
    $[15] = t3;
  } else {
    t3 = $[15];
  }
  let t4;
  if ($[16] !== Component || $[17] !== props || $[18] !== ref || $[19] !== t1 || $[20] !== t3) {
    t4 = /* @__PURE__ */ jsx5(Component, { className: t1, "data-testid": CardTestIds.CardMedia, ref, ...props, children: t3 });
    $[16] = Component;
    $[17] = props;
    $[18] = ref;
    $[19] = t1;
    $[20] = t3;
    $[21] = t4;
  } else {
    t4 = $[21];
  }
  return t4;
});
CardMedia.displayName = "CardMedia";

// node_modules/@kui/foundations-react-core/dist/Card/components/composed/CardRoot.js
import { jsx as jsx6 } from "react/jsx-runtime";
import React9 from "react";

// node_modules/@kui/foundations-react-core/dist/lib/constants/density.js
var densityVariant = {
  compact: "nv-density-compact",
  standard: "nv-density-standard",
  spacious: "nv-density-spacious"
};

// node_modules/@kui/foundations-react-core/dist/Card/components/composed/CardRoot.js
var cardRoot = cva("nv-card-root", {
  variants: {
    density: densityVariant,
    interactive: {
      true: "nv-card-root--interactive"
    },
    kind: {
      solid: "nv-card-root--kind-solid",
      gradient: "nv-card-root--kind-gradient",
      float: "nv-card-root--kind-float"
    },
    layout: {
      horizontal: "nv-card-root--layout-horizontal",
      vertical: "nv-card-root--layout-vertical"
    },
    selected: {
      true: "nv-card-root--selected"
    }
  },
  defaultVariants: {
    interactive: false,
    kind: "solid",
    layout: "vertical",
    selected: false
  }
});
var CardRoot = React9.forwardRef((t0, ref) => {
  const $ = c(19);
  let className;
  let density;
  let interactive;
  let kind;
  let layout;
  let props;
  let selected;
  if ($[0] !== t0) {
    ({
      className,
      interactive,
      kind,
      layout,
      selected,
      density,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = density;
    $[3] = interactive;
    $[4] = kind;
    $[5] = layout;
    $[6] = props;
    $[7] = selected;
  } else {
    className = $[1];
    density = $[2];
    interactive = $[3];
    kind = $[4];
    layout = $[5];
    props = $[6];
    selected = $[7];
  }
  let t1;
  if ($[8] !== className || $[9] !== density || $[10] !== interactive || $[11] !== kind || $[12] !== layout || $[13] !== selected) {
    t1 = cardRoot({
      className,
      density,
      interactive,
      layout,
      kind,
      selected
    });
    $[8] = className;
    $[9] = density;
    $[10] = interactive;
    $[11] = kind;
    $[12] = layout;
    $[13] = selected;
    $[14] = t1;
  } else {
    t1 = $[14];
  }
  let t2;
  if ($[15] !== props || $[16] !== ref || $[17] !== t1) {
    t2 = /* @__PURE__ */ jsx6(Primitive.div, { className: t1, "data-testid": CardTestIds.CardRoot, ref, ...props });
    $[15] = props;
    $[16] = ref;
    $[17] = t1;
    $[18] = t2;
  } else {
    t2 = $[18];
  }
  return t2;
});
CardRoot.displayName = "CardRoot";

// node_modules/@kui/foundations-react-core/dist/Card/components/base/Card.js
var Card = forwardRef3((t0, ref) => {
  const $ = c(23);
  let asChild;
  let attributes;
  let children;
  let mediaTheme;
  let props;
  let slotHeader;
  let slotMedia;
  if ($[0] !== t0) {
    ({
      asChild,
      children,
      mediaTheme,
      slotHeader,
      slotMedia,
      attributes,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = asChild;
    $[2] = attributes;
    $[3] = children;
    $[4] = mediaTheme;
    $[5] = props;
    $[6] = slotHeader;
    $[7] = slotMedia;
  } else {
    asChild = $[1];
    attributes = $[2];
    children = $[3];
    mediaTheme = $[4];
    props = $[5];
    slotHeader = $[6];
    slotMedia = $[7];
  }
  let t1;
  if ($[8] !== attributes?.CardContent || $[9] !== attributes?.CardMedia || $[10] !== mediaTheme || $[11] !== slotHeader || $[12] !== slotMedia) {
    t1 = (child) => /* @__PURE__ */ jsxs2(Fragment4, { children: [
      slotMedia && /* @__PURE__ */ jsx7(CardMedia, { mediaTheme, slotHeader, ...attributes?.CardMedia, children: slotMedia }),
      /* @__PURE__ */ jsxs2(CardContent, { ...attributes?.CardContent, children: [
        !slotMedia && slotHeader && /* @__PURE__ */ jsx7("div", { className: "nv-card-content-header", children: slotHeader }),
        child
      ] })
    ] });
    $[8] = attributes?.CardContent;
    $[9] = attributes?.CardMedia;
    $[10] = mediaTheme;
    $[11] = slotHeader;
    $[12] = slotMedia;
    $[13] = t1;
  } else {
    t1 = $[13];
  }
  let t2;
  if ($[14] !== asChild || $[15] !== children || $[16] !== t1) {
    t2 = /* @__PURE__ */ jsx7(Slottable, { asChild, child: children, children: t1 });
    $[14] = asChild;
    $[15] = children;
    $[16] = t1;
    $[17] = t2;
  } else {
    t2 = $[17];
  }
  let t3;
  if ($[18] !== asChild || $[19] !== props || $[20] !== ref || $[21] !== t2) {
    t3 = /* @__PURE__ */ jsx7(CardRoot, { asChild, ref, ...props, children: t2 });
    $[18] = asChild;
    $[19] = props;
    $[20] = ref;
    $[21] = t2;
    $[22] = t3;
  } else {
    t3 = $[22];
  }
  return t3;
});
Card.displayName = "Card";

// node_modules/@kui/foundations-react-core/dist/Flex/components/base/Flex.js
import { jsx as jsx8 } from "react/jsx-runtime";
import React10 from "react";

// node_modules/@kui/foundations-react-core/dist/Flex/constants.js
var FlexTestIds = {
  Flex: "nv-flex"
};

// node_modules/@kui/foundations-react-core/dist/Flex/components/base/Flex.js
var flex = cva("nv-flex", {
  variants: {
    align: buildVariants("nv-flex", "align", AlignItemsValues),
    direction: {
      row: "nv-flex--direction-row",
      col: "nv-flex--direction-col",
      column: "nv-flex--direction-col",
      "row-reverse": "nv-flex--direction-row-reverse",
      "col-reverse": "nv-flex--direction-col-reverse",
      "column-reverse": "nv-flex--direction-col-reverse"
    },
    justify: buildVariants("nv-flex", "justify", JustifyContentValues),
    wrap: buildVariants("nv-flex", "wrap", FlexWrapValues)
  },
  defaultVariants: {
    align: "stretch",
    direction: "row",
    justify: "start",
    wrap: "nowrap"
  }
});
var Flex = React10.forwardRef((t0, ref) => {
  const $ = c(33);
  let align;
  let className;
  let direction;
  let divProps;
  let gap;
  let justify;
  let padding;
  let paddingBottom;
  let paddingLeft;
  let paddingRight;
  let paddingTop;
  let paddingX;
  let paddingY;
  let wrap;
  if ($[0] !== t0) {
    ({
      align,
      className,
      direction,
      gap,
      wrap,
      justify,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      ...divProps
    } = t0);
    $[0] = t0;
    $[1] = align;
    $[2] = className;
    $[3] = direction;
    $[4] = divProps;
    $[5] = gap;
    $[6] = justify;
    $[7] = padding;
    $[8] = paddingBottom;
    $[9] = paddingLeft;
    $[10] = paddingRight;
    $[11] = paddingTop;
    $[12] = paddingX;
    $[13] = paddingY;
    $[14] = wrap;
  } else {
    align = $[1];
    className = $[2];
    direction = $[3];
    divProps = $[4];
    gap = $[5];
    justify = $[6];
    padding = $[7];
    paddingBottom = $[8];
    paddingLeft = $[9];
    paddingRight = $[10];
    paddingTop = $[11];
    paddingX = $[12];
    paddingY = $[13];
    wrap = $[14];
  }
  let t1;
  if ($[15] !== align || $[16] !== className || $[17] !== direction || $[18] !== gap || $[19] !== justify || $[20] !== padding || $[21] !== paddingBottom || $[22] !== paddingLeft || $[23] !== paddingRight || $[24] !== paddingTop || $[25] !== paddingX || $[26] !== paddingY || $[27] !== wrap) {
    t1 = flex({
      align,
      className: primitiveStyles({
        className,
        gap,
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
      }),
      direction,
      justify,
      wrap
    });
    $[15] = align;
    $[16] = className;
    $[17] = direction;
    $[18] = gap;
    $[19] = justify;
    $[20] = padding;
    $[21] = paddingBottom;
    $[22] = paddingLeft;
    $[23] = paddingRight;
    $[24] = paddingTop;
    $[25] = paddingX;
    $[26] = paddingY;
    $[27] = wrap;
    $[28] = t1;
  } else {
    t1 = $[28];
  }
  let t2;
  if ($[29] !== divProps || $[30] !== ref || $[31] !== t1) {
    t2 = /* @__PURE__ */ jsx8(Primitive.div, { className: t1, ref, "data-testid": FlexTestIds.Flex, ...divProps });
    $[29] = divProps;
    $[30] = ref;
    $[31] = t1;
    $[32] = t2;
  } else {
    t2 = $[32];
  }
  return t2;
});
Flex.displayName = "Flex";

// node_modules/@kui/foundations-react-core/dist/Grid/components/base/Grid.js
import { jsx as jsx9 } from "react/jsx-runtime";
import React11 from "react";

// node_modules/@kui/foundations-react-core/dist/Grid/constants.js
var GridTestIds = {
  Grid: "nv-grid",
  GridItem: "nv-grid-item"
};

// node_modules/@kui/foundations-react-core/dist/Grid/utils.js
var BREAKPOINTS = ["base", "xs", "sm", "md", "lg", "xl", "xxl"];
function getResponsiveValueAt(responsive, breakpoint) {
  if (responsive == null) {
    return void 0;
  }
  if (typeof responsive !== "object") {
    return breakpoint === "base" ? responsive : void 0;
  }
  return responsive[breakpoint];
}
function propertyName(base, breakpoint) {
  return breakpoint === "base" ? base : `${base}-${breakpoint}`;
}
function gridTemplateCustomProperties({
  cols,
  rows,
  colMinWidth,
  colBehavior
}) {
  const style = {};
  if (colMinWidth !== void 0) {
    const keyword = colBehavior === "static" ? "auto-fill" : "auto-fit";
    style["--nv-grid-template-columns"] = `repeat(${keyword}, minmax(${colMinWidth}, 1fr))`;
  } else if (cols != null) {
    for (const breakpoint of BREAKPOINTS) {
      const colsAt = getResponsiveValueAt(cols, breakpoint);
      if (colsAt !== void 0) {
        style[propertyName("--nv-grid-template-columns", breakpoint)] = `repeat(${colsAt}, minmax(0, 1fr))`;
      }
    }
  }
  if (rows != null) {
    for (const breakpoint of BREAKPOINTS) {
      const rowsAt = getResponsiveValueAt(rows, breakpoint);
      if (rowsAt !== void 0) {
        style[propertyName("--nv-grid-template-rows", breakpoint)] = `repeat(${rowsAt}, minmax(0, 1fr))`;
      }
    }
  }
  return Object.keys(style).length > 0 ? style : void 0;
}

// node_modules/@kui/foundations-react-core/dist/Grid/components/base/Grid.js
var grid = cva("nv-grid", {
  variants: {
    flow: buildVariants("nv-grid", "flow", ["row", "col", "dense", "row-dense", "col-dense"])
  }
});
var Grid = React11.forwardRef((t0, ref) => {
  const $ = c(41);
  let className;
  let colMinWidth;
  let cols;
  let divProps;
  let flow;
  let gap;
  let padding;
  let paddingBottom;
  let paddingLeft;
  let paddingRight;
  let paddingTop;
  let paddingX;
  let paddingY;
  let rows;
  let style;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      colMinWidth,
      colBehavior: t1,
      cols,
      flow,
      gap,
      rows,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      style,
      ...divProps
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = colMinWidth;
    $[3] = cols;
    $[4] = divProps;
    $[5] = flow;
    $[6] = gap;
    $[7] = padding;
    $[8] = paddingBottom;
    $[9] = paddingLeft;
    $[10] = paddingRight;
    $[11] = paddingTop;
    $[12] = paddingX;
    $[13] = paddingY;
    $[14] = rows;
    $[15] = style;
    $[16] = t1;
  } else {
    className = $[1];
    colMinWidth = $[2];
    cols = $[3];
    divProps = $[4];
    flow = $[5];
    gap = $[6];
    padding = $[7];
    paddingBottom = $[8];
    paddingLeft = $[9];
    paddingRight = $[10];
    paddingTop = $[11];
    paddingX = $[12];
    paddingY = $[13];
    rows = $[14];
    style = $[15];
    t1 = $[16];
  }
  const colBehavior = t1 === void 0 ? "grow" : t1;
  const minWidthValue = typeof colMinWidth === "number" ? `${colMinWidth}px` : colMinWidth;
  let t2;
  if ($[17] !== colBehavior || $[18] !== cols || $[19] !== minWidthValue || $[20] !== rows) {
    t2 = gridTemplateCustomProperties({
      cols,
      rows,
      colMinWidth: minWidthValue,
      colBehavior
    });
    $[17] = colBehavior;
    $[18] = cols;
    $[19] = minWidthValue;
    $[20] = rows;
    $[21] = t2;
  } else {
    t2 = $[21];
  }
  const templateStyle = t2;
  let t3;
  if ($[22] !== style || $[23] !== templateStyle) {
    t3 = templateStyle ? {
      ...style,
      ...templateStyle
    } : style;
    $[22] = style;
    $[23] = templateStyle;
    $[24] = t3;
  } else {
    t3 = $[24];
  }
  const mergedStyle = t3;
  let t4;
  if ($[25] !== className || $[26] !== flow || $[27] !== gap || $[28] !== padding || $[29] !== paddingBottom || $[30] !== paddingLeft || $[31] !== paddingRight || $[32] !== paddingTop || $[33] !== paddingX || $[34] !== paddingY) {
    t4 = cx(primitiveStyles({
      gap,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft
    }), grid({
      flow
    }), className);
    $[25] = className;
    $[26] = flow;
    $[27] = gap;
    $[28] = padding;
    $[29] = paddingBottom;
    $[30] = paddingLeft;
    $[31] = paddingRight;
    $[32] = paddingTop;
    $[33] = paddingX;
    $[34] = paddingY;
    $[35] = t4;
  } else {
    t4 = $[35];
  }
  const t5 = mergedStyle;
  let t6;
  if ($[36] !== divProps || $[37] !== ref || $[38] !== t4 || $[39] !== t5) {
    t6 = /* @__PURE__ */ jsx9(Primitive.div, { className: t4, style: t5, ref, "data-testid": GridTestIds.Grid, ...divProps });
    $[36] = divProps;
    $[37] = ref;
    $[38] = t4;
    $[39] = t5;
    $[40] = t6;
  } else {
    t6 = $[40];
  }
  return t6;
});
Grid.displayName = "Grid";

// node_modules/@kui/foundations-react-core/dist/Hero/components/base/Hero.js
import { jsx as jsx17, jsxs as jsxs3 } from "react/jsx-runtime";
import { forwardRef as forwardRef11 } from "react";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroBody.js
import { jsx as jsx10 } from "react/jsx-runtime";
import { forwardRef as forwardRef4 } from "react";

// node_modules/@kui/foundations-react-core/dist/Hero/constants.js
var HeroTestIds = {
  HeroRoot: "nv-hero-root",
  HeroMedia: "nv-hero-media",
  HeroContent: "nv-hero-content",
  HeroSubheading: "nv-hero-subheading",
  HeroHeading: "nv-hero-heading",
  HeroBody: "nv-hero-body",
  HeroFooter: "nv-hero-footer"
};

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroBody.js
var HeroBody = forwardRef4((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-body ${className}` : "nv-hero-body";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx10(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroBody, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroBody.displayName = "HeroBody";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroContent.js
import { jsx as jsx11 } from "react/jsx-runtime";
import { forwardRef as forwardRef5 } from "react";
var HeroContent = forwardRef5((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-content ${className}` : "nv-hero-content";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx11(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroContent, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroContent.displayName = "HeroContent";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroFooter.js
import { jsx as jsx12 } from "react/jsx-runtime";
import { forwardRef as forwardRef6 } from "react";
var HeroFooter = forwardRef6((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-footer ${className}` : "nv-hero-footer";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx12(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroFooter, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroFooter.displayName = "HeroFooter";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroHeading.js
import { jsx as jsx13 } from "react/jsx-runtime";
import { forwardRef as forwardRef7 } from "react";
var HeroHeading = forwardRef7((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-heading ${className}` : "nv-hero-heading";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx13(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroHeading, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroHeading.displayName = "HeroHeading";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroMedia.js
import { jsx as jsx14 } from "react/jsx-runtime";
import { forwardRef as forwardRef8 } from "react";
var HeroMedia = forwardRef8((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-media ${className}` : "nv-hero-media";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx14(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroMedia, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroMedia.displayName = "HeroMedia";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroRoot.js
import { jsx as jsx15 } from "react/jsx-runtime";
import { forwardRef as forwardRef9 } from "react";
var heroRoot = cva("nv-hero-root", {
  variants: {
    mediaTheme: {
      dark: "nv-dark",
      light: "nv-light"
    }
  }
});
var HeroRoot = forwardRef9((t0, ref) => {
  const $ = c(11);
  let className;
  let mediaTheme;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      mediaTheme,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = mediaTheme;
    $[3] = props;
  } else {
    className = $[1];
    mediaTheme = $[2];
    props = $[3];
  }
  let t1;
  if ($[4] !== className || $[5] !== mediaTheme) {
    t1 = heroRoot({
      className,
      mediaTheme
    });
    $[4] = className;
    $[5] = mediaTheme;
    $[6] = t1;
  } else {
    t1 = $[6];
  }
  let t2;
  if ($[7] !== props || $[8] !== ref || $[9] !== t1) {
    t2 = /* @__PURE__ */ jsx15(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroRoot, ...props });
    $[7] = props;
    $[8] = ref;
    $[9] = t1;
    $[10] = t2;
  } else {
    t2 = $[10];
  }
  return t2;
});
HeroRoot.displayName = "HeroRoot";

// node_modules/@kui/foundations-react-core/dist/Hero/components/composed/HeroSubheading.js
import { jsx as jsx16 } from "react/jsx-runtime";
import { forwardRef as forwardRef10 } from "react";
var HeroSubheading = forwardRef10((t0, ref) => {
  const $ = c(7);
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
  } else {
    className = $[1];
    props = $[2];
  }
  const t1 = className ? `nv-hero-subheading ${className}` : "nv-hero-subheading";
  let t2;
  if ($[3] !== props || $[4] !== ref || $[5] !== t1) {
    t2 = /* @__PURE__ */ jsx16(Primitive.div, { className: t1, ref, "data-testid": HeroTestIds.HeroSubheading, ...props });
    $[3] = props;
    $[4] = ref;
    $[5] = t1;
    $[6] = t2;
  } else {
    t2 = $[6];
  }
  return t2;
});
HeroSubheading.displayName = "HeroSubheading";

// node_modules/@kui/foundations-react-core/dist/Hero/components/base/Hero.js
var Hero = forwardRef11((t0, ref) => {
  const $ = c(34);
  let attributes;
  let props;
  let slotActions;
  let slotBody;
  let slotHeading;
  let slotMedia;
  let slotSubheading;
  if ($[0] !== t0) {
    ({
      slotMedia,
      slotHeading,
      slotSubheading,
      slotBody,
      slotActions,
      attributes,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = attributes;
    $[2] = props;
    $[3] = slotActions;
    $[4] = slotBody;
    $[5] = slotHeading;
    $[6] = slotMedia;
    $[7] = slotSubheading;
  } else {
    attributes = $[1];
    props = $[2];
    slotActions = $[3];
    slotBody = $[4];
    slotHeading = $[5];
    slotMedia = $[6];
    slotSubheading = $[7];
  }
  let t1;
  if ($[8] !== attributes?.HeroMedia || $[9] !== slotMedia) {
    t1 = slotMedia && /* @__PURE__ */ jsx17(HeroMedia, { asChild: true, ...attributes?.HeroMedia, children: slotMedia });
    $[8] = attributes?.HeroMedia;
    $[9] = slotMedia;
    $[10] = t1;
  } else {
    t1 = $[10];
  }
  const t2 = attributes?.HeroContent;
  let t3;
  if ($[11] !== attributes?.HeroSubheading || $[12] !== slotSubheading) {
    t3 = slotSubheading && /* @__PURE__ */ jsx17(HeroSubheading, { ...attributes?.HeroSubheading, children: slotSubheading });
    $[11] = attributes?.HeroSubheading;
    $[12] = slotSubheading;
    $[13] = t3;
  } else {
    t3 = $[13];
  }
  const t4 = attributes?.HeroHeading;
  let t5;
  if ($[14] !== slotHeading || $[15] !== t4) {
    t5 = /* @__PURE__ */ jsx17(HeroHeading, { ...t4, children: slotHeading });
    $[14] = slotHeading;
    $[15] = t4;
    $[16] = t5;
  } else {
    t5 = $[16];
  }
  const t6 = attributes?.HeroBody;
  let t7;
  if ($[17] !== slotBody || $[18] !== t6) {
    t7 = /* @__PURE__ */ jsx17(HeroBody, { ...t6, children: slotBody });
    $[17] = slotBody;
    $[18] = t6;
    $[19] = t7;
  } else {
    t7 = $[19];
  }
  let t8;
  if ($[20] !== attributes?.HeroFooter || $[21] !== slotActions) {
    t8 = slotActions && /* @__PURE__ */ jsx17(HeroFooter, { ...attributes?.HeroFooter, children: slotActions });
    $[20] = attributes?.HeroFooter;
    $[21] = slotActions;
    $[22] = t8;
  } else {
    t8 = $[22];
  }
  let t9;
  if ($[23] !== t2 || $[24] !== t3 || $[25] !== t5 || $[26] !== t7 || $[27] !== t8) {
    t9 = /* @__PURE__ */ jsxs3(HeroContent, { ...t2, children: [
      t3,
      t5,
      t7,
      t8
    ] });
    $[23] = t2;
    $[24] = t3;
    $[25] = t5;
    $[26] = t7;
    $[27] = t8;
    $[28] = t9;
  } else {
    t9 = $[28];
  }
  let t10;
  if ($[29] !== props || $[30] !== ref || $[31] !== t1 || $[32] !== t9) {
    t10 = /* @__PURE__ */ jsxs3(HeroRoot, { ref, ...props, children: [
      t1,
      t9
    ] });
    $[29] = props;
    $[30] = ref;
    $[31] = t1;
    $[32] = t9;
    $[33] = t10;
  } else {
    t10 = $[33];
  }
  return t10;
});
Hero.displayName = "Hero";

// node_modules/@kui/foundations-react-core/dist/Text/components/base/Text.js
import { jsx as jsx18 } from "react/jsx-runtime";
import { forwardRef as forwardRef12 } from "react";

// node_modules/@kui/foundations-react-core/dist/Text/constants.js
var TextTestIds = {
  Text: "nv-text"
};

// node_modules/@kui/foundations-react-core/dist/Text/components/base/Text.js
var text = cva("nv-text", {
  variants: {
    fontFamily: {
      sans: "nv-text--font-sans",
      mono: "nv-text--font-mono"
    },
    fontWeight: {
      light: "nv-text--weight-light",
      regular: "nv-text--weight-regular",
      semibold: "nv-text--weight-semibold",
      bold: "nv-text--weight-bold"
    },
    fontStyle: {
      normal: "nv-text--style-normal",
      italic: "nv-text--style-italic"
    },
    fontSize: {
      "10": "nv-text--size-10",
      "12": "nv-text--size-12",
      "14": "nv-text--size-14",
      "16": "nv-text--size-16",
      "18": "nv-text--size-18",
      "20": "nv-text--size-20",
      "22": "nv-text--size-22",
      "24": "nv-text--size-24",
      "28": "nv-text--size-28",
      "32": "nv-text--size-32",
      "36": "nv-text--size-36",
      "40": "nv-text--size-40",
      "44": "nv-text--size-44",
      "48": "nv-text--size-48",
      "50": "nv-text--size-50",
      "56": "nv-text--size-56",
      "60": "nv-text--size-60",
      "64": "nv-text--size-64",
      "72": "nv-text--size-72",
      "80": "nv-text--size-80"
    },
    underline: {
      true: "nv-text--underline"
    },
    lineHeight: {
      "100": "nv-text--line-height-100",
      "125": "nv-text--line-height-125",
      "150": "nv-text--line-height-150",
      "175": "nv-text--line-height-175"
    },
    kind: {
      inherit: "",
      "body/bold/2xl": "nv-text--body-bold-2xl",
      "body/bold/3xl": "nv-text--body-bold-3xl",
      "body/bold/lg": "nv-text--body-bold-lg",
      "body/bold/md": "nv-text--body-bold-md",
      "body/bold/xl": "nv-text--body-bold-xl",
      "body/bold/sm": "nv-text--body-bold-sm",
      "body/bold/xs": "nv-text--body-bold-xs",
      "body/regular/lg": "nv-text--body-regular-lg",
      "body/regular/md": "nv-text--body-regular-md",
      "body/regular/sm": "nv-text--body-regular-sm",
      "body/regular/xl": "nv-text--body-regular-xl",
      "body/regular/2xl": "nv-text--body-regular-2xl",
      "body/regular/3xl": "nv-text--body-regular-3xl",
      "body/regular/xs": "nv-text--body-regular-xs",
      "body/semibold/2xl": "nv-text--body-semibold-2xl",
      "body/semibold/3xl": "nv-text--body-semibold-3xl",
      "body/semibold/lg": "nv-text--body-semibold-lg",
      "body/semibold/md": "nv-text--body-semibold-md",
      "body/semibold/sm": "nv-text--body-semibold-sm",
      "body/semibold/xl": "nv-text--body-semibold-xl",
      "body/semibold/xs": "nv-text--body-semibold-xs",
      "display/2xl": "nv-text--display-2xl",
      "display/xl": "nv-text--display-xl",
      "display/lg": "nv-text--display-lg",
      "display/md": "nv-text--display-md",
      "display/sm": "nv-text--display-sm",
      "display/xs": "nv-text--display-xs",
      "label/bold/2xl": "nv-text--label-bold-2xl",
      "label/bold/3xl": "nv-text--label-bold-3xl",
      "label/bold/lg": "nv-text--label-bold-lg",
      "label/bold/md": "nv-text--label-bold-md",
      "label/bold/sm": "nv-text--label-bold-sm",
      "label/bold/xl": "nv-text--label-bold-xl",
      "label/bold/xs": "nv-text--label-bold-xs",
      "label/light/lg": "nv-text--label-light-lg",
      "label/light/xl": "nv-text--label-light-xl",
      "label/light/2xl": "nv-text--label-light-2xl",
      "label/light/3xl": "nv-text--label-light-3xl",
      "label/light/md": "nv-text--label-light-md",
      "label/light/sm": "nv-text--label-light-sm",
      "label/light/xs": "nv-text--label-light-xs",
      "label/regular/lg": "nv-text--label-regular-lg",
      "label/regular/md": "nv-text--label-regular-md",
      "label/regular/sm": "nv-text--label-regular-sm",
      "label/regular/xs": "nv-text--label-regular-xs",
      "label/regular/xl": "nv-text--label-regular-xl",
      "label/regular/2xl": "nv-text--label-regular-2xl",
      "label/regular/3xl": "nv-text--label-regular-3xl",
      "label/semibold/lg": "nv-text--label-semibold-lg",
      "label/semibold/md": "nv-text--label-semibold-md",
      "label/semibold/sm": "nv-text--label-semibold-sm",
      "label/semibold/xl": "nv-text--label-semibold-xl",
      "label/semibold/2xl": "nv-text--label-semibold-2xl",
      "label/semibold/3xl": "nv-text--label-semibold-3xl",
      "label/semibold/xs": "nv-text--label-semibold-xs",
      "mono/md": "nv-text--mono-md",
      "mono/sm": "nv-text--mono-sm",
      "mono/lg": "nv-text--mono-lg",
      "mono/xl": "nv-text--mono-xl",
      "mono/2xl": "nv-text--mono-2xl",
      "title/2xl": "nv-text--title-2xl",
      "title/xl": "nv-text--title-xl",
      "title/lg": "nv-text--title-lg",
      "title/md": "nv-text--title-md",
      "title/sm": "nv-text--title-sm",
      "title/xs": "nv-text--title-xs"
    }
  }
});
var Text = forwardRef12((t0, ref) => {
  const $ = c(23);
  let className;
  let fontFamily;
  let fontSize;
  let fontStyle;
  let fontWeight;
  let lineHeight;
  let props;
  let t1;
  let underline;
  if ($[0] !== t0) {
    ({
      className,
      kind: t1,
      fontFamily,
      fontWeight,
      fontStyle,
      fontSize,
      lineHeight,
      underline,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = fontFamily;
    $[3] = fontSize;
    $[4] = fontStyle;
    $[5] = fontWeight;
    $[6] = lineHeight;
    $[7] = props;
    $[8] = t1;
    $[9] = underline;
  } else {
    className = $[1];
    fontFamily = $[2];
    fontSize = $[3];
    fontStyle = $[4];
    fontWeight = $[5];
    lineHeight = $[6];
    props = $[7];
    t1 = $[8];
    underline = $[9];
  }
  const kind = t1 === void 0 ? "label/regular/md" : t1;
  let t2;
  if ($[10] !== className || $[11] !== fontFamily || $[12] !== fontSize || $[13] !== fontStyle || $[14] !== fontWeight || $[15] !== kind || $[16] !== lineHeight || $[17] !== underline) {
    t2 = text({
      className,
      kind,
      fontFamily,
      fontWeight,
      fontStyle,
      fontSize,
      lineHeight,
      underline
    });
    $[10] = className;
    $[11] = fontFamily;
    $[12] = fontSize;
    $[13] = fontStyle;
    $[14] = fontWeight;
    $[15] = kind;
    $[16] = lineHeight;
    $[17] = underline;
    $[18] = t2;
  } else {
    t2 = $[18];
  }
  let t3;
  if ($[19] !== props || $[20] !== ref || $[21] !== t2) {
    t3 = /* @__PURE__ */ jsx18(Primitive.span, { className: t2, ref, "data-testid": TextTestIds.Text, ...props });
    $[19] = props;
    $[20] = ref;
    $[21] = t2;
    $[22] = t3;
  } else {
    t3 = $[22];
  }
  return t3;
});
Text.displayName = "Text";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/base/Accordion.js
import { jsx as jsx25, jsxs as jsxs5 } from "react/jsx-runtime";
import { forwardRef as forwardRef18 } from "react";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionContent.js
import { jsx as jsx21 } from "react/jsx-runtime";
import { forwardRef as forwardRef15 } from "react";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionItem.js
import { jsx as jsx20 } from "react/jsx-runtime";
import { createContext as createContext2, forwardRef as forwardRef14, useContext as useContext2 } from "react";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionRoot.js
import { jsx as jsx19 } from "react/jsx-runtime";
import { createContext, forwardRef as forwardRef13, useState, useContext } from "react";

// node_modules/@kui/foundations-react-core/dist/Accordion/constants.js
var AccordionTestIds = {
  AccordionContent: "nv-accordion-content",
  AccordionItem: "nv-accordion-item",
  AccordionRoot: "nv-accordion-root",
  AccordionTrigger: "nv-accordion-trigger"
};

// node_modules/@kui/foundations-react-core/dist/Accordion/utils.js
var normalizeToArray = (val) => {
  if (val === void 0) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
};
var getOpenState = (open) => open ? "open" : "closed";
var computeNextOpenItems = ({
  itemValue,
  willOpen,
  openItems,
  multiple,
  collapsible
}) => {
  if (multiple) {
    return willOpen ? [...openItems, itemValue] : openItems.filter((v) => v !== itemValue);
  }
  if (willOpen) {
    return [itemValue];
  }
  return collapsible ? [] : openItems;
};

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionRoot.js
var accordionRoot = cva("nv-accordion-root");
var AccordionContext = createContext(null);
var useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion compound components must be used within an AccordionRoot");
  }
  return context;
};
var isMultipleChangeHandler = (onValueChange, multiple) => multiple;
var AccordionRoot = forwardRef13((t0, ref) => {
  const $ = c(42);
  let children;
  let className;
  let controlledValue;
  let defaultValue;
  let name;
  let onValueChange;
  let props;
  let t1;
  let t2;
  let t3;
  if ($[0] !== t0) {
    ({
      className,
      collapsible: t1,
      defaultValue,
      disabled: t2,
      multiple: t3,
      name,
      onValueChange,
      value: controlledValue,
      children,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = controlledValue;
    $[4] = defaultValue;
    $[5] = name;
    $[6] = onValueChange;
    $[7] = props;
    $[8] = t1;
    $[9] = t2;
    $[10] = t3;
  } else {
    children = $[1];
    className = $[2];
    controlledValue = $[3];
    defaultValue = $[4];
    name = $[5];
    onValueChange = $[6];
    props = $[7];
    t1 = $[8];
    t2 = $[9];
    t3 = $[10];
  }
  const collapsible = t1 === void 0 ? true : t1;
  const disabled = t2 === void 0 ? false : t2;
  const multiple = t3 === void 0 ? false : t3;
  const controlled = controlledValue !== void 0;
  let t4;
  if ($[11] !== defaultValue) {
    t4 = () => normalizeToArray(defaultValue);
    $[11] = defaultValue;
    $[12] = t4;
  } else {
    t4 = $[12];
  }
  const [internalValue, setInternalValue] = useState(t4);
  let t5;
  if ($[13] !== controlled || $[14] !== controlledValue || $[15] !== internalValue) {
    t5 = controlled ? normalizeToArray(controlledValue) : internalValue;
    $[13] = controlled;
    $[14] = controlledValue;
    $[15] = internalValue;
    $[16] = t5;
  } else {
    t5 = $[16];
  }
  const openItems = t5;
  let t6;
  if ($[17] !== collapsible || $[18] !== controlled || $[19] !== disabled || $[20] !== multiple || $[21] !== onValueChange || $[22] !== openItems) {
    t6 = (itemValue, willOpen) => {
      if (disabled) {
        return;
      }
      const nextOpenItems = computeNextOpenItems({
        itemValue,
        willOpen,
        openItems,
        multiple,
        collapsible
      });
      if (!controlled) {
        setInternalValue(nextOpenItems);
      }
      if (!onValueChange) {
        return;
      }
      if (isMultipleChangeHandler(onValueChange, multiple)) {
        onValueChange(nextOpenItems);
      } else {
        onValueChange(nextOpenItems[0] ?? "");
      }
    };
    $[17] = collapsible;
    $[18] = controlled;
    $[19] = disabled;
    $[20] = multiple;
    $[21] = onValueChange;
    $[22] = openItems;
    $[23] = t6;
  } else {
    t6 = $[23];
  }
  const handleItemToggle = t6;
  const t7 = multiple ? void 0 : name;
  let t8;
  if ($[24] !== collapsible || $[25] !== disabled || $[26] !== handleItemToggle || $[27] !== multiple || $[28] !== openItems || $[29] !== t7) {
    t8 = {
      multiple,
      disabled,
      collapsible,
      openItems,
      groupName: t7,
      handleItemToggle
    };
    $[24] = collapsible;
    $[25] = disabled;
    $[26] = handleItemToggle;
    $[27] = multiple;
    $[28] = openItems;
    $[29] = t7;
    $[30] = t8;
  } else {
    t8 = $[30];
  }
  const contextValue = t8;
  let t9;
  if ($[31] !== className) {
    t9 = accordionRoot({
      className
    });
    $[31] = className;
    $[32] = t9;
  } else {
    t9 = $[32];
  }
  const t10 = disabled ? "" : void 0;
  let t11;
  if ($[33] !== children || $[34] !== props || $[35] !== ref || $[36] !== t10 || $[37] !== t9) {
    t11 = /* @__PURE__ */ jsx19(Primitive.div, { className: t9, "data-testid": AccordionTestIds.AccordionRoot, "data-disabled": t10, ref, ...props, children });
    $[33] = children;
    $[34] = props;
    $[35] = ref;
    $[36] = t10;
    $[37] = t9;
    $[38] = t11;
  } else {
    t11 = $[38];
  }
  let t12;
  if ($[39] !== contextValue || $[40] !== t11) {
    t12 = /* @__PURE__ */ jsx19(AccordionContext.Provider, { value: contextValue, children: t11 });
    $[39] = contextValue;
    $[40] = t11;
    $[41] = t12;
  } else {
    t12 = $[41];
  }
  return t12;
});
AccordionRoot.displayName = "AccordionRoot";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionItem.js
var accordionItem = cva("nv-accordion-item");
var AccordionItemContext = createContext2(null);
var useAccordionItemContext = () => {
  const context = useContext2(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem compound components must be used within an AccordionItem");
  }
  return context;
};
var AccordionItem = forwardRef14((t0, ref) => {
  const $ = c(35);
  let children;
  let className;
  let props;
  let t1;
  let value;
  if ($[0] !== t0) {
    ({
      className,
      value,
      disabled: t1,
      children,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = props;
    $[4] = t1;
    $[5] = value;
  } else {
    children = $[1];
    className = $[2];
    props = $[3];
    t1 = $[4];
    value = $[5];
  }
  const disabled = t1 === void 0 ? false : t1;
  const accordionContext = useAccordionContext();
  const itemDisabled = disabled || accordionContext.disabled;
  let t2;
  if ($[6] !== accordionContext.openItems || $[7] !== value) {
    t2 = accordionContext.openItems.includes(value);
    $[6] = accordionContext.openItems;
    $[7] = value;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  const itemOpen = t2;
  let t3;
  if ($[9] !== accordionContext || $[10] !== itemDisabled || $[11] !== itemOpen || $[12] !== value) {
    t3 = (event) => {
      if (itemDisabled) {
        event.preventDefault();
        return;
      }
      if (event.currentTarget.open === itemOpen) {
        return;
      }
      accordionContext.handleItemToggle(value, event.currentTarget.open);
    };
    $[9] = accordionContext;
    $[10] = itemDisabled;
    $[11] = itemOpen;
    $[12] = value;
    $[13] = t3;
  } else {
    t3 = $[13];
  }
  const handleToggle = t3;
  let t4;
  if ($[14] !== itemDisabled || $[15] !== itemOpen || $[16] !== value) {
    t4 = {
      value,
      disabled: itemDisabled,
      open: itemOpen
    };
    $[14] = itemDisabled;
    $[15] = itemOpen;
    $[16] = value;
    $[17] = t4;
  } else {
    t4 = $[17];
  }
  const contextValue = t4;
  const accordionName = accordionContext.groupName;
  let t5;
  if ($[18] !== className) {
    t5 = accordionItem({
      className
    });
    $[18] = className;
    $[19] = t5;
  } else {
    t5 = $[19];
  }
  let t6;
  if ($[20] !== itemOpen) {
    t6 = getOpenState(itemOpen);
    $[20] = itemOpen;
    $[21] = t6;
  } else {
    t6 = $[21];
  }
  const t7 = itemDisabled ? "" : void 0;
  let t8;
  if ($[22] !== accordionName || $[23] !== children || $[24] !== handleToggle || $[25] !== itemOpen || $[26] !== props || $[27] !== ref || $[28] !== t5 || $[29] !== t6 || $[30] !== t7) {
    t8 = /* @__PURE__ */ jsx20("details", { className: t5, "data-testid": AccordionTestIds.AccordionItem, "data-state": t6, "data-disabled": t7, name: accordionName, open: itemOpen, onToggle: handleToggle, ref, ...props, children });
    $[22] = accordionName;
    $[23] = children;
    $[24] = handleToggle;
    $[25] = itemOpen;
    $[26] = props;
    $[27] = ref;
    $[28] = t5;
    $[29] = t6;
    $[30] = t7;
    $[31] = t8;
  } else {
    t8 = $[31];
  }
  let t9;
  if ($[32] !== contextValue || $[33] !== t8) {
    t9 = /* @__PURE__ */ jsx20(AccordionItemContext.Provider, { value: contextValue, children: t8 });
    $[32] = contextValue;
    $[33] = t8;
    $[34] = t9;
  } else {
    t9 = $[34];
  }
  return t9;
});
AccordionItem.displayName = "AccordionItem";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionContent.js
var accordionContent = cva("nv-accordion-content");
var AccordionContent = forwardRef15((t0, ref) => {
  const $ = c(14);
  let children;
  let className;
  let props;
  if ($[0] !== t0) {
    ({
      className,
      children,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = props;
  } else {
    children = $[1];
    className = $[2];
    props = $[3];
  }
  const {
    open
  } = useAccordionItemContext();
  let t1;
  if ($[4] !== className) {
    t1 = accordionContent({
      className
    });
    $[4] = className;
    $[5] = t1;
  } else {
    t1 = $[5];
  }
  let t2;
  if ($[6] !== open) {
    t2 = getOpenState(open);
    $[6] = open;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  let t3;
  if ($[8] !== children || $[9] !== props || $[10] !== ref || $[11] !== t1 || $[12] !== t2) {
    t3 = /* @__PURE__ */ jsx21(Primitive.div, { className: t1, "data-testid": AccordionTestIds.AccordionContent, "data-state": t2, ref, ...props, children });
    $[8] = children;
    $[9] = props;
    $[10] = ref;
    $[11] = t1;
    $[12] = t2;
    $[13] = t3;
  } else {
    t3 = $[13];
  }
  return t3;
});
AccordionContent.displayName = "AccordionContent";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionTrigger.js
import { jsxs as jsxs4, jsx as jsx24 } from "react/jsx-runtime";
import { forwardRef as forwardRef17 } from "react";

// node_modules/@kui/foundations-react-core/dist/AnimatedChevron/components/base/AnimatedChevron.js
import { jsx as jsx23 } from "react/jsx-runtime";
import React12 from "react";

// node_modules/@kui/foundations-react-core/dist/lib/components/Icon.js
import { jsx as jsx22 } from "react/jsx-runtime";
import { forwardRef as forwardRef16 } from "react";
var icon = cva("nv-icon", {
  variants: {
    variant: {
      line: "",
      fill: "nv-icon--fill"
    }
  }
});
var Icon = forwardRef16((t0, ref) => {
  const $ = c(19);
  let className;
  let name;
  let props;
  let size;
  let style;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      name,
      variant: t1,
      size,
      style,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = name;
    $[3] = props;
    $[4] = size;
    $[5] = style;
    $[6] = t1;
  } else {
    className = $[1];
    name = $[2];
    props = $[3];
    size = $[4];
    style = $[5];
    t1 = $[6];
  }
  const variant = t1 === void 0 ? "line" : t1;
  let t2;
  if ($[7] !== size || $[8] !== style) {
    t2 = size ? {
      "--icon-font-size": `${size}px`,
      ...style
    } : style;
    $[7] = size;
    $[8] = style;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  let t3;
  if ($[10] !== className || $[11] !== variant) {
    t3 = icon({
      className,
      variant
    });
    $[10] = className;
    $[11] = variant;
    $[12] = t3;
  } else {
    t3 = $[12];
  }
  const t4 = `${t3} nv-icon-${name}`;
  const t5 = props["aria-label"] ? "false" : "true";
  let t6;
  if ($[13] !== props || $[14] !== ref || $[15] !== t2 || $[16] !== t4 || $[17] !== t5) {
    t6 = /* @__PURE__ */ jsx22("i", { style: t2, className: t4, ref, role: "img", "aria-hidden": t5, ...props });
    $[13] = props;
    $[14] = ref;
    $[15] = t2;
    $[16] = t4;
    $[17] = t5;
    $[18] = t6;
  } else {
    t6 = $[18];
  }
  return t6;
});
Icon.displayName = "Icon";

// node_modules/@kui/foundations-react-core/dist/AnimatedChevron/components/base/AnimatedChevron.js
var AnimatedChevron = React12.forwardRef((t0, ref) => {
  const $ = c(9);
  let className;
  let props;
  let state;
  if ($[0] !== t0) {
    ({
      className,
      state,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = props;
    $[3] = state;
  } else {
    className = $[1];
    props = $[2];
    state = $[3];
  }
  const t1 = className ? `nv-animated-chevron ${className}` : "nv-animated-chevron";
  let t2;
  if ($[4] !== props || $[5] !== ref || $[6] !== state || $[7] !== t1) {
    t2 = /* @__PURE__ */ jsx23(Icon, { name: "chevron-down", className: t1, "data-state": state, variant: "line", ref, ...props });
    $[4] = props;
    $[5] = ref;
    $[6] = state;
    $[7] = t1;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  return t2;
});
AnimatedChevron.displayName = "AnimatedChevron";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/composed/AccordionTrigger.js
var accordionTrigger = cva("nv-accordion-trigger", {
  variants: {
    chevronPosition: {
      start: "nv-accordion-trigger--chevron-start",
      end: "nv-accordion-trigger--chevron-end"
    }
  }
});
var AccordionTrigger = forwardRef17((t0, ref) => {
  const $ = c(30);
  let children;
  let className;
  let disabledProp;
  let onClick;
  let props;
  let t1;
  if ($[0] !== t0) {
    ({
      children,
      className,
      disabled: disabledProp,
      chevronPosition: t1,
      onClick,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = children;
    $[2] = className;
    $[3] = disabledProp;
    $[4] = onClick;
    $[5] = props;
    $[6] = t1;
  } else {
    children = $[1];
    className = $[2];
    disabledProp = $[3];
    onClick = $[4];
    props = $[5];
    t1 = $[6];
  }
  const chevronPosition = t1 === void 0 ? "end" : t1;
  const accordionContext = useAccordionContext();
  const itemContext = useAccordionItemContext();
  const {
    open
  } = itemContext;
  const disabled = disabledProp ?? itemContext.disabled;
  const canClose = accordionContext.multiple || accordionContext.collapsible;
  const shouldPreventToggle = disabled || open && !canClose;
  let t2;
  if ($[7] !== onClick || $[8] !== shouldPreventToggle) {
    t2 = (event) => {
      if (shouldPreventToggle) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };
    $[7] = onClick;
    $[8] = shouldPreventToggle;
    $[9] = t2;
  } else {
    t2 = $[9];
  }
  const handleSummaryClick = t2;
  let t3;
  if ($[10] !== chevronPosition || $[11] !== className) {
    t3 = accordionTrigger({
      className,
      chevronPosition
    });
    $[10] = chevronPosition;
    $[11] = className;
    $[12] = t3;
  } else {
    t3 = $[12];
  }
  let t4;
  if ($[13] !== open) {
    t4 = getOpenState(open);
    $[13] = open;
    $[14] = t4;
  } else {
    t4 = $[14];
  }
  const t5 = disabled ? "" : void 0;
  const t6 = disabled ? true : void 0;
  const t7 = disabled ? -1 : void 0;
  let t8;
  if ($[15] !== props || $[16] !== ref || $[17] !== t3 || $[18] !== t4 || $[19] !== t5 || $[20] !== t6 || $[21] !== t7) {
    t8 = {
      className: t3,
      "data-testid": AccordionTestIds.AccordionTrigger,
      "data-state": t4,
      "data-disabled": t5,
      "aria-disabled": t6,
      tabIndex: t7,
      ref,
      ...props
    };
    $[15] = props;
    $[16] = ref;
    $[17] = t3;
    $[18] = t4;
    $[19] = t5;
    $[20] = t6;
    $[21] = t7;
    $[22] = t8;
  } else {
    t8 = $[22];
  }
  const summaryProps = t8;
  let t9;
  if ($[23] !== children) {
    t9 = /* @__PURE__ */ jsx24("span", { className: "nv-accordion-label-text", children });
    $[23] = children;
    $[24] = t9;
  } else {
    t9 = $[24];
  }
  let t10;
  if ($[25] === /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel")) {
    t10 = /* @__PURE__ */ jsx24(AnimatedChevron, {});
    $[25] = t10;
  } else {
    t10 = $[25];
  }
  let t11;
  if ($[26] !== handleSummaryClick || $[27] !== summaryProps || $[28] !== t9) {
    t11 = /* @__PURE__ */ jsxs4("summary", { onClick: handleSummaryClick, ...summaryProps, children: [
      t9,
      t10
    ] });
    $[26] = handleSummaryClick;
    $[27] = summaryProps;
    $[28] = t9;
    $[29] = t11;
  } else {
    t11 = $[29];
  }
  return t11;
});
AccordionTrigger.displayName = "AccordionTrigger";

// node_modules/@kui/foundations-react-core/dist/Accordion/components/base/Accordion.js
var Accordion = forwardRef18((t0, ref) => {
  const $ = c(19);
  let defaultValue;
  let items;
  let multiple;
  let onValueChange;
  let props;
  let t1;
  let value;
  if ($[0] !== t0) {
    ({
      collapsible: t1,
      defaultValue,
      items,
      multiple,
      onValueChange,
      value,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = defaultValue;
    $[2] = items;
    $[3] = multiple;
    $[4] = onValueChange;
    $[5] = props;
    $[6] = t1;
    $[7] = value;
  } else {
    defaultValue = $[1];
    items = $[2];
    multiple = $[3];
    onValueChange = $[4];
    props = $[5];
    t1 = $[6];
    value = $[7];
  }
  const collapsible = t1 === void 0 ? true : t1;
  const t2 = multiple ? void 0 : collapsible;
  const t3 = defaultValue;
  const t4 = onValueChange;
  const t5 = value;
  let t6;
  if ($[8] !== items) {
    t6 = items.map(_temp);
    $[8] = items;
    $[9] = t6;
  } else {
    t6 = $[9];
  }
  let t7;
  if ($[10] !== multiple || $[11] !== props || $[12] !== ref || $[13] !== t2 || $[14] !== t3 || $[15] !== t4 || $[16] !== t5 || $[17] !== t6) {
    t7 = /* @__PURE__ */ jsx25(AccordionRoot, { collapsible: t2, multiple, defaultValue: t3, onValueChange: t4, value: t5, ref, ...props, children: t6 });
    $[10] = multiple;
    $[11] = props;
    $[12] = ref;
    $[13] = t2;
    $[14] = t3;
    $[15] = t4;
    $[16] = t5;
    $[17] = t6;
    $[18] = t7;
  } else {
    t7 = $[18];
  }
  return t7;
});
Accordion.displayName = "Accordion";
function _temp(item) {
  return /* @__PURE__ */ jsxs5(AccordionItem, { value: item.value, ...item.attributes?.AccordionItem, children: [
    /* @__PURE__ */ jsx25(AccordionTrigger, { chevronPosition: item.chevronPosition, disabled: item.disabled, ...item.attributes?.AccordionTrigger, children: item.slotTrigger }),
    /* @__PURE__ */ jsx25(AccordionContent, { ...item.attributes?.AccordionContent, children: item.slotContent })
  ] }, item.value);
}

// node_modules/@kui/foundations-react-core/dist/Tabs/components/base/Tabs.js
import { jsx as jsx30, jsxs as jsxs8 } from "react/jsx-runtime";
import { forwardRef as forwardRef19, useMemo as useMemo2 } from "react";

// node_modules/@kui/foundations-react-core/dist/lib/utils/sanitize-href.js
var DANGEROUS_SCHEME_RE = /^\s*(javascript|data|vbscript)\s*:/i;
function sanitizeHref(href) {
  if (href === void 0 || href === null) {
    return void 0;
  }
  if (DANGEROUS_SCHEME_RE.test(href)) {
    return void 0;
  }
  return href;
}
function sanitizeHrefProp(item) {
  return {
    ...item,
    href: sanitizeHref(item.href)
  };
}

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsContent.js
import { jsx as jsx26 } from "react/jsx-runtime";
import React13 from "react";

// node_modules/@kui/foundations-react-core/dist/Tabs/constants.js
var TabsTestIds = {
  TabsRoot: "nv-tabs-root",
  TabsList: "nv-tabs-list",
  TabsTrigger: "nv-tabs-trigger",
  TabsContent: "nv-tabs-content"
};

// node_modules/@kui/foundations-react-core/dist/Tabs/context.js
import { createContext as createContext3, useContext as useContext3 } from "react";
var TabsContext = createContext3(null);
var useTabsContext = () => {
  const context = useContext3(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within a TabsRoot");
  }
  return context;
};

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsContent.js
var tabsContent = cva("nv-tabs-content");
var TabsContent = React13.forwardRef((t0, ref) => {
  const $ = c(18);
  let className;
  let forceMount;
  let props;
  let unstyled;
  let value;
  if ($[0] !== t0) {
    ({
      className,
      value,
      forceMount,
      unstyled,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = forceMount;
    $[3] = props;
    $[4] = unstyled;
    $[5] = value;
  } else {
    className = $[1];
    forceMount = $[2];
    props = $[3];
    unstyled = $[4];
    value = $[5];
  }
  const {
    activeValue,
    baseId
  } = useTabsContext();
  const isActive = activeValue === value;
  if (!(isActive || forceMount)) {
    return null;
  }
  const t1 = `${baseId}-panel-${value}`;
  const t2 = `${baseId}-trigger-${value}`;
  const t3 = isActive ? "" : void 0;
  const t4 = !isActive;
  const t5 = isActive ? 0 : -1;
  let t6;
  if ($[6] !== className || $[7] !== unstyled) {
    t6 = unstyled ? className : tabsContent({
      className
    });
    $[6] = className;
    $[7] = unstyled;
    $[8] = t6;
  } else {
    t6 = $[8];
  }
  let t7;
  if ($[9] !== props || $[10] !== ref || $[11] !== t1 || $[12] !== t2 || $[13] !== t3 || $[14] !== t4 || $[15] !== t5 || $[16] !== t6) {
    t7 = /* @__PURE__ */ jsx26(Primitive.div, { role: "tabpanel", id: t1, "aria-labelledby": t2, "data-active": t3, hidden: t4, tabIndex: t5, className: t6, ref, "data-testid": TabsTestIds.TabsContent, ...props });
    $[9] = props;
    $[10] = ref;
    $[11] = t1;
    $[12] = t2;
    $[13] = t3;
    $[14] = t4;
    $[15] = t5;
    $[16] = t6;
    $[17] = t7;
  } else {
    t7 = $[17];
  }
  return t7;
});
TabsContent.displayName = "TabsContent";

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsList.js
import { jsx as jsx27, jsxs as jsxs6, Fragment as Fragment5 } from "react/jsx-runtime";
import React14, { useRef as useRef2, useState as useState2, useCallback as useCallback3, useEffect as useEffect2 } from "react";

// node_modules/@kui/foundations-react-core/dist/lib/hooks/use-roving-focus.js
import { useRef, useEffect, useCallback as useCallback2 } from "react";

// node_modules/@kui/foundations-react-core/dist/lib/utils/focus.js
var FOCUSABLE_SELECTOR = '[tabindex]:not([tabindex="-1"]):not([data-disabled]), button:not(:disabled):not([data-disabled]), [href]:not([data-disabled])';
function queryFocusableItems(container, selector, {
  includeNegativeTabIndex = false
} = {}) {
  return Array.from(container.querySelectorAll(selector)).filter((el) => !el.hasAttribute("data-disabled") && (includeNegativeTabIndex || el.tabIndex !== -1));
}
function focusElement(element) {
  if (!element) {
    return;
  }
  element.focus();
  element.scrollIntoView({
    block: "nearest"
  });
}
function getActiveItemIndex(items) {
  return items.indexOf(document.activeElement);
}

// node_modules/@kui/foundations-react-core/dist/lib/utils/navigation.js
var NAVIGATION_KEY_MAP = {
  ArrowDown: {
    delta: 1,
    axes: ["vertical"]
  },
  ArrowUp: {
    delta: -1,
    axes: ["vertical"]
  },
  ArrowRight: {
    delta: 1,
    axes: ["horizontal"]
  },
  ArrowLeft: {
    delta: -1,
    axes: ["horizontal"]
  }
};
var ARROW_KEYS = /* @__PURE__ */ new Set([...Object.keys(NAVIGATION_KEY_MAP)]);
var NAVIGATION_KEYS = /* @__PURE__ */ new Set([...Object.keys(NAVIGATION_KEY_MAP), "Home", "End"]);
function supportsAxis(direction, axis) {
  return direction === "both" || direction === axis;
}
function getNavigationDelta(key, direction) {
  const config = NAVIGATION_KEY_MAP[key];
  if (!config) {
    return null;
  }
  const isAllowed = config.axes.some((axis) => supportsAxis(direction, axis));
  return isAllowed ? config.delta : null;
}
function calculateWrappedIndex(currentIndex, itemCount, delta, loop) {
  const nextIndex = currentIndex + delta;
  if (nextIndex >= itemCount) {
    return loop ? 0 : itemCount - 1;
  }
  if (nextIndex < 0) {
    return loop ? itemCount - 1 : 0;
  }
  return nextIndex;
}
function resolveNavigationIndex(key, currentIndex, itemCount, direction, loop) {
  if (key === "Home") {
    return 0;
  }
  if (key === "End") {
    return itemCount - 1;
  }
  const delta = getNavigationDelta(key, direction);
  if (delta === null) {
    return null;
  }
  return calculateWrappedIndex(currentIndex, itemCount, delta, loop);
}

// node_modules/@kui/foundations-react-core/dist/lib/hooks/use-roving-focus.js
var TYPEAHEAD_TIMEOUT_MS = 500;
var TYPEAHEAD_EXCLUDED_KEYS = /* @__PURE__ */ new Set([" ", "Enter", "Tab", "Escape"]);
var TypeaheadBuffer = class {
  constructor() {
    this.buffer = "";
    this.timeoutId = null;
  }
  append(char) {
    this.clearPendingReset();
    this.buffer += char;
    this.timeoutId = setTimeout(() => this.reset(), TYPEAHEAD_TIMEOUT_MS);
    return this.buffer;
  }
  dispose() {
    this.clearPendingReset();
    this.buffer = "";
  }
  reset() {
    this.buffer = "";
    this.timeoutId = null;
  }
  clearPendingReset() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
};
function isTypeaheadKey(event) {
  if (event.key.length !== 1) {
    return false;
  }
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return false;
  }
  if (TYPEAHEAD_EXCLUDED_KEYS.has(event.key)) {
    return false;
  }
  const target = event.target;
  const tagName = target.tagName.toLowerCase();
  return tagName !== "input" && tagName !== "textarea" && !target.isContentEditable;
}
function findTypeaheadMatch(items, searchString, startIndex) {
  const normalizedSearch = searchString.toLowerCase();
  for (let indexOffset = 0; indexOffset < items.length; indexOffset++) {
    const index = (startIndex + indexOffset) % items.length;
    const textContent = (items[index]?.textContent || "").trim().toLowerCase();
    if (textContent.startsWith(normalizedSearch)) {
      return index;
    }
  }
  return null;
}
function useRovingFocus({
  direction = "vertical",
  loop = true,
  itemSelector = FOCUSABLE_SELECTOR,
  typeahead = true,
  includeNegativeTabIndex = false
} = {}) {
  const containerRef = useRef(null);
  const typeaheadRef = useRef(null);
  if (typeahead && typeaheadRef.current === null) {
    typeaheadRef.current = new TypeaheadBuffer();
  }
  useEffect(() => {
    if (!typeahead) {
      return;
    }
    const buffer = typeaheadRef.current;
    return () => buffer?.dispose();
  }, [typeahead]);
  const handleKeyDown = useCallback2((event) => {
    if (!containerRef.current) {
      return;
    }
    const isNavigationKey = NAVIGATION_KEYS.has(event.key);
    const shouldHandleTypeahead = typeahead && isTypeaheadKey(event);
    if (!(isNavigationKey || shouldHandleTypeahead)) {
      return;
    }
    const items = queryFocusableItems(containerRef.current, itemSelector, {
      includeNegativeTabIndex
    });
    if (items.length === 0) {
      return;
    }
    const currentIndex = getActiveItemIndex(items);
    if (isNavigationKey) {
      const nextIndex = resolveNavigationIndex(event.key, currentIndex, items.length, direction, loop);
      if (nextIndex !== null && nextIndex !== currentIndex) {
        event.preventDefault();
        focusElement(items[nextIndex]);
      }
      return;
    }
    if (shouldHandleTypeahead && typeaheadRef.current) {
      event.preventDefault();
      const searchString = typeaheadRef.current.append(event.key);
      const startIndex = currentIndex >= 0 ? currentIndex : 0;
      const matchIndex = findTypeaheadMatch(items, searchString, startIndex);
      if (matchIndex !== null) {
        focusElement(items[matchIndex]);
      }
    }
  }, [direction, loop, itemSelector, typeahead, includeNegativeTabIndex]);
  return {
    containerRef,
    handleKeyDown
  };
}

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsList.js
var tabsList = cva("nv-tabs-list", {
  variants: {
    kind: {
      primary: "nv-tabs-list--kind-primary",
      secondary: "nv-tabs-list--kind-secondary",
      tertiary: "nv-tabs-list--kind-tertiary"
    }
  },
  defaultVariants: {
    kind: "primary"
  }
});
var TabsList = React14.forwardRef(({
  className,
  kind = "primary",
  children,
  asChild,
  onKeyDown,
  onBlur,
  hideOverflowButtons = false,
  visibleRange,
  unstyled,
  ...props
}, ref) => {
  const Component = asChild ? Slot : "div";
  const scrollContainerRef = useRef2(null);
  const scrollFrameRef = useRef2(null);
  const [canScrollLeft, setCanScrollLeft] = useState2(false);
  const [canScrollRight, setCanScrollRight] = useState2(false);
  const {
    baseId,
    setFocusedValue
  } = useTabsContext();
  const {
    containerRef: rovingRef,
    handleKeyDown
  } = useRovingFocus({
    direction: "horizontal",
    loop: true,
    includeNegativeTabIndex: true,
    itemSelector: '[role="tab"]:not([data-disabled])',
    typeahead: false
  });
  const handleTabsListKeyDown = useCallback3((event) => {
    handleKeyDown(event);
    onKeyDown?.(event);
  }, [handleKeyDown, onKeyDown]);
  const handleTabsListBlur = useCallback3((event_0) => {
    if (event_0.relatedTarget instanceof Node && event_0.currentTarget.contains(event_0.relatedTarget)) {
      onBlur?.(event_0);
      return;
    }
    setFocusedValue(void 0);
    onBlur?.(event_0);
  }, [onBlur, setFocusedValue]);
  const mergedScrollRef = useCallback3((node) => {
    scrollContainerRef.current = node;
    rovingRef.current = node;
  }, [rovingRef]);
  const renderChildrenWithRange = useCallback3((children_0) => {
    if (!(visibleRange && React14.Children.count(children_0))) {
      return children_0;
    }
    const childArray = React14.Children.toArray(children_0);
    const result = [];
    let lastIndex = -1;
    visibleRange.forEach((index) => {
      if (lastIndex !== -1 && index - lastIndex > 1) {
        result.push(/* @__PURE__ */ jsx27("span", { className: "nv-tabs-scroll-container-ellipses", children: "..." }, `ellipsis-${lastIndex}-${index}`));
      }
      const child = childArray[index - 1];
      if (child) {
        result.push(child);
      }
      lastIndex = index;
    });
    return result;
  }, [visibleRange]);
  const isHorizontallyVisibleInContainer = useCallback3((containerRect, elRect) => {
    const allowedMargin = 1;
    return elRect.left >= containerRect.left - allowedMargin && elRect.right <= containerRect.right + allowedMargin;
  }, []);
  const getFirstElementVisibleFromLeft = useCallback3((container, elements) => {
    for (const element of elements) {
      if (isHorizontallyVisibleInContainer(container, element.getBoundingClientRect())) {
        return element;
      }
    }
    return null;
  }, [isHorizontallyVisibleInContainer]);
  const checkScroll = useCallback3(() => {
    const element_0 = scrollContainerRef.current;
    if (!element_0) {
      return;
    }
    setCanScrollLeft(element_0.scrollLeft > 0);
    setCanScrollRight(Math.ceil(element_0.scrollLeft + element_0.clientWidth) < Math.floor(element_0.scrollWidth));
  }, []);
  const scheduleCheckScroll = useCallback3(() => {
    if (scrollFrameRef.current !== null) {
      return;
    }
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      checkScroll();
    });
  }, [checkScroll]);
  useEffect2(() => {
    const element_1 = scrollContainerRef.current;
    if (!element_1) {
      return;
    }
    const observer = new ResizeObserver(scheduleCheckScroll);
    observer.observe(element_1);
    element_1.addEventListener("scroll", scheduleCheckScroll, {
      passive: true
    });
    checkScroll();
    return () => {
      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
        scrollFrameRef.current = null;
      }
      observer.disconnect();
      element_1.removeEventListener("scroll", scheduleCheckScroll);
    };
  }, [checkScroll, scheduleCheckScroll]);
  useEffect2(() => {
    checkScroll();
  }, [checkScroll, children, visibleRange]);
  const scroll = useCallback3((direction) => {
    const container_0 = scrollContainerRef.current;
    if (!container_0) {
      return;
    }
    const containerRect_0 = container_0.getBoundingClientRect();
    const menuItems = Array.from(container_0.children);
    const searchSiblingKey = direction === "right" ? "nextElementSibling" : "previousElementSibling";
    const testElement = getFirstElementVisibleFromLeft(containerRect_0, menuItems);
    const candidate = testElement?.[searchSiblingKey];
    if (candidate) {
      const rect = candidate.getBoundingClientRect();
      const scrollAmount = rect.left - containerRect_0.left;
      container_0.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    }
  }, [getFirstElementVisibleFromLeft]);
  return /* @__PURE__ */ jsx27(Component, { role: "tablist", onKeyDown: handleTabsListKeyDown, onBlur: handleTabsListBlur, className: unstyled ? className : tabsList({
    kind,
    className
  }), ref, "data-testid": TabsTestIds.TabsList, ...props, children: /* @__PURE__ */ jsx27(Slottable, { asChild, child: children, children: (child_0) => /* @__PURE__ */ jsxs6(Fragment5, { children: [
    !hideOverflowButtons && canScrollLeft && /* @__PURE__ */ jsx27(Button, { kind: "tertiary", color: "neutral", onClick: () => scroll("left"), "aria-label": "Scroll left", "aria-controls": `${baseId}-scroll-region`, "aria-hidden": "true", tabIndex: -1, className: "nv-tabs-scroll-button", children: /* @__PURE__ */ jsx27(Icon, { name: "chevron-left" }) }),
    /* @__PURE__ */ jsx27("div", { id: `${baseId}-scroll-region`, ref: mergedScrollRef, className: cx("nv-tabs-scroll-container", {
      "nv-tabs-scroll-container--fade-left": canScrollLeft,
      "nv-tabs-scroll-container--fade-right": canScrollRight,
      "nv-tabs-scroll-container--fade-both": canScrollLeft && canScrollRight
    }), children: renderChildrenWithRange(child_0) }),
    !hideOverflowButtons && canScrollRight && /* @__PURE__ */ jsx27(Button, { kind: "tertiary", color: "neutral", onClick: () => scroll("right"), "aria-label": "Scroll right", "aria-controls": `${baseId}-scroll-region`, "aria-hidden": "true", tabIndex: -1, className: "nv-tabs-scroll-button", children: /* @__PURE__ */ jsx27(Icon, { name: "chevron-right" }) })
  ] }) }) });
});
TabsList.displayName = "TabsList";

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsRoot.js
import { jsx as jsx28 } from "react/jsx-runtime";
import React15, { useState as useState3, useId } from "react";
var tabsRoot = cva("nv-tabs-root");
var TabsRoot = React15.forwardRef((t0, ref) => {
  const $ = c(29);
  let className;
  let defaultValue;
  let onValueChange;
  let panelValues;
  let props;
  let t1;
  let unstyled;
  let value;
  if ($[0] !== t0) {
    ({
      activationMode: t1,
      value,
      defaultValue,
      onValueChange,
      panelValues,
      className,
      unstyled,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = defaultValue;
    $[3] = onValueChange;
    $[4] = panelValues;
    $[5] = props;
    $[6] = t1;
    $[7] = unstyled;
    $[8] = value;
  } else {
    className = $[1];
    defaultValue = $[2];
    onValueChange = $[3];
    panelValues = $[4];
    props = $[5];
    t1 = $[6];
    unstyled = $[7];
    value = $[8];
  }
  const activationMode = t1 === void 0 ? "manual" : t1;
  const controlled = value !== void 0;
  const [internalValue, setInternalValue] = useState3(defaultValue ?? "");
  const [focusedValue, setFocusedValue] = useState3();
  const activeValue = controlled ? value : internalValue;
  const baseId = useId();
  let t2;
  if ($[9] !== controlled || $[10] !== onValueChange) {
    t2 = (newValue) => {
      if (!controlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    $[9] = controlled;
    $[10] = onValueChange;
    $[11] = t2;
  } else {
    t2 = $[11];
  }
  const setActiveValue = t2;
  let t3;
  if ($[12] !== activationMode || $[13] !== activeValue || $[14] !== baseId || $[15] !== focusedValue || $[16] !== panelValues || $[17] !== setActiveValue) {
    t3 = {
      activeValue,
      setActiveValue,
      focusedValue,
      setFocusedValue,
      activationMode,
      baseId,
      panelValues
    };
    $[12] = activationMode;
    $[13] = activeValue;
    $[14] = baseId;
    $[15] = focusedValue;
    $[16] = panelValues;
    $[17] = setActiveValue;
    $[18] = t3;
  } else {
    t3 = $[18];
  }
  const contextValue = t3;
  let t4;
  if ($[19] !== className || $[20] !== unstyled) {
    t4 = unstyled ? className : tabsRoot({
      className
    });
    $[19] = className;
    $[20] = unstyled;
    $[21] = t4;
  } else {
    t4 = $[21];
  }
  let t5;
  if ($[22] !== props || $[23] !== ref || $[24] !== t4) {
    t5 = /* @__PURE__ */ jsx28(Primitive.div, { ref, "data-testid": TabsTestIds.TabsRoot, className: t4, ...props });
    $[22] = props;
    $[23] = ref;
    $[24] = t4;
    $[25] = t5;
  } else {
    t5 = $[25];
  }
  let t6;
  if ($[26] !== contextValue || $[27] !== t5) {
    t6 = /* @__PURE__ */ jsx28(TabsContext.Provider, { value: contextValue, children: t5 });
    $[26] = contextValue;
    $[27] = t5;
    $[28] = t6;
  } else {
    t6 = $[28];
  }
  return t6;
});
TabsRoot.displayName = "TabsRoot";

// node_modules/@kui/foundations-react-core/dist/Tabs/components/composed/TabsTrigger.js
import { jsx as jsx29, jsxs as jsxs7, Fragment as Fragment6 } from "react/jsx-runtime";
import React16 from "react";
var tabsTrigger = cva("nv-tabs-trigger");
var TabsTrigger = React16.forwardRef((t0, ref) => {
  const $ = c(63);
  let asChild;
  let children;
  let className;
  let disabled;
  let onClick;
  let onFocus;
  let onKeyDown;
  let props;
  let t1;
  let type;
  let value;
  if ($[0] !== t0) {
    ({
      asChild,
      children,
      className,
      value,
      disabled,
      onFocus,
      onClick,
      onKeyDown,
      renderSpacingElement: t1,
      type,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = asChild;
    $[2] = children;
    $[3] = className;
    $[4] = disabled;
    $[5] = onClick;
    $[6] = onFocus;
    $[7] = onKeyDown;
    $[8] = props;
    $[9] = t1;
    $[10] = type;
    $[11] = value;
  } else {
    asChild = $[1];
    children = $[2];
    className = $[3];
    disabled = $[4];
    onClick = $[5];
    onFocus = $[6];
    onKeyDown = $[7];
    props = $[8];
    t1 = $[9];
    type = $[10];
    value = $[11];
  }
  const renderSpacingElement = t1 === void 0 ? true : t1;
  const {
    activeValue,
    setActiveValue,
    focusedValue,
    setFocusedValue,
    activationMode,
    baseId,
    panelValues
  } = useTabsContext();
  const isActive = activeValue === value;
  const isTabStop = (focusedValue ?? activeValue) === value;
  const hasPanel = panelValues?.has(value) ?? false;
  const Component = asChild ? Slot : "button";
  let t2;
  if ($[12] !== asChild || $[13] !== children) {
    t2 = asChild && isNativeButtonChild(children);
    $[12] = asChild;
    $[13] = children;
    $[14] = t2;
  } else {
    t2 = $[14];
  }
  const hasNativeButtonChild = t2;
  let t3;
  if ($[15] !== disabled || $[16] !== setActiveValue || $[17] !== setFocusedValue || $[18] !== value) {
    t3 = () => {
      if (disabled) {
        return;
      }
      setFocusedValue(value);
      setActiveValue(value);
    };
    $[15] = disabled;
    $[16] = setActiveValue;
    $[17] = setFocusedValue;
    $[18] = value;
    $[19] = t3;
  } else {
    t3 = $[19];
  }
  const activateTab = t3;
  let t4;
  if ($[20] !== activationMode || $[21] !== disabled || $[22] !== onFocus || $[23] !== setActiveValue || $[24] !== setFocusedValue || $[25] !== value) {
    t4 = (event) => {
      setFocusedValue(value);
      if (!(disabled || activationMode !== "automatic")) {
        setActiveValue(value);
      }
      onFocus?.(event);
    };
    $[20] = activationMode;
    $[21] = disabled;
    $[22] = onFocus;
    $[23] = setActiveValue;
    $[24] = setFocusedValue;
    $[25] = value;
    $[26] = t4;
  } else {
    t4 = $[26];
  }
  const handleFocus = t4;
  let t5;
  if ($[27] !== activateTab || $[28] !== onClick) {
    t5 = (event_0) => {
      activateTab();
      onClick?.(event_0);
    };
    $[27] = activateTab;
    $[28] = onClick;
    $[29] = t5;
  } else {
    t5 = $[29];
  }
  const handleClick = t5;
  let t6;
  if ($[30] !== activateTab || $[31] !== activationMode || $[32] !== asChild || $[33] !== disabled || $[34] !== hasNativeButtonChild || $[35] !== onKeyDown) {
    t6 = (event_1) => {
      const usesNativeEnter = event_1.key === "Enter" && event_1.currentTarget instanceof HTMLAnchorElement;
      const shouldActivateSlottedManualTab = !disabled && activationMode === "manual" && asChild && !hasNativeButtonChild && (event_1.key === " " || event_1.key === "Enter") && !usesNativeEnter;
      if (shouldActivateSlottedManualTab) {
        event_1.preventDefault();
        activateTab();
      }
      onKeyDown?.(event_1);
    };
    $[30] = activateTab;
    $[31] = activationMode;
    $[32] = asChild;
    $[33] = disabled;
    $[34] = hasNativeButtonChild;
    $[35] = onKeyDown;
    $[36] = t6;
  } else {
    t6 = $[36];
  }
  const handleKeyDown = t6;
  const t7 = `${baseId}-trigger-${value}`;
  const t8 = disabled || void 0;
  const t9 = isActive && hasPanel ? `${baseId}-panel-${value}` : void 0;
  const t10 = isActive ? "" : void 0;
  const t11 = disabled ? "" : void 0;
  let t12;
  if ($[37] !== className) {
    t12 = tabsTrigger({
      className
    });
    $[37] = className;
    $[38] = t12;
  } else {
    t12 = $[38];
  }
  const t13 = asChild && !hasNativeButtonChild ? type : type ?? "button";
  const t14 = isTabStop && !disabled ? 0 : -1;
  let t15;
  if ($[39] !== renderSpacingElement) {
    t15 = (child) => /* @__PURE__ */ jsxs7(Fragment6, { children: [
      /* @__PURE__ */ jsx29("span", { className: "nv-tabs-trigger-visible", children: child }),
      renderSpacingElement && /* @__PURE__ */ jsx29("span", { "aria-hidden": "true", className: "nv-tabs-trigger-invisible", children: child })
    ] });
    $[39] = renderSpacingElement;
    $[40] = t15;
  } else {
    t15 = $[40];
  }
  let t16;
  if ($[41] !== asChild || $[42] !== children || $[43] !== t15) {
    t16 = /* @__PURE__ */ jsx29(Slottable, { asChild, child: children, children: t15 });
    $[41] = asChild;
    $[42] = children;
    $[43] = t15;
    $[44] = t16;
  } else {
    t16 = $[44];
  }
  let t17;
  if ($[45] !== Component || $[46] !== disabled || $[47] !== handleClick || $[48] !== handleFocus || $[49] !== handleKeyDown || $[50] !== isActive || $[51] !== props || $[52] !== ref || $[53] !== t10 || $[54] !== t11 || $[55] !== t12 || $[56] !== t13 || $[57] !== t14 || $[58] !== t16 || $[59] !== t7 || $[60] !== t8 || $[61] !== t9) {
    t17 = /* @__PURE__ */ jsx29(Component, { role: "tab", id: t7, "aria-disabled": t8, "aria-selected": isActive, "aria-controls": t9, "data-active": t10, "data-disabled": t11, disabled, className: t12, ref, "data-testid": TabsTestIds.TabsTrigger, onFocus: handleFocus, onClick: handleClick, onKeyDown: handleKeyDown, type: t13, ...props, tabIndex: t14, children: t16 });
    $[45] = Component;
    $[46] = disabled;
    $[47] = handleClick;
    $[48] = handleFocus;
    $[49] = handleKeyDown;
    $[50] = isActive;
    $[51] = props;
    $[52] = ref;
    $[53] = t10;
    $[54] = t11;
    $[55] = t12;
    $[56] = t13;
    $[57] = t14;
    $[58] = t16;
    $[59] = t7;
    $[60] = t8;
    $[61] = t9;
    $[62] = t17;
  } else {
    t17 = $[62];
  }
  return t17;
});
TabsTrigger.displayName = "TabsTrigger";

// node_modules/@kui/foundations-react-core/dist/Tabs/components/base/Tabs.js
var Tabs = forwardRef19(({
  items,
  kind = "primary",
  value,
  defaultValue = items[0]?.value,
  onValueChange,
  activationMode,
  renderLink,
  attributes,
  visibleRange,
  hideOverflowButtons,
  slotStart,
  slotEnd,
  ...props
}, ref) => {
  const safeItems = useMemo2(() => items.map(sanitizeHrefProp), [items]);
  const InnerRoot = safeItems.some((item) => item.href != null) ? "nav" : "div";
  const panelValues = useMemo2(() => new Set(safeItems.filter((item_0) => item_0.slotContent !== void 0).map((item_1) => item_1.value)), [safeItems]);
  return /* @__PURE__ */ jsx30(TabsRoot, { ref, value, defaultValue, onValueChange, activationMode, panelValues, asChild: true, ...props, children: /* @__PURE__ */ jsxs8(InnerRoot, { children: [
    items.length > 0 && /* @__PURE__ */ jsxs8(TabsList, { kind, visibleRange, hideOverflowButtons, ...attributes?.TabsList, children: [
      slotStart,
      safeItems.map((item_2) => {
        const sanitizedHref = item_2.href;
        const hasHref = typeof sanitizedHref === "string";
        return /* @__PURE__ */ jsx30(TabsTrigger, { asChild: hasHref || item_2.asChild, value: item_2.value, disabled: item_2.disabled, ...item_2.attributes?.TabsTrigger, children: hasHref ? renderLink ? renderLink({
          ...item_2,
          href: sanitizedHref
        }) : /* @__PURE__ */ jsx30(Primitive.a, { asChild: item_2.asChild, href: sanitizedHref, children: item_2.children }) : item_2.children }, item_2.value);
      }),
      slotEnd
    ] }),
    safeItems.map((item_3) => item_3.slotContent && /* @__PURE__ */ jsx30(TabsContent, { value: item_3.value, ...item_3.attributes?.TabsContent, children: item_3.slotContent }, item_3.value))
  ] }) });
});
Tabs.displayName = "Tabs";

// node_modules/@kui/foundations-react-core/dist/InputShell/components/base/InputShell.js
import { jsx as jsx31 } from "react/jsx-runtime";
import { forwardRef as forwardRef20 } from "react";
var inputShell = cva("nv-input-shell", {
  variants: {
    kind: {
      flat: "",
      floating: "nv-input-shell--kind-floating"
    },
    layout: {
      horizontal: "",
      vertical: "nv-input-shell--layout-vertical"
    },
    size: {
      small: "nv-input-shell--size-small",
      medium: "",
      large: "nv-input-shell--size-large"
    },
    withValidation: {
      true: "nv-input-shell--validated"
    }
  }
});
var InputShell = forwardRef20((t0, ref) => {
  const $ = c(23);
  let className;
  let onClick;
  let props;
  let size;
  let t1;
  let t2;
  let t3;
  let withValidation;
  if ($[0] !== t0) {
    ({
      className,
      disableFocusRedirect: t1,
      kind: t2,
      layout: t3,
      onClick,
      size,
      withValidation,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = onClick;
    $[3] = props;
    $[4] = size;
    $[5] = t1;
    $[6] = t2;
    $[7] = t3;
    $[8] = withValidation;
  } else {
    className = $[1];
    onClick = $[2];
    props = $[3];
    size = $[4];
    t1 = $[5];
    t2 = $[6];
    t3 = $[7];
    withValidation = $[8];
  }
  const disableFocusRedirect = t1 === void 0 ? false : t1;
  const kind = t2 === void 0 ? "flat" : t2;
  const layout = t3 === void 0 ? "horizontal" : t3;
  let t4;
  if ($[9] !== disableFocusRedirect || $[10] !== onClick) {
    t4 = (event) => {
      onClick?.(event);
      if (!disableFocusRedirect) {
        const currentElement = event.currentTarget;
        const focusableElement = currentElement.querySelector("input, textarea, select, [data-input-slot]");
        if (focusableElement instanceof HTMLInputElement && focusableElement.type === "file") {
          focusableElement.click();
        } else {
          focusableElement?.focus();
        }
      }
    };
    $[9] = disableFocusRedirect;
    $[10] = onClick;
    $[11] = t4;
  } else {
    t4 = $[11];
  }
  const handleClick = t4;
  let t5;
  if ($[12] !== className || $[13] !== kind || $[14] !== layout || $[15] !== size || $[16] !== withValidation) {
    t5 = inputShell({
      className,
      kind,
      layout,
      size,
      withValidation
    });
    $[12] = className;
    $[13] = kind;
    $[14] = layout;
    $[15] = size;
    $[16] = withValidation;
    $[17] = t5;
  } else {
    t5 = $[17];
  }
  let t6;
  if ($[18] !== handleClick || $[19] !== props || $[20] !== ref || $[21] !== t5) {
    t6 = /* @__PURE__ */ jsx31(Primitive.div, { className: t5, ref, onClick: handleClick, ...props });
    $[18] = handleClick;
    $[19] = props;
    $[20] = ref;
    $[21] = t5;
    $[22] = t6;
  } else {
    t6 = $[22];
  }
  return t6;
});
InputShell.displayName = "InputShell";

// node_modules/@kui/foundations-react-core/dist/InputShell/components/composed/InputDismissButton.js
import { jsx as jsx32 } from "react/jsx-runtime";
import { forwardRef as forwardRef21 } from "react";
var inputDismissButton = cva("nv-dismiss-button");
var InputDismissButton = forwardRef21(({
  className,
  children = /* @__PURE__ */ jsx32(Icon, { name: "close" }),
  kind = "tertiary",
  size = "small",
  ...props
}, ref) => {
  return /* @__PURE__ */ jsx32(Button, { "aria-label": "Clear", ref, className: inputDismissButton({
    className
  }), kind, size, ...props, children });
});
InputDismissButton.displayName = "InputDismissButton";
export {
  Accordion,
  Button,
  Card,
  Flex,
  Grid,
  Hero,
  InputDismissButton,
  InputShell,
  Tabs,
  Text
};
