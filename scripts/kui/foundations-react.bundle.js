// node_modules/@kui/foundations-react-core/dist/Button/components/base/Button.js
import { jsx as jsx3 } from "react/jsx-runtime";

// scripts/kui/react-compiler-runtime.shim.js
import { useMemo } from "react";
var EMPTY = Symbol.for("react.memo_cache_sentinel");
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
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
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
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
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
  const Node = React3.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx2(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
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

// node_modules/@kui/foundations-react-core/dist/ProgressBar/components/base/ProgressBar.js
import { jsx as jsx20 } from "react/jsx-runtime";
import { forwardRef as forwardRef13 } from "react";

// node_modules/@radix-ui/react-progress/dist/index.mjs
import * as React13 from "react";

// node_modules/@radix-ui/react-context/dist/index.mjs
import * as React12 from "react";
import { jsx as jsx18 } from "react/jsx-runtime";
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React12.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = React12.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx18(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext22(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React12.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext22];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React12.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React12.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React12.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// node_modules/@radix-ui/react-progress/dist/index.mjs
import { jsx as jsx19 } from "react/jsx-runtime";
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext, createProgressScope] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress = React13.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsx19(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsx19(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = React13.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsx19(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress;
var Indicator = ProgressIndicator;

// node_modules/@kui/foundations-react-core/dist/ProgressBar/constants.js
var ProgressBarTestIds = {
  Track: "nv-progress-bar-track",
  Indicator: "nv-progress-bar-indicator"
};

// node_modules/@kui/foundations-react-core/dist/ProgressBar/components/base/ProgressBar.js
var progressBar = cva("nv-progress-bar-root", {
  variants: {
    kind: {
      determinate: "",
      indeterminate: "nv-progress-bar-root--indeterminate"
    },
    size: {
      small: "nv-progress-bar-root--size-small",
      medium: "",
      large: "nv-progress-bar-root--size-large"
    }
  }
});
var ProgressBar = forwardRef13((t0, ref) => {
  const $ = c(23);
  let className;
  let kind;
  let props;
  let size;
  let value;
  if ($[0] !== t0) {
    ({
      className,
      value,
      kind,
      size,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = kind;
    $[3] = props;
    $[4] = size;
    $[5] = value;
  } else {
    className = $[1];
    kind = $[2];
    props = $[3];
    size = $[4];
    value = $[5];
  }
  const isIndeterminate = kind === "indeterminate";
  const normalizedValue = isIndeterminate ? null : Math.min(Math.max(value ?? 0, 0), 100);
  let t1;
  if ($[6] !== className || $[7] !== kind || $[8] !== size) {
    t1 = progressBar({
      className,
      kind,
      size
    });
    $[6] = className;
    $[7] = kind;
    $[8] = size;
    $[9] = t1;
  } else {
    t1 = $[9];
  }
  let t2;
  if ($[10] !== isIndeterminate || $[11] !== normalizedValue) {
    t2 = isIndeterminate ? void 0 : {
      width: `${normalizedValue}%`
    };
    $[10] = isIndeterminate;
    $[11] = normalizedValue;
    $[12] = t2;
  } else {
    t2 = $[12];
  }
  let t3;
  if ($[13] !== t2) {
    t3 = /* @__PURE__ */ jsx20(Indicator, { className: "nv-progress-bar-indicator", "data-testid": ProgressBarTestIds.Indicator, style: t2 });
    $[13] = t2;
    $[14] = t3;
  } else {
    t3 = $[14];
  }
  let t4;
  if ($[15] !== props || $[16] !== ref || $[17] !== t1 || $[18] !== t3) {
    t4 = /* @__PURE__ */ jsx20("div", { className: t1, "data-testid": ProgressBarTestIds.Track, ref, ...props, children: t3 });
    $[15] = props;
    $[16] = ref;
    $[17] = t1;
    $[18] = t3;
    $[19] = t4;
  } else {
    t4 = $[19];
  }
  let t5;
  if ($[20] !== normalizedValue || $[21] !== t4) {
    t5 = /* @__PURE__ */ jsx20(Root, { asChild: true, value: normalizedValue, children: t4 });
    $[20] = normalizedValue;
    $[21] = t4;
    $[22] = t5;
  } else {
    t5 = $[22];
  }
  return t5;
});
ProgressBar.displayName = "ProgressBar";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/base/SegmentedControl.js
import { jsx as jsx24, jsxs as jsxs4 } from "react/jsx-runtime";
import { forwardRef as forwardRef17 } from "react";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/composed/SegmentedControlInput.js
import { jsx as jsx21 } from "react/jsx-runtime";
import { forwardRef as forwardRef14 } from "react";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/context.js
import { createContext as createContext2, useContext as useContext2 } from "react";
var SegmentedControlContext = createContext2({});
function useSegmentedControlContext() {
  const context = useContext2(SegmentedControlContext);
  if (!context) {
    throw new Error("SegmentedControlContext must be used within a SegmentedControlRoot");
  }
  return context;
}

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/composed/SegmentedControlInput.js
var segmentedControlInput = cva("nv-segmented-control-input");
var SegmentedControlInput = forwardRef14((t0, ref) => {
  const $ = c(20);
  let className;
  let onChange;
  let props;
  let t1;
  let value;
  if ($[0] !== t0) {
    ({
      className,
      value,
      onChange,
      type: t1,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = onChange;
    $[3] = props;
    $[4] = t1;
    $[5] = value;
  } else {
    className = $[1];
    onChange = $[2];
    props = $[3];
    t1 = $[4];
    value = $[5];
  }
  const type = t1 === void 0 ? "radio" : t1;
  const {
    name,
    onValueChange
  } = useSegmentedControlContext();
  let t2;
  if ($[6] !== className) {
    t2 = segmentedControlInput({
      className
    });
    $[6] = className;
    $[7] = t2;
  } else {
    t2 = $[7];
  }
  let t3;
  if ($[8] !== onChange || $[9] !== onValueChange || $[10] !== value) {
    t3 = (event) => {
      onChange?.(event);
      onValueChange?.(value);
    };
    $[8] = onChange;
    $[9] = onValueChange;
    $[10] = value;
    $[11] = t3;
  } else {
    t3 = $[11];
  }
  let t4;
  if ($[12] !== name || $[13] !== props || $[14] !== ref || $[15] !== t2 || $[16] !== t3 || $[17] !== type || $[18] !== value) {
    t4 = /* @__PURE__ */ jsx21("input", { className: t2, type, value, name, onChange: t3, ref, ...props });
    $[12] = name;
    $[13] = props;
    $[14] = ref;
    $[15] = t2;
    $[16] = t3;
    $[17] = type;
    $[18] = value;
    $[19] = t4;
  } else {
    t4 = $[19];
  }
  return t4;
});
SegmentedControlInput.displayName = "SegmentedControlInput";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/composed/SegmentedControlItem.js
import { jsx as jsx22 } from "react/jsx-runtime";
import { forwardRef as forwardRef15 } from "react";
var segmentedControlItem = cva("nv-segmented-control-item");
var SegmentedControlItem = forwardRef15((t0, ref) => {
  const $ = c(11);
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
  let t1;
  if ($[4] !== className) {
    t1 = segmentedControlItem({
      className
    });
    $[4] = className;
    $[5] = t1;
  } else {
    t1 = $[5];
  }
  let t2;
  if ($[6] !== children || $[7] !== props || $[8] !== ref || $[9] !== t1) {
    t2 = /* @__PURE__ */ jsx22("label", { className: t1, ref, ...props, children });
    $[6] = children;
    $[7] = props;
    $[8] = ref;
    $[9] = t1;
    $[10] = t2;
  } else {
    t2 = $[10];
  }
  return t2;
});
SegmentedControlItem.displayName = "SegmentedControlItem";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/composed/SegmentedControlRoot.js
import { jsx as jsx23 } from "react/jsx-runtime";
import { forwardRef as forwardRef16, useId } from "react";
var segmentedControlRoot = cva("nv-segmented-control-root", {
  variants: {
    size: {
      tiny: "nv-segmented-control-root--size-tiny",
      small: "nv-segmented-control-root--size-small",
      medium: "",
      large: "nv-segmented-control-root--size-large"
    }
  }
});
var SegmentedControlRoot = forwardRef16((t0, ref) => {
  const $ = c(19);
  let className;
  let name;
  let onValueChange;
  let props;
  let t1;
  if ($[0] !== t0) {
    ({
      className,
      onValueChange,
      size: t1,
      name,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = className;
    $[2] = name;
    $[3] = onValueChange;
    $[4] = props;
    $[5] = t1;
  } else {
    className = $[1];
    name = $[2];
    onValueChange = $[3];
    props = $[4];
    t1 = $[5];
  }
  const size = t1 === void 0 ? "medium" : t1;
  const calculatedId = useId();
  const resolvedName = name ?? calculatedId;
  let t2;
  if ($[6] !== onValueChange || $[7] !== resolvedName) {
    t2 = {
      name: resolvedName,
      onValueChange
    };
    $[6] = onValueChange;
    $[7] = resolvedName;
    $[8] = t2;
  } else {
    t2 = $[8];
  }
  let t3;
  if ($[9] !== className || $[10] !== size) {
    t3 = segmentedControlRoot({
      className,
      size
    });
    $[9] = className;
    $[10] = size;
    $[11] = t3;
  } else {
    t3 = $[11];
  }
  let t4;
  if ($[12] !== props || $[13] !== ref || $[14] !== t3) {
    t4 = /* @__PURE__ */ jsx23(Primitive.div, { role: "radiogroup", className: t3, ref, ...props });
    $[12] = props;
    $[13] = ref;
    $[14] = t3;
    $[15] = t4;
  } else {
    t4 = $[15];
  }
  let t5;
  if ($[16] !== t2 || $[17] !== t4) {
    t5 = /* @__PURE__ */ jsx23(SegmentedControlContext.Provider, { value: t2, children: t4 });
    $[16] = t2;
    $[17] = t4;
    $[18] = t5;
  } else {
    t5 = $[18];
  }
  return t5;
});
SegmentedControlRoot.displayName = "SegmentedControlRoot";

// node_modules/@kui/foundations-react-core/dist/SegmentedControl/components/base/SegmentedControl.js
var normalizeItem = (option) => typeof option === "string" ? {
  value: option,
  children: option
} : option;
var SegmentedControl = forwardRef17((t0, ref) => {
  const $ = c(18);
  let defaultValue;
  let items;
  let props;
  let value;
  if ($[0] !== t0) {
    ({
      items,
      defaultValue,
      value,
      ...props
    } = t0);
    $[0] = t0;
    $[1] = defaultValue;
    $[2] = items;
    $[3] = props;
    $[4] = value;
  } else {
    defaultValue = $[1];
    items = $[2];
    props = $[3];
    value = $[4];
  }
  let t1;
  if ($[5] !== items[0]) {
    t1 = items[0] ? normalizeItem(items[0]).value : void 0;
    $[5] = items[0];
    $[6] = t1;
  } else {
    t1 = $[6];
  }
  const firstItemValue = t1;
  const selectedValue = value ?? defaultValue ?? firstItemValue;
  const isControlled = value !== void 0;
  let t2;
  if ($[7] !== isControlled || $[8] !== items || $[9] !== selectedValue) {
    let t32;
    if ($[11] !== isControlled || $[12] !== selectedValue) {
      t32 = (option, index) => {
        const {
          children,
          value: itemValue,
          ...inputProps
        } = normalizeItem(option);
        const labelChildren = children ?? itemValue;
        const isChecked = selectedValue === void 0 ? index === 0 : selectedValue === itemValue;
        return /* @__PURE__ */ jsxs4(SegmentedControlItem, { children: [
          /* @__PURE__ */ jsx24(SegmentedControlInput, { ...inputProps, checked: isControlled ? isChecked : void 0, defaultChecked: isControlled ? void 0 : isChecked, value: itemValue }),
          labelChildren
        ] }, itemValue);
      };
      $[11] = isControlled;
      $[12] = selectedValue;
      $[13] = t32;
    } else {
      t32 = $[13];
    }
    t2 = items.map(t32);
    $[7] = isControlled;
    $[8] = items;
    $[9] = selectedValue;
    $[10] = t2;
  } else {
    t2 = $[10];
  }
  let t3;
  if ($[14] !== props || $[15] !== ref || $[16] !== t2) {
    t3 = /* @__PURE__ */ jsx24(SegmentedControlRoot, { ref, ...props, children: t2 });
    $[14] = props;
    $[15] = ref;
    $[16] = t2;
    $[17] = t3;
  } else {
    t3 = $[17];
  }
  return t3;
});
SegmentedControl.displayName = "SegmentedControl";

// node_modules/@kui/foundations-react-core/dist/Text/components/base/Text.js
import { jsx as jsx25 } from "react/jsx-runtime";
import { forwardRef as forwardRef18 } from "react";

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
var Text = forwardRef18((t0, ref) => {
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
    t3 = /* @__PURE__ */ jsx25(Primitive.span, { className: t2, ref, "data-testid": TextTestIds.Text, ...props });
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
export {
  Button,
  Card,
  Flex,
  Grid,
  Hero,
  ProgressBar,
  SegmentedControl,
  Text
};
